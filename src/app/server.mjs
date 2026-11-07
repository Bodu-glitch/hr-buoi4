import {decisionB4,confirmedDecisionB4} from './quyet_dinh_b4.mjs';
import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {randomBytes,randomUUID} from 'node:crypto';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {resolve,sep} from 'node:path';
import {docCauHinh,thongBaoThieu} from '../../thu_nghiem/ai05/cau_hinh.mjs';
import {goiAI,kiemProvider} from '../../thu_nghiem/ai05/cong_ai.mjs';
import {docNguon} from '../../thu_nghiem/ai05/nguon.mjs';
import {taoKho} from './du_lieu.mjs';
import {kiemPhieu,taoPhieu,coChan,loi} from './nghiep_vu.mjs';
import {createWorkflowAPI} from './api_quy_trinh.mjs';
import {steps} from './cac_buoc.mjs';
const assets=new Map([['/quan-tri',['quan_tri.html','text/html; charset=utf-8']],['/quan_tri.js',['quan_tri.js','text/javascript; charset=utf-8']],['/',['workflow.html','text/html; charset=utf-8']],['/ai05',['index.html','text/html; charset=utf-8']],['/workflow.js',['workflow.js','text/javascript; charset=utf-8']],['/workflow.css',['workflow.css','text/css; charset=utf-8']],['/app.js',['app.js','text/javascript; charset=utf-8']],['/style.css',['style.css','text/css; charset=utf-8']]]);
async function body(req){let size=0;const chunks=[];for await(const c of req){size+=c.length;if(size>150000)throw loi(413,'Phiếu quá lớn, tối đa 150 KB.');chunks.push(c);}try{return JSON.parse(Buffer.concat(chunks).toString());}catch{throw loi(400,'Dữ liệu không hợp lệ.');}}
export function taoMayChu({port=3002,config=docCauHinh(),store=taoKho(),runAI=goiAI,workflowRoot,runWorkflowAI,governanceDecision,demoMode=false,demoLogins=[],b4Mode=false,supabaseConfig}={}){
 if(demoMode&&(!workflowRoot||!['gemini'].includes(config.provider)||!runWorkflowAI))throw Error('Kho trải nghiệm cần cấu hình riêng.');
 const workflow=createWorkflowAPI({b4Mode,demoMode,demoLogins,root:workflowRoot,config,runAI:runWorkflowAI,extraHandler:steps,cookieName:port===3002?'hr_auth':'hr_auth_'+port,governanceDecision:governanceDecision||(port===3003?confirmedDecisionB4:decisionB4),supabaseConfig});

 const protectLegacy=true;
 const origin=`http://127.0.0.1:${port}`;const sessions=new Map();let busy=false;
 return http.createServer(async(req,res)=>{
  const json=(status,data)=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8'});res.end(JSON.stringify(data));};
  res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','no-referrer');
  res.setHeader('Content-Security-Policy',"default-src 'self'; script-src 'self'; style-src 'self'; connect-src 'self'; frame-ancestors 'none'; form-action 'self'; base-uri 'none'");
  if(req.headers.host!==`127.0.0.1:${port}`)return json(403,{error:'Chỉ mở bằng địa chỉ 127.0.0.1 của ứng dụng.'});
  if(req.headers['sec-fetch-site']==='cross-site')return json(403,{error:'Không nhận yêu cầu từ trang ngoài.'});
  if(req.method==='POST'&&(req.headers.origin!==origin||(req.url!=='/api/mo-phien'&&req.headers['content-type']?.split(';')[0]!=='application/json')))return json(403,{error:'Chỉ nhận thao tác từ màn hình app.'});
  if(b4Mode&&(req.url==='/quan-tri'||req.url==='/ai05'||req.url.startsWith('/api/')&&!req.url.startsWith('/api/v2/')))return json(404,{error:'Mở chức năng trong không gian Buổi 4.'});
  if(demoMode&&(req.url==='/quan-tri'||req.url==='/ai05'||req.url.startsWith('/api/')&&!req.url.startsWith('/api/v2/')))return json(404,{error:'Phần này không thuộc bản trải nghiệm Buổi 3.'});
  try{if(await workflow.handle(req,res,json,body))return;}catch{return json(500,{error:'Không đọc được kho quy trình hoặc tài khoản. Giữ nguyên dữ liệu và phục hồi bản sao.'});}
  try{if(protectLegacy&&req.url.startsWith('/api/')&&await workflow.identity.ready()){const u=await workflow.identity.user(req);if(!u||!u.roles.includes('HR'))return json(403,{error:'Đăng nhập tài khoản HR ở trang chủ trước khi mở P1 cũ.'});}}catch{return json(500,{error:'Không đọc được tài khoản. Phục hồi bản sao trước khi xem hồ sơ.'});}
  const cookie=req.headers.cookie?.match(/(?:^|;\s*)hr_session=([a-f0-9]{64})(?:;|$)/)?.[1];
  const expires=cookie&&sessions.get(cookie);
  const sessionOK=expires&&expires>Date.now();
  if(req.method==='POST'&&req.url==='/api/mo-phien'){
   if(req.headers.origin!==origin)return json(403,{error:'Mở phiên từ màn hình app.'});
   for(const [k,v]of sessions)if(v<Date.now())sessions.delete(k);
   if(sessions.size>30)return json(429,{error:'Quá nhiều phiên; khởi động lại máy chủ.'});
   const token=randomBytes(32).toString('hex');sessions.set(token,Date.now()+8*3600000);
   res.setHeader('Set-Cookie',`hr_session=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=28800`);
   return json(200,{ok:true});
  }
  if(req.url.startsWith('/api/')&&!sessionOK)return json(401,{error:'Mở phiên HR trước khi xem hồ sơ.'});
  if(req.method==='POST'&&(req.headers.origin!==origin||req.headers['content-type']?.split(';')[0]!=='application/json'))return json(403,{error:'Chỉ nhận thao tác từ màn hình app.'});
  try{
   if(req.method==='GET'&&req.url==='/api/cau-hinh'){
    const problem=thongBaoThieu(config)||kiemProvider(config);return json(200,{ready:!problem,message:problem||'Đủ cấu hình; chưa chứng minh khóa/hạn mức. Chạy mới gọi Gemini.',missing:config.missing});
   }
   if(req.method==='GET'&&req.url==='/api/ho-so')return json(200,{items:await store.list()});
   const match=req.url.match(/^\/api\/ho-so\/([a-f0-9-]{36})$/);
   if(req.method==='GET'&&match){const versions=await store.versions(match[1]);if(!versions.length)throw loi(404,'Không có hồ sơ.');return json(200,{versions});}
   if(req.method==='POST'&&req.url==='/api/chay'){
    const data=await body(req);if(data.xacNhanGui!==true)throw loi(400,'Cần xác nhận gửi nguyên nội dung phiếu và CV tới Gemini.');
    const {input,missing}=kiemPhieu(data.input);
    const problem=thongBaoThieu(config)||kiemProvider(config);if(problem)throw loi(503,problem);
    if(busy)throw loi(429,'Đang có lượt AI chạy; chờ xong, không tự gửi lại.');
    if(data.id){const old=await store.versions(data.id);if(!old.length)throw loi(404,'Không có hồ sơ để tạo bản mới.');if(old.length!==data.expected)throw loi(409,'Hồ sơ đã đổi; mở lại trước khi chạy để tránh phí không cần thiết.');}
    const source=docNguon();busy=true;
    try{
      const result=await runAI({config,system:source,input:taoPhieu(input)});
      const value={id:data.id||randomUUID(),input,missing,result,blocked:missing.length>0||coChan(result.text),status:'NHAP',actor:'HR local',apiAt:new Date().toISOString()};
      try{return json(200,{record:await store.save(value,data.id?data.expected:0),calledAPI:true});}
      catch(e){return json(e.status||500,{error:e.publicMessage||'API đã trả nhưng lưu lỗi. Giữ nội dung màn hình, không tự chạy lại vì có thể tính phí.',calledAPI:true,unsavedResult:result.text});}
    }finally{busy=false;}
   }
   if(req.method==='POST'&&req.url==='/api/kiem'){
    const data=await body(req);if(data.xacNhan!==true)throw loi(400,'HR cần xác nhận đã đối chiếu CV và trích dẫn.');
    const old=await store.versions(data.id);const last=old.at(-1);
    if(!last)throw loi(404,'Không có hồ sơ.');if(last.version!==data.expected)throw loi(409,'Đang có phiên bản mới; mở lại trước khi kiểm.');
    if(last.blocked)throw loi(409,'Bản này còn thiếu/mâu thuẫn; bổ sung phiếu rồi chạy bản mới. Chưa thể xác nhận đã kiểm.');
    if(last.status==='HR_DA_KIEM')throw loi(409,'Bản này đã được HR kiểm.');
    const {checksum,version,createdAt,...copy}=last;
    return json(200,{record:await store.save({...copy,status:'HR_DA_KIEM',reviewedAt:new Date().toISOString(),reviewedVersion:last.version},last.version)});
   }
   if(req.method==='GET'&&(demoMode||b4Mode)&&['/hr1.css','/hr1.js','/b4.js','/b4.css'].includes(req.url)){res.writeHead(200,{'Content-Type':req.url.endsWith('.css')?'text/css; charset=utf-8':'text/javascript; charset=utf-8'});return res.end(await readFile(new URL('web'+req.url,import.meta.url)));}
   if(req.method==='GET'&&assets.has(req.url)){let [file,type]=assets.get(req.url);if((demoMode||b4Mode)&&req.url==='/')file=b4Mode?'b4.html':'hr1.html';res.writeHead(200,{'Content-Type':type});return res.end(await readFile(new URL('web/'+file,import.meta.url)));}
   req.resume();return json(404,{error:'Không có đường dẫn này.'});
  }catch(e){return json(e.status||500,{error:e.publicMessage||'Không xử lý được; kiểm nguồn hoặc dữ liệu lưu. Không ghi nhận hoàn tất.',providerStatus:e.providerStatus||null,calledAPI:e.calledAPI===true});}
 });
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const dataArg=process.argv.indexOf('--data');
 let store;
 if(dataArg>=0){const root=resolve(fileURLToPath(new URL('../../data/',import.meta.url)));const target=resolve(process.argv[dataArg+1]||'');if(!target.startsWith(root+sep))throw Error('Thu muc du lieu phai nam trong data/ cua du an.');store=taoKho(target);}
 const wi=process.argv.indexOf('--workflow-data');let workflowRoot;
 if(wi>=0){const root=resolve(fileURLToPath(new URL('../../data/',import.meta.url)));const target=resolve(process.argv[wi+1]||'');if(!target.startsWith(root+sep))throw Error('Kho quy trinh phai nam trong data/ cua du an.');workflowRoot=pathToFileURL(target+sep);}
 const pi=process.argv.indexOf('--port');const port=pi>=0?Number(process.argv[pi+1]):3002;if(!Number.isInteger(port)||port<1024||port>65535)throw Error('Cong khong hop le.');const server=taoMayChu({port,...(store?{store}:{}),workflowRoot});server.on('error',e=>{console.error(e.code==='EADDRINUSE'?'Cổng 3002 đang được dùng; không dừng app khác.':'Không mở được app.');process.exitCode=1;});
 server.listen(port,'127.0.0.1',()=>console.log('App tuyển dụng và onboarding: http://127.0.0.1:'+port+'/ — Ctrl+C để dừng.'));
}

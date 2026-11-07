import {b4Project,b4Scoped} from './b4_access.mjs';
import {scoped,canGovern} from './quan_tri.mjs';
import {auth} from './bao_mat.mjs';
import {createWorkspace,allowed} from './workspace.mjs';
import {loi} from './nghiep_vu.mjs';
import {thongBaoThieu} from '../../thu_nghiem/ai05/cau_hinh.mjs';
import {kiemProvider} from '../../thu_nghiem/ai05/cong_ai.mjs';
import {dashboard} from './so_lieu.mjs';
import {localDay} from './quy_tac.mjs';
import {taoKhoSupabase,authSupabase} from './supabase_du_lieu.mjs';
export function project(s,u){
 const out=structuredClone(scoped(s,u));delete out.checksum;delete out.input;if(out.governance&&!canGovern(u)){out.governance={authority:out.governance.authority||null,scopeMode:out.governance.scopeMode||null,decisionSource:out.governance.decisionSource||null,assignments:out.governance.assignments||[]};}
 if(allowed(u,['HR','TBP','GD','QL','GDNS'])){
  for(const c of out.candidates){c.evaluationCount=c.evaluations.length;const all=c.schedule?.interviewers||[];const finished=all.length&&all.every(id=>c.evaluations.some(e=>e.actor===id));if(!finished)c.evaluations=c.evaluations.filter(e=>e.actor===u.id);}
  return out;
 }
 if(allowed(u,['PV'])){
  out.jobs=out.jobs.map(j=>({id:j.id,code:j.code,position:j.position,final:j.final?{must:j.final.must,nice:j.final.nice}:null}));
  out.candidates=out.candidates.filter(c=>c.schedule?.interviewers.includes(u.id)).map(c=>({id:c.id,code:c.code,name:c.name,jobId:c.jobId,status:c.status,schedule:c.schedule,questions:c.questions,evaluations:c.evaluations.filter(e=>e.actor===u.id),review:c.review,checkedSummary:c.runs.findLast(r=>r.task==='AI05'&&c.review?.runId===r.id)?.output.summary}));out.events=out.events.filter(e=>e.actor===u.id);out.aiCalls=[];return out;
 }
 out.jobs=out.jobs.map(j=>({id:j.id,code:j.code,position:j.position}));out.candidates=out.candidates.filter(c=>c.tasks.some(t=>u.roles.includes(t.role))).map(c=>({id:c.id,name:c.name,code:c.code,jobId:c.jobId,status:c.status,start:c.terms?.start,location:c.terms?.location,tasks:c.tasks.filter(t=>u.roles.includes(t.role)),arrival:c.arrival}));out.events=out.events.filter(e=>e.actor===u.id);out.aiCalls=[];return out;
}
export function createWorkflowAPI({root=new URL('../../data/quy_trinh/',import.meta.url),config,runAI,extraHandler,cookieName='hr_auth',governanceDecision,demoMode=false,demoLogins=[],b4Mode=false,supabaseConfig}={}){
 const useSupabase = Boolean(supabaseConfig?.supabaseUrl && supabaseConfig?.supabaseKey);
 const identity = useSupabase
  ? authSupabase({ supabaseUrl: supabaseConfig.supabaseUrl, supabaseKey: supabaseConfig.supabaseKey, cookieName })
  : auth(root, { cookieName });
 const customStore = useSupabase
  ? taoKhoSupabase({ supabaseUrl: supabaseConfig.supabaseUrl, supabaseKey: supabaseConfig.supabaseKey })
  : null;
 const engine = createWorkspace({
  b4Mode,
  store: customStore,
  root: new URL('workspace/', root),
  config,
  runAI,
  loadUsers: () => identity.directory(),
  ...(governanceDecision ? { governanceDecision } : {})
 });
 engine.extra = extraHandler;
 return{identity,engine,isSupabase:useSupabase,async handle(req,res,json,body){
  if(!req.url.startsWith('/api/v2/'))return false;
  const url=new URL(req.url,'http://localhost');const path=url.pathname.slice(8);
  try{
   if(path==='status'&&req.method==='GET'){json(200,{initialized:await identity.ready(),demo:demoMode,level:b4Mode?4:demoMode?3:null});return true;}
   if(demoMode&&['setup','setup-demo','switch-user','seed-b4-users','user-update','users','governance'].includes(path))throw loi(403,'Quản lý người dùng và phân quyền/module AI để Buổi 4.');
   if(b4Mode&&['setup','setup-demo','demo-enter','seed-b4-users'].includes(path))throw loi(403,'Kho mẫu đã có tài khoản riêng. Hãy đăng nhập.');
   if(path==='demo-enter'&&req.method==='POST'){if(!demoMode)throw loi(404,'Không có trải nghiệm trên kho này.');const data=await body(req);const login=data.login||'hr1-hr';if(!demoLogins.includes(login))throw loi(403,'Chỉ mở tài khoản trải nghiệm được cấp.');const target=(await identity.directory()).find(u=>u.login===login);if(!target)throw loi(409,'Kho mẫu chưa sẵn sàng.');const result=await identity.switchUser(target.id);res.setHeader('Set-Cookie',`${cookieName}=${result.token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=28800`);json(200,{user:result.user});return true;}
   const user=await identity.user(req);

   if(path==='setup'&&req.method==='POST'){if(await identity.ready())throw loi(409,'App đã có quản trị viên. Đăng nhập hoặc nhờ quản trị viên tạo tài khoản.');const data=await body(req);await identity.create(data);json(200,{ok:true});return true;}
   if(path==='login'&&req.method==='POST'){const {token,user}=await identity.login(await body(req));res.setHeader('Set-Cookie',`${cookieName}=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=28800`);json(200,{user});return true;}
    if(path==='setup-demo'&&req.method==='POST'){if(await identity.ready())throw loi(409,'App đã có tài khoản. Đăng nhập hoặc nhờ quản trị viên.');const defaultPass='MatKhau@123456';const adminUser=await identity.create({name:'Quản trị viên',login:'admin',password:defaultPass,roles:['ADMIN','HR']});await identity.create({name:'Hồ Thị Mai',login:'mai',password:defaultPass,roles:['GDNS','HR']},adminUser);await identity.create({name:'Phạm Quốc Minh',login:'minh',password:defaultPass,roles:['TBP']},adminUser);await identity.create({name:'Nguyễn Hải Nam',login:'nam',password:defaultPass,roles:['TBP']},adminUser);const {token,user:loggedUser}=await identity.login({login:'admin',password:defaultPass});res.setHeader('Set-Cookie',cookieName+'='+token+'; HttpOnly; SameSite=Strict; Path=/; Max-Age=28800');const st=await engine.read();await engine.apply('gov_seed_b4',{confirm:true},adminUser,st.version);json(200,{user:loggedUser,defaultPass});return true;}
    if(path==='switch-user'&&req.method==='POST')throw loi(403,'Đăng xuất và đăng nhập bằng mật khẩu của tài khoản cần dùng.');
   if(!user)throw loi(401,'Cần đăng nhập để xem hồ sơ.');
   if(path==='governance'&&req.method==='GET'){if(b4Mode){if(!canGovern(user))throw loi(403,'Không có quyền quản trị.');const st=await engine.read();const g=structuredClone(st.governance);if(user.roles.includes('AIM')){g.policies=[];g.handoffs=[];g.assignments=[];g.audit=g.audit.filter(e=>e.action.startsWith('gov_module_'));}const limited=user.roles.includes('HR')&&!user.roles.includes('GDNS');const visible=limited?scoped(st,user):st;const ids=new Set(visible.jobs.map(j=>j.id));if(limited){g.handoffs=g.handoffs.filter(h=>h.jobIds.every(id=>ids.has(id)));g.assignments=g.assignments.filter(a=>ids.has(a.jobId));g.audit=g.audit.filter(e=>e.actor===user.id||e.action.startsWith('gov_policy_')||e.action.startsWith('gov_module_'));}json(200,{governance:g,version:st.version,jobs:user.roles.includes('AIM')?[]:visible.jobs.map(j=>({id:j.id,code:j.code,position:j.position})),people:await identity.directory(),tasks:['AI02','AI05','AI07','AI10','AI13']});return true;}if(!canGovern(user))throw loi(403,'Không có quyền quản trị.');const st=await engine.read();json(200,{governance:st.governance||null,version:st.version,jobs:st.jobs.map(j=>({id:j.id,code:j.code,position:j.position,department:j.department,manager:j.manager})),candidates:st.candidates.map(c=>({id:c.id,code:c.code,name:c.name,jobId:c.jobId,status:c.status,offerSent:c.offerSent,confirmDue:c.confirmDue})),tasks:['AI02','AI05','AI07','AI10','AI13'],user,people:await identity.directory()});return true;}
    if(path==='seed-b4-users'&&req.method==='POST'){if(!user.roles.includes('ADMIN'))throw loi(403,'Chỉ quản trị viên nạp tài khoản mẫu.');const existing=await identity.users(user);const defaultPass='MatKhau@123456';const created=[];if(!existing.some(x=>x.login==='mai')){created.push(await identity.create({name:'Hồ Thị Mai',login:'mai',password:defaultPass,roles:['GDNS','HR']},user));}if(!existing.some(x=>x.login==='minh')){created.push(await identity.create({name:'Phạm Quốc Minh',login:'minh',password:defaultPass,roles:['TBP']},user));}if(!existing.some(x=>x.login==='nam')){created.push(await identity.create({name:'Nguyễn Hải Nam',login:'nam',password:defaultPass,roles:['TBP']},user));}json(200,{created,defaultPass});return true;}
   if(path==='config'&&req.method==='GET'){if(!allowed(user,['HR','ADMIN']))throw loi(403,'Chỉ HR/quản trị xem cấu hình AI.');const problem=thongBaoThieu(config)||kiemProvider(config);json(200,{ready:!problem,missing:config.missing,message:problem||'Đủ cấu hình Gemini. Nhấn Chạy mới gọi API; có thể phát sinh phí.',model:'gemini-3.5-flash-lite'});return true;}
   if(path==='logout'&&req.method==='POST'){identity.logout(req);res.setHeader('Set-Cookie',`${cookieName}=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0`);json(200,{ok:true});return true;}
   if(path==='user-update'&&req.method==='POST'){json(200,{user:await identity.update(await body(req),user)});return true;}
   if(path==='users'&&req.method==='GET'){json(200,{users:await identity.users(user)});return true;}
   if(path==='users'&&req.method==='POST'){json(200,{user:await identity.create(await body(req),user)});return true;}
   if(path==='people'&&req.method==='GET'){const users=await identity.directory();json(200,{users:users.filter(x=>x.active).map(({id,name,roles})=>({id,name,roles}))});return true;}
   if(path==='dashboard'&&req.method==='GET'){if(b4Mode&&!allowed(user,['HR','GDNS','GD','TBP','QL']))throw loi(403,'Vai này dùng dashboard công việc riêng.');if(!allowed(user,['HR','GD','GDNS','TBP','QL']))throw loi(403,'Vai này không xem số liệu tuyển dụng.');const month=url.searchParams.get('month');if(month&&!/^\d{4}-(0[1-9]|1[0-2])$/.test(month))throw loi(400,'Tháng không hợp lệ.');json(200,dashboard(b4Mode?b4Scoped(await engine.read(),user):scoped(await engine.read(),user),month));return true;}
   if(path==='state'&&req.method==='GET'){json(200,{user,state:b4Mode?b4Project(project(await engine.read(),user),user):project(await engine.read(),user),today:localDay()});return true;}
   if(path==='action'&&req.method==='POST'){const data=await body(req);if(demoMode&&String(data.action).startsWith('gov_'))throw loi(403,'Quản trị chính sách/module AI thuộc Buổi 4.');const updated=await engine.apply(data.action,data.payload||{},user,data.expected);json(200,{user,state:b4Mode?b4Project(project(updated,user),user):project(updated,user),today:localDay()});return true;}
   throw loi(404,'Không có đường dẫn này.');
  }catch(e){if(e.preview){json(200,{preview:e.preview});return true;}json(e.status||500,{error:e.publicMessage||'Không xử lý được dữ liệu quy trình. Dữ liệu cũ được giữ nguyên.',providerStatus:e.providerStatus||null,calledAPI:e.calledAPI===true,...(e.unsavedResult?{unsavedResult:e.unsavedResult}:{})});return true;}
 }};
}

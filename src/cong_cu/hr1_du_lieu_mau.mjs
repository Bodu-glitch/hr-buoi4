import {mkdir,readFile,writeFile,rename} from 'node:fs/promises';
import {randomUUID,randomBytes} from 'node:crypto';
import {auth} from '../app/bao_mat.mjs';
import {createWorkspace} from '../app/workspace.mjs';
import {baseSettings,baseChecklist,milestones,workAdd} from '../app/quy_tac.mjs';

// Nạp dữ liệu nghiệp vụ hư cấu từ seed HTML. Không thực thi HTML, không tạo kết quả AI giả.
export async function prepareDemo(root){
 try{const m=JSON.parse(await readFile(new URL('HR1_DEMO.json',root),'utf8'));if(m.kind!=='HR1-B3-REAL-AI-v1')throw Error('Kho khác phiên bản, giữ nguyên dữ liệu và chọn kho mới.');return m;}catch(e){if(e.code!=='ENOENT')throw e;}
 try{await readFile(new URL('tai_khoan.json',root));throw Error('Không nạp mẫu lên kho đã có tài khoản.');}catch(e){if(e.code!=='ENOENT')throw e;}
 const stage=new URL('../hr1-khoi-tao-'+randomUUID()+'/',root);await mkdir(stage,{recursive:true});const identity=auth(stage);
 const admin=await identity.create({name:'Quản trị mẫu',login:'hr1-admin',password:randomBytes(32).toString('hex')});
 const user=await identity.create({name:'Trang Trần',login:'hr1-hr',roles:['HR','TBP','GD','QL','IT','HC','PV'],password:randomBytes(32).toString('hex')},admin);
 const manager=await identity.create({name:'Minh Nguyễn · hồ sơ mẫu',login:'hr1-nguon',roles:['TBP','PV'],password:randomBytes(32).toString('hex')},admin);
 const engine=createWorkspace({root:new URL('workspace/',stage)});const s=await engine.read();
 s.experience={level:3,synthetic:true,source:'HR1_WORKSPACE.html seed (đọc tĩnh)',aiResultsPreloaded:false};
 s.settings={...structuredClone(baseSettings),knowledgeConfirmed:true,knowledgeConfirmedBy:'Thiết lập kho bài học giả lập',metrics:'COHORT',daysEnd:'CLOSED',closeRole:'HR'};
 const note='DỮ LIỆU MẪU NHẬP SẴN · không phải kết quả AI hoặc quyết định tuyển dụng thật';
 const defs=[
  ['YC-2026-018','Chuyên viên Kinh doanh B2B','Kinh doanh',2,15000000,22000000,'Tìm kiếm khách hàng doanh nghiệp; tư vấn giải pháp; quản lý cơ hội và cập nhật CRM.','P1. Kinh nghiệm bán hàng B2B\nP2. Sử dụng CRM','Tiếng Anh giao tiếp','2026-11-09'],
  ['YC-2026-019','Kế toán tổng hợp','Tài chính – Kế toán',1,18000000,25000000,'Lập báo cáo tài chính; đối chiếu công nợ; thực hiện kê khai thuế.','P1. Kế toán tổng hợp\nP2. Sử dụng MISA','Kinh nghiệm dịch vụ B2B','2026-11-16'],
  ['YC-2026-020','Chuyên viên Chăm sóc khách hàng','Vận hành',1,11000000,15000000,'Tiếp nhận yêu cầu và theo dõi xử lý phản hồi khách hàng.','P1. Chăm sóc khách hàng','Sử dụng CRM','2026-11-23']
 ];
 for(const[k,d]of defs.entries()){
  const j={id:randomUUID(),code:d[0],position:d[1],department:d[2],quantity:d[3],salaryMin:String(d[4]),salaryMax:String(d[5]),duties:d[6],must:d[7],nice:d[8],needDate:d[9],deadline:'2026-11-01',level:'Chuyên viên',location:'Văn phòng TP.HCM',manager:'Minh Nguyễn',reason:'Nhu cầu mô phỏng trong bài học HR1',publicSalary:'Co',applyLink:'https://example.com/tuyen-dung',notes:note,exception:'',trialDays:null,status:k<2?'DANG_TUYEN':'NHAP',runs:[],errors:[],createdBy:user.id,createdAt:'2026-10-12T02:00:00.000Z',source:note};
  if(k<2){j.approval={actor:manager.id,name:'Lê Hoàng · mẫu',at:'2026-10-12T02:00:00.000Z',source:note};j.final={jd:d[1]+'\n'+d[6],post:d[1]+'\n'+d[6]+'\nYêu cầu: '+d[7],must:d[7].split('\n'),nice:[d[8]],by:'Nhân sự · mẫu nhập tay',source:note};j.posted={date:'2026-10-13',channel:'Kênh mẫu',link:'https://example.com/tuyen-dung',by:'Nhân sự · mẫu',source:note};}
  s.jobs.push(j);
 }
 const people=[
  ['UV-2610-031','Nguyễn Thu Hà',0,'onboarding','TopCV','2026-10-14','Có 3 năm kinh nghiệm bán hàng B2B. Quản lý pipeline bằng HubSpot CRM. Tiếng Anh giao tiếp.'],
  ['UV-2610-047','Trần Minh Khang',0,'new','Website','2026-10-26','Hai năm bán lẻ điện máy. Tư vấn khách hàng cá nhân, quản lý đơn bằng Excel.'],
  ['UV-2610-052','Lê Ngọc Anh',1,'new','Giới thiệu','2026-10-25','2021–2026: Kế toán tổng hợp tại Công ty An Bình. Sử dụng MISA. Tổng quan ghi 2 năm, mốc công việc ghi 5 năm. Cần xác minh.'],
  ['UV-2610-054','Phạm Quốc Bảo',0,'interview','LinkedIn','2026-10-22','Ba năm kinh nghiệm B2B tại công ty phần mềm. Sử dụng Salesforce CRM theo dõi cơ hội.'],
  ['UV-2610-057','Võ Hoài An',1,'offer','TopCV','2026-10-18','Bốn năm kế toán tổng hợp. Thành thạo MISA, lập báo cáo tài chính và quyết toán thuế.'],
  ['UV-2610-060','Đỗ Quang Huy',0,'new','Website','2026-10-28','Hai năm tư vấn giải pháp B2B cho doanh nghiệp vừa và nhỏ. Sử dụng Zoho CRM.'],
  ['UV-2610-025','Bùi Mai Chi',0,'done','Giới thiệu','2026-10-05','Kinh nghiệm B2B 4 năm và CRM.'],
  ['UV-2610-038','Lý Thanh Tâm',1,'rejected','TopCV','2026-10-16','Một năm thực tập hành chính; chưa làm kế toán tổng hợp.']
 ];
 for(const[k,p]of people.entries()){
  const j=s.jobs[p[2]],c={id:randomUUID(),code:p[0],name:p[1],jobId:j.id,status:'MOI_NOP',source:p[4],applied:p[5],cv:p[6],cvOriginal:p[6],externalCode:'HR1-MAU-'+(k+1),desiredSalary:'',createdAt:p[5]+'T02:00:00.000Z',runs:[],decisions:{},evaluations:[],tasks:[],history:[],sampleSource:note};
  if(p[3]==='rejected'){c.status='KHONG_MOI';c.decisions={HR:{choice:'KHONG_MOI',by:'Nhân sự · mẫu',reason:note},TBP:{choice:'KHONG_MOI',by:'Quản lý · mẫu',reason:note}};}
  if(['interview','offer','onboarding','done'].includes(p[3])){
   c.review={importedSample:true,summary:c.cv,by:'HR nhập bảng đối chiếu mẫu từ hồ sơ, KHÔNG PHẢI AI',source:note};
   c.decisions={HR:{choice:'MOI_PV',by:'Nhân sự · mẫu',reason:note},TBP:{choice:'MOI_PV',by:'Quản lý · mẫu',reason:note}};
   c.status='HEN_PV';c.schedule={date:'2026-10-23',time:'09:00',interviewers:[user.id],confirmed:true,by:'Nhân sự · mẫu'};
  }
  if(['offer','onboarding','done'].includes(p[3])){
   c.evaluations=[{id:randomUUID(),actor:user.id,by:'Nhân sự · mẫu nhập tay',assessment:'Phiếu nghiệp vụ nhập sẵn, không phải AI đánh giá.',recommendation:'Kết quả mẫu',at:'2026-10-23T04:00:00.000Z'}];c.selection={choice:'NHAN',reason:note,by:'Quản lý · mẫu',at:'2026-10-23T04:00:00.000Z'};
   const start=p[3]==='offer'?'2026-11-02':'2026-10-26',salary=p[2]===0?19000000:20000000;
   c.terms={code:'NV-MAU-'+(k+1),version:1,position:j.position,department:j.department,level:j.level,manager:j.manager,location:j.location,email:'ungvien'+(k+1)+'@example.com',start,salary,trialDays:null,exception:'',approval:{by:'Lê Hoàng · mẫu',actor:manager.id,at:'2026-10-23T04:00:00.000Z',source:note}};
   c.milestones=milestones(start,j.level,s.settings);c.tasks=baseChecklist(j,start,s.settings);c.status='DA_GUI_THU';
   c.letter={text:'MẪU THƯ DO HR NHẬP TAY\nMời '+c.name+' nhận việc '+j.position+' từ '+start+'.\nĐây là dữ liệu mẫu, không phải kết quả AI.',by:'Nhân sự · mẫu nhập tay',source:note,termsVersion:1,policy:{id:'B2-ORIGINAL',days:3,source:'Sổ tay §9'}};
   c.offerSent={date:'2026-10-24',channel:'Giả lập',evidence:note,policy:c.letter.policy};c.offerReceived={date:'2026-10-24',evidence:note};c.confirmDue=workAdd('2026-10-24',3,s.settings);
  }
  if(p[3]==='offer'){c.status='PHIEU_NHAN_NHAP';delete c.terms.approval;c.tasks=[];c.letter=null;c.offerSent=null;c.offerReceived=null;delete c.confirmDue;}
  if(['onboarding','done'].includes(p[3])){
   c.response={choice:'ACCEPTED',date:'2026-10-25',evidence:note};c.arrival={date:'2026-10-26',by:'Nhân sự · mẫu',evidence:note};c.status='DANG_HOI_NHAP';
   c.onboarding={mentor:'Huy Trần',goals:['Hoàn tất đào tạo sản phẩm','Tạo 20 khách hàng tiềm năng'],support:'Dữ liệu phục vụ bài học',revision:1,approval:{text:'KẾ HOẠCH MẪU DO QUẢN LÝ NHẬP TAY\nTuần 1: làm quen đội nhóm và công cụ.\nTuần 2–4: thực hành công việc, đối chiếu chỉ tiêu.\nĐây không phải kết quả AI.',by:'Huy Trần · mẫu',source:note}};
   for(const t of c.tasks)if(['mentor','plan','idChecked'].includes(t.id)||(p[3]==='done'&&t.required))Object.assign(t,{done:true,by:'Người thực hiện · mẫu',evidence:note,date:'2026-10-26'});
   if(p[3]==='done'){c.closed={by:'HR · mẫu',at:'2026-10-26T04:00:00.000Z',evidence:note};c.status='ONBOARD_THANH_CONG';}
  }
  s.candidates.push(c);
 }
 s.events.push({id:randomUUID(),action:'NHAP_DU_LIEU_MAU',actor:user.id,actorName:'Bộ nạp dữ liệu bài học',at:new Date().toISOString(),detail:note});
 const {version,checksum,createdAt,...value}=s;await engine.store.save(value,0);
 const marker={kind:'HR1-B3-REAL-AI-v1',level:3,createdAt:new Date().toISOString(),source:'HR1_WORKSPACE.html seed (đọc tĩnh)',jobs:3,candidates:8,aiResultsPreloaded:false,note:'Phiếu nghiệp vụ nhập tay có nhãn. Mọi nút AI gọi Gemini thật. Ngày bắt đầu Hà/Chi dời về 26/10 để thao tác ngay. Phân quyền/người dùng/module AI để Buổi 4.'};
 await writeFile(new URL('HR1_DEMO.json',stage),JSON.stringify(marker,null,2));await rename(stage,root);return marker;
}

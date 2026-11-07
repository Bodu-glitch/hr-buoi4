import {randomUUID} from 'node:crypto';
import {need,text,date,localDay,workAdd} from './quy_tac.mjs';
import {sources,tasks} from './nguon_ai.mjs';

export const freshGovernance=()=>({authority:null,scopeMode:null,policies:[],modules:[],handoffs:[],assignments:[],audit:[]});
export function governance(s){return s.governance??=freshGovernance();}
const has=(u,...r)=>u.roles.some(x=>r.includes(x));
export function canGovern(u){return has(u,'ADMIN','HR','GDNS','AIM');}
function approver(g,u){need(g.authority&&has(u,g.authority),'Chưa chốt người áp dụng hoặc bạn không có quyền áp dụng.',403);}
function record(g,u,action,id,detail){g.audit.push({id:randomUUID(),at:new Date().toISOString(),actor:u.id,by:u.name,action,target:id,detail});}
export function policyFor(s,day){return [...(s.governance?.policies||[])].filter(x=>x.status==='APPLIED'&&x.effective<=day).sort((a,b)=>b.effective.localeCompare(a.effective)||b.appliedAt.localeCompare(a.appliedAt))[0]||{id:'B2-ORIGINAL',days:3,source:'Sổ tay §9',effective:'2026-01-01'};}
export function moduleFor(s,task){return [...(s.governance?.modules||[])].reverse().find(x=>x.task===task&&x.status==='APPLIED')||null;}
export function moduleContext(s,task){const m=moduleFor(s,task);need(!m?.paused,'Tác vụ '+task+' đang tạm dừng bởi người quản lý.',409);return m?{id:m.id,instructions:m.instructions,min:m.min,max:m.max}:null;}
export function scoped(s,u){const mode=s.governance?.scopeMode;if(!mode||has(u,'IT','HC','PV')&&!has(u,'HR','TBP','QL')||has(u,'GD','GDNS')||mode==='HR_ALL'&&has(u,'HR'))return s;const grants=s.governance.assignments.filter(a=>a.userId===u.id);const ids=new Set(grants.map(a=>a.jobId));const out=structuredClone(s);out.jobs=out.jobs.filter(j=>ids.has(j.id));out.candidates=out.candidates.filter(c=>ids.has(c.jobId)||c.schedule?.interviewers.includes(u.id));out.events=out.events.filter(e=>e.actor===u.id||ids.has(e.target)||out.candidates.some(c=>c.id===e.target));return out;}
export function scopeAction(s,u,action,p){if(!s.governance?.scopeMode||action.startsWith('gov_')||action==='settings'||has(u,'GD','GDNS')||s.governance.scopeMode==='HR_ALL'&&has(u,'HR'))return; if(action==='job_create')return;const c=s.candidates.find(c=>c.id===p.id);const jobId=c?.jobId||p.jobId||p.id;if(!jobId)return;const assigned=s.governance.assignments.some(a=>a.jobId===jobId&&a.userId===u.id);const ownPV=['evaluation'].includes(action)&&c?.schedule?.interviewers.includes(u.id);const task=action==='task_complete'&&c?.tasks.find(t=>t.id===p.taskId)&&has(u,'IT','HC');need(assigned||ownPV||task,'Hồ sơ nằm ngoài phạm vi được giao.',403);}
export async function governAction({s,u,action,p,people,runTest}){
 const g=governance(s);need(canGovern(u),'Bạn không có quyền vào quản trị.',403);const now=new Date().toISOString();let id=p.id;
 if(action==='gov_policy_draft'){
  need(has(u,'HR','GDNS'),'Chỉ HR/GĐNS soạn chính sách.',403);const days=Number(p.days);need(Number.isInteger(days)&&days>=1&&days<=30,'Hạn phản hồi phải từ 1–30 ngày làm việc.');date(p.effective);need(text(p.source||'')&&text(p.reason||''),'Cần căn cứ và lý do thay đổi.');id=randomUUID();g.policies.push({id,days,effective:p.effective,source:text(p.source),reason:text(p.reason),status:'DRAFT',by:u.name,actor:u.id,at:now,oldHandling:'KEEP_SENT'});
 }else if(action==='gov_policy_test'){
  const v=g.policies.find(x=>x.id===id);need(v&&v.status==='DRAFT','Chọn bản nháp để thử.');date(p.received);v.test={date:p.received,due:workAdd(p.received,v.days,s.settings),by:u.name,at:now};
 }else if(action==='gov_policy_apply'){
  approver(g,u);const v=g.policies.find(x=>x.id===id);need(v?.status==='DRAFT'&&v.test,'Phải thử bản nháp trước khi áp dụng.');need(p.confirm===true,'Cần xác nhận áp dụng cho thư mới; giữ thư đã gửi.');v.status='APPLIED';v.appliedAt=now;v.appliedBy=u.name;
 }else if(action==='gov_policy_rollback'){
  approver(g,u);need(p.confirm===true&&text(p.reason||''),'Cần xác nhận và lý do quay lại.');
  const v=p.id==='B2-ORIGINAL'?{days:3,source:'Sổ tay §9 · bản gốc'}:g.policies.find(x=>x.id===p.id&&x.status==='APPLIED');need(v,'Không có bản chính sách đã áp dụng.');
  id=randomUUID();g.policies.push({id,days:v.days,effective:localDay(),source:v.source,reason:text(p.reason),status:'APPLIED',by:u.name,actor:u.id,at:now,appliedAt:now,appliedBy:u.name,oldHandling:'KEEP_SENT',rollbackOf:p.id});
 }else if(action==='gov_module_draft'){
  need(has(u,'HR','GDNS','AIM'),'Chỉ HR/GĐNS/quản lý AI soạn hướng dẫn AI.',403);need(tasks[p.task],'Tác vụ chưa có trong B1/B2.');const instructions=text(p.instructions||'',8000);need(instructions&&text(p.reason||''),'Cần hướng dẫn bổ sung và căn cứ thay đổi.');const min=Number(p.min||6),max=Number(p.max||8);need(Number.isInteger(min)&&Number.isInteger(max)&&min>=1&&max>=min&&max<=8,'Số câu hỏi từ 1 đến 8.');id=randomUUID();const src=sources(p.task);g.modules.push({id,task:p.task,instructions,min,max,reason:text(p.reason),sourceHash:src.hash,manifest:src.manifest,status:'DRAFT',at:now,by:u.name});
 }else if(action==='gov_module_test'){
  const v=g.modules.find(x=>x.id===id);need(v?.status==='DRAFT','Chọn bản hướng dẫn nháp.');need(p.fake===true&&p.consent===true,'Chỉ thử bằng dữ liệu giả và cần đồng ý gửi API.');need(s.settings.knowledgeConfirmed,'Cần xác nhận nguồn kiến thức trong cấu hình.');need(p.input&&typeof p.input==='object'&&!Array.isArray(p.input),'Cần dữ liệu thử theo tác vụ.');const r=await runTest(v,p.input);v.test={at:now,by:u.name,model:r.model,issues:r.issues||[],text:r.text,sourceHash:r.sourceHash};
 }else if(action==='gov_module_apply'){
  approver(g,u);const v=g.modules.find(x=>x.id===id);need(v?.status==='DRAFT'&&v.test&&!v.test.issues.length,'Cần chạy thử đạt trước áp dụng.');need(v.sourceHash===sources(v.task).hash,'Nguồn đã đổi; tạo và thử nháp mới.');need(p.confirm===true,'Cần xác nhận chỉ áp dụng lần chạy mới, giữ kết quả cũ.');if(!g.modules.some(x=>x.task===v.task&&x.status==='APPLIED'))g.modules.push({id:randomUUID(),task:v.task,instructions:'',min:6,max:8,sourceHash:v.sourceHash,manifest:v.manifest,status:'PREVIOUS',baseline:true});for(const x of g.modules)if(x.task===v.task&&x.status==='APPLIED')x.status='PREVIOUS';v.status='APPLIED';v.appliedAt=now;v.appliedBy=u.name;
 }else if(action==='gov_module_pause'){
  if(!has(u,'AIM')||p.task!=='AI07')approver(g,u);need(tasks[p.task],'Tác vụ không hợp lệ.');let v=moduleFor(s,p.task);if(!v){const src=sources(p.task);v={id:randomUUID(),task:p.task,instructions:'',min:6,max:8,sourceHash:src.hash,manifest:src.manifest,status:'APPLIED',baseline:true,appliedAt:now};g.modules.push(v);}need(typeof p.paused==='boolean'&&text(p.reason||''),'Cần trạng thái và lý do.');v.paused=p.paused;v.pauseReason=text(p.reason);id=v.id;
 }else if(action==='gov_module_rollback'){
  approver(g,u);const v=g.modules.find(x=>x.id===id);need(v?.status==='PREVIOUS'&&p.confirm===true,'Chọn bản trước và xác nhận quay lại.');need(v.sourceHash===sources(v.task).hash,'Nguồn gốc đã đổi; cần tạo nháp thử lại.');for(const x of g.modules)if(x.task===v.task&&x.status==='APPLIED')x.status='PREVIOUS';v.status='APPLIED';v.paused=false;v.appliedAt=now;v.appliedBy=u.name;
 }else if(action==='gov_handoff_draft'){
  need(has(u,'ADMIN','GDNS','HR'),'Chỉ HR/quản trị/GĐNS chuẩn bị bàn giao.',403);need(g.scopeMode,'Chưa chốt phạm vi hồ sơ; không tự thay quyền.');need(Array.isArray(p.jobIds)&&p.jobIds.length&&p.jobIds.every(id=>s.jobs.some(j=>j.id===id)),'Chọn các yêu cầu tuyển cần bàn giao.');need(p.from!==p.to&&people.some(x=>x.id===p.from)&&people.some(x=>x.id===p.to),'Cần hai tài khoản hoạt động khác nhau.');const from=people.find(x=>x.id===p.from),to=people.find(x=>x.id===p.to);need(from.roles.some(r=>['HR','TBP','QL'].includes(r)&&to.roles.includes(r)),'Người nhận phải có vai nghiệp vụ tương ứng; không tự cấp vai mới.');need(text(p.reason||''),'Cần căn cứ bàn giao.');id=randomUUID();if(p.effective)date(p.effective);g.handoffs.push({id,effective:p.effective||null,from:p.from,to:p.to,jobIds:[...new Set(p.jobIds)],reason:text(p.reason),status:'DRAFT',at:now,by:u.name});
 }else if(action==='gov_handoff_approve'){
  approver(g,u);const v=g.handoffs.find(x=>x.id===id);need(v?.status==='DRAFT'&&p.confirm===true,'Chọn bàn giao nháp và xác nhận.');v.status='APPROVED';v.approvedBy=u.name;v.approvedAt=now;
 }else if(action==='gov_handoff_apply'){
  need(has(u,'ADMIN'),'Chỉ quản trị thực hiện bàn giao đã duyệt.',403);const v=g.handoffs.find(x=>x.id===id);need(v?.status==='APPROVED'&&p.confirm===true,'Cần bàn giao được duyệt và xác nhận thực hiện.');if(v.effective)need(v.effective<=localDay(),'Chưa đến ngày hiệu lực bàn giao.');need(people.some(x=>x.id===v.to),'Người nhận đã bị khóa.');for(const jobId of v.jobIds){g.assignments=g.assignments.filter(a=>!(a.jobId===jobId&&a.userId===v.from));if(!g.assignments.some(a=>a.jobId===jobId&&a.userId===v.to))g.assignments.push({jobId,userId:v.to});}v.status='APPLIED';v.appliedAt=now;v.appliedBy=u.name;
 }else if(action==='gov_decision'){
  need(has(u,'ADMIN','GDNS'),'Chỉ quản trị viên hoặc GĐNS chốt quyết định quản trị.',403);
  need(p.confirm===true,'Cần xác nhận chốt quyết định vận hành.');
  if(p.authority!==undefined){
   need(['GDNS','ADMIN','GD',null].includes(p.authority),'Vai người duyệt không hợp lệ.');
   g.authority=p.authority;
  }
  if(p.scopeMode!==undefined){
   need(['ASSIGNED','HR_ALL',null].includes(p.scopeMode),'Chế độ phân quyền hồ sơ không hợp lệ.');
   g.scopeMode=p.scopeMode;
  }
  g.decisionSource=text(p.source||'Xác nhận từ thiết kế Buổi 4',500);
  id='decision';
 }else if(action==='gov_assign'){
  need(has(u,'ADMIN','GDNS'),'Chỉ quản trị viên hoặc GĐNS phân công hồ sơ.',403);
  need(s.jobs.some(j=>j.id===p.jobId),'Yêu cầu tuyển không tồn tại.');
  need(people.some(x=>x.id===p.userId),'Người nhận không tồn tại.');
  const to=people.find(x=>x.id===p.userId);
  need(to.roles.some(r=>['HR','TBP','QL'].includes(r)),'Người nhận phải có vai nghiệp vụ HR/TBP/QL.');
  if(!g.assignments.some(a=>a.jobId===p.jobId&&a.userId===p.userId)){
   g.assignments.push({jobId:p.jobId,userId:p.userId});
  }
  id=p.jobId;
 }else if(action==='gov_unassign'){
  need(has(u,'ADMIN','GDNS'),'Chỉ quản trị viên hoặc GĐNS hủy phân công.',403);
  g.assignments=g.assignments.filter(a=>!(a.jobId===p.jobId&&a.userId===p.userId));
  id=p.jobId;
 }else if(action==='gov_seed_b4'){
  need(has(u,'ADMIN','GDNS'),'Chỉ quản trị viên hoặc GĐNS nạp dữ liệu mẫu B4.',403);
  need(p.confirm===true,'Cần xác nhận nạp dữ liệu mẫu bài tập Buổi 4.');
  g.authority='GDNS';
  g.scopeMode='ASSIGNED';
  g.decisionSource='B4_THIET_KE_HR_XAC_NHAN';
  if(!g.policies.some(pol=>pol.days===5&&pol.effective==='2026-11-02')){
   g.policies.push({id:randomUUID(),days:5,effective:'2026-11-02',source:'Sổ tay §9 (Đề bài giả lập B4)',reason:'Cho ứng viên thêm thời gian thu xếp và phản hồi thư mời tuyển dụng',status:'DRAFT',by:u.name,actor:u.id,at:now,oldHandling:'KEEP_SENT'});
  }
  if(!g.modules.some(m=>m.task==='AI07'&&m.min===4&&m.max===6)){
   const src=sources('AI07');
   g.modules.push({id:randomUUID(),task:'AI07',instructions:'Ưu tiên tiêu chí phải có và điểm cần xác minh từ vòng sàng lọc CV; mỗi câu hỏi gắn với tiêu chí và nêu rõ dấu hiệu trả lời tốt. Không chấm điểm, không kết luận tuyển/loại.',min:4,max:6,reason:'Rút ngắn thời gian phỏng vấn, tập trung vào năng lực cốt lõi và làm rõ các điểm nghi vấn từ CV',sourceHash:src.hash,manifest:src.manifest,status:'DRAFT',at:now,by:u.name});
  }
  if(!s.jobs.some(j=>j.position?.includes('Kinh doanh Dự án'))){
   const j1Id=randomUUID();
   const j1={id:j1Id,code:'YC-2026-001',status:'DANG_TUYEN',position:'Chuyên viên Kinh doanh Dự án',department:'Kinh doanh',level:'Chuyên viên',location:'Văn phòng Hà Nội',manager:'Phạm Quốc Minh',reason:'Bổ sung nhân sự dự án B2B',duties:'Phát triển khách hàng doanh nghiệp và quản lý dự án',must:['P1. Có từ 2 năm kinh nghiệm bán hàng B2B dự án','P2. Tốt nghiệp cao đẳng/đại học chuyên ngành kinh tế hoặc kỹ thuật','P3. Kỹ năng giao tiếp và đàm phán tốt'],nice:['Ưu tiên chứng chỉ quản lý dự án'],salaryMin:'18000000',salaryMax:'25000000',publicSalary:'Co',quantity:1,trialDays:60,needDate:'2026-11-15',deadline:'2026-10-30',approval:{actor:u.id,name:'Giám đốc Điều hành',at:now},final:{jd:'JD Chuyên viên Kinh doanh Dự án',post:'Tuyển Chuyên viên Kinh doanh Dự án. Lương 18–25 triệu.',must:['P1. Có từ 2 năm kinh nghiệm bán hàng B2B dự án','P2. Tốt nghiệp cao đẳng/đại học chuyên ngành kinh tế hoặc kỹ thuật','P3. Kỹ năng giao tiếp và đàm phán tốt'],nice:[],by:u.name,actor:u.id,at:now},posted:{channel:'Website tuyển dụng nội bộ',link:'https://go4ai.life/tuyen-dung/kd-du-an',date:'2026-10-15',by:u.name,at:now},runs:[],createdAt:now,createdBy:u.id};
   s.jobs.push(j1);
   const minhUser=people.find(x=>x.login==='minh');
   g.assignments.push({jobId:j1Id,userId:minhUser?minhUser.id:u.id});
   const c1Id=randomUUID();
   s.candidates.push({id:c1Id,jobId:j1Id,code:'UV-2610-001',name:'Nguyễn Văn An (NV-DEMO-NEW)',status:'THU_DA_KIEM',applied:'2026-10-25',source:'Website công ty',desiredSalary:'22000000',cv:'Nguyễn Văn An. 3 năm kinh nghiệm Kinh doanh Dự án B2B. Tốt nghiệp Đại học Bách Khoa.',cvOriginal:'Nguyễn Văn An...',runs:[],decisions:{},evaluations:[],tasks:[],history:[],createdAt:now,terms:{code:'NV-2026-001',version:1,position:'Chuyên viên Kinh doanh Dự án',department:'Kinh doanh',level:'Chuyên viên',manager:'Phạm Quốc Minh',location:'Văn phòng Hà Nội',email:'nguyenvanan.demo@example.com',start:'2026-11-16',salary:20000000,trialDays:60,approval:{by:'Giám đốc Điều hành',actor:u.id,at:now}},letter:{text:'Kính mời ông Nguyễn Văn An nhận việc vị trí Chuyên viên Kinh doanh Dự án với mức lương 20.000.000 đồng/tháng theo phiếu đã duyệt.',by:u.name,actor:u.id,at:now,termsVersion:1,policy:{id:'B2-ORIGINAL',days:3,source:'Sổ tay §9'}}});
  }
  id='seed_b4';
 }else throw Object.assign(Error('UNKNOWN_GOV'),{status:404,publicMessage:'Không có thao tác quản trị này.'});
 record(g,u,action,id,text(p.reason||p.evidence||'',8000));return id;
}

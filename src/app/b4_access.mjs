import {need} from './quy_tac.mjs';
import {policyFor,scoped} from './quan_tri.mjs';
import {localDay} from './quy_tac.mjs';
const has=(u,...roles)=>u.roles.some(r=>roles.includes(r));
export function b4Scoped(s,u){const out=structuredClone(scoped(s,u));if(!has(u,'GDNS','GD')&&has(u,'HR','TBP','QL')){const ids=new Set(out.jobs.map(j=>j.id));out.candidates=out.candidates.filter(c=>ids.has(c.jobId));}return out;}
export function b4Guard(s,u,action,p){
 if(action.startsWith('gov_')){
  need(!['gov_decision','gov_seed_b4','gov_assign','gov_unassign'].includes(action),'Bản mẫu đã thiết lập quyền; đổi phân công qua phiếu bàn giao được duyệt.',403);
  if(has(u,'AIM')&&!has(u,'GDNS','HR','ADMIN'))need(['gov_module_draft','gov_module_test','gov_module_pause'].includes(action)&&p.task!=='AI02'&&p.task!=='AI05'&&p.task!=='AI10'&&p.task!=='AI13','Vai quản lý AI chỉ soạn, thử và tạm dừng AI07.',403);
  if(action==='gov_module_test'&&has(u,'AIM'))need(s.governance.modules.find(v=>v.id===p.id)?.task==='AI07','Chỉ thử AI07.',403);
  if(action==='gov_policy_draft')need(Number(p.days)<=10,'Số ngày từ 1 đến 10 theo mẫu Buổi 4.');
  if(action==='gov_module_draft')need(p.task==='AI07','Buổi 4 chỉ thay hướng dẫn AI07.');
  if(action==='gov_handoff_draft'){
   need(p.effective,'Cần ngày hiệu lực bàn giao.');
   need(p.jobIds?.every(id=>s.governance.assignments.some(a=>a.jobId===id&&a.userId===p.from)),'Người giao phải đang được phân công trên từng vị trí.');
   if(has(u,'HR')&&!has(u,'ADMIN','GDNS'))need(p.jobIds.every(id=>s.governance.assignments.some(a=>a.jobId===id&&a.userId===u.id)),'Chỉ lập phiếu trong phạm vi được giao.',403);
  }
  return;
 }
 need(!has(u,'ADMIN','AIM')||has(u,'HR','GDNS','TBP','QL','GD','IT','HC','PV'),'Vai quản trị không thao tác hồ sơ nghiệp vụ.',403);
 if(action==='settings')need(has(u,'GDNS'),'Chỉ GĐNS thay cấu hình nghiệp vụ.',403);
 if(has(u,'TBP','QL','HR')&&!has(u,'GDNS','GD')&&action!=='job_create'){
  const c=s.candidates.find(c=>c.id===p.id),jobId=c?.jobId||p.jobId||p.id;
  if(jobId)need(s.governance.assignments.some(a=>a.jobId===jobId&&a.userId===u.id),'Hồ sơ nằm ngoài phạm vi được giao hoặc đã bàn giao.',403);
 }
 if(action==='task_complete'){
  const c=s.candidates.find(c=>c.id===p.id),t=c?.tasks.find(t=>t.id===p.taskId);
  need(t&&has(u,t.role),'Chỉ hoàn tất việc đúng vai được giao.',403);
 }
}
export function b4Project(out,u){
 out.currentPolicy=policyFor(out,localDay());
 out.moduleStatus=Object.fromEntries(['AI02','AI05','AI07','AI10','AI13'].map(task=>{const v=out.governance?.modules?.findLast(v=>v.task===task&&v.status==='APPLIED');return[task,v?{paused:!!v.paused,min:v.min,max:v.max}:null];}));
 if(has(u,'ADMIN','AIM')&&!has(u,'HR','GDNS','GD','TBP','QL','PV','IT','HC')){out.jobs=[];out.candidates=[];out.events=[];}
 // Toàn bộ cấu hình quản trị chỉ qua API riêng; không đưa nguồn nhạy cảm vào state chung.
 delete out.governance;out.aiCalls=[];
 const full=has(u,'HR','GDNS','GD');
 if(!has(u,'GDNS','GD')&&has(u,'HR','TBP','QL')){const ids=new Set(out.jobs.map(j=>j.id));out.candidates=out.candidates.filter(c=>ids.has(c.jobId));}
 if(!full){
  out.settings={};
  if(!has(u,'TBP','QL')){const ids=new Set(out.candidates.map(c=>c.jobId));out.jobs=out.jobs.filter(j=>ids.has(j.id));}
  out.jobs=out.jobs.map(j=>({id:j.id,code:j.code,position:j.position,department:j.department,quantity:j.quantity,status:j.status,manager:j.manager,needDate:j.needDate,deadline:j.deadline,final:j.final?{must:j.final.must,nice:j.final.nice}:null}));
  if(has(u,'TBP','QL'))out.candidates=out.candidates.map(c=>({id:c.id,jobId:c.jobId,code:c.code,name:c.name,status:c.status,applied:c.applied,source:c.source,schedule:c.schedule,questions:c.questions,review:c.review,decisions:c.decisions,evaluations:c.evaluations||[],evaluationCount:c.evaluationCount,runs:(c.runs||[]).filter(r=>has(u,'TBP')&&r.task==='AI07'||has(u,'QL')&&r.task==='AI13').map(r=>({id:r.id,task:r.task,createdAt:r.createdAt,actorName:r.actorName,model:r.model,issues:r.issues,output:r.task==='AI07'?{questions:r.output.questions}:r.output,text:r.task==='AI07'?(r.output.questions||[]).map(q=>q.question).join('\n'):r.text})),tasks:(c.tasks||[]).filter(t=>has(u,t.role)),history:[],onboarding:c.onboarding,response:c.response,arrival:c.arrival,closed:c.closed,terms:c.terms?{start:c.terms.start,location:c.terms.location}:null}));
 }
 return out;
}

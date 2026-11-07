import {readFile,writeFile,rename} from 'node:fs/promises';
import {randomUUID} from 'node:crypto';
import {prepareDemo} from './hr1_du_lieu_mau.mjs';
import {upgradeSamples} from './hr1_bo_sung_du_lieu.mjs';
import {auth} from '../app/bao_mat.mjs';
import {createWorkspace} from '../app/workspace.mjs';
import {freshGovernance} from '../app/quan_tri.mjs';
import {sources} from '../app/nguon_ai.mjs';
export const sampleAccounts=[
 ['admin','Quản trị ứng dụng',['ADMIN']],['mai','Hồ Thị Mai',['GDNS','GD']],
 ['hr01','Trang Trần · Tuyển dụng',['HR']],['minh','Phạm Quốc Minh',['TBP','PV']],
 ['nam','Nguyễn Hải Nam',['TBP','PV']],['quanly','Huy Trần · Quản lý hội nhập',['QL']],
 ['phongvan','Linh Đỗ · Phỏng vấn',['PV']],['it01','Tuấn Lê · IT',['IT']],
 ['hanhchinh','Lan Phạm · Hành chính',['HC']],['ai01','Ngọc An · Quản lý AI',['AIM']]
];
export const samplePassword='MauB4@2026!123';
export async function prepareB4(root){
 try{const m=JSON.parse(await readFile(new URL('B4_MAU.json',root),'utf8'));if(m.kind!=='HR1-B4-v1')throw Error('Kho không đúng phiên bản.');return m;}catch(e){if(e.code!=='ENOENT')throw e;}
 try{await readFile(new URL('tai_khoan.json',root));throw Error('Không nạp B4 đè lên kho có tài khoản.');}catch(e){if(e.code!=='ENOENT')throw e;}
 const stage=new URL('../b4-chuan-bi-'+randomUUID()+'/',root);
 await prepareDemo(stage);await upgradeSamples(stage);
 const identity=auth(stage),old=await identity.directory();
 // Tài khoản nguồn chỉ dùng để dựng kho mới; không mở phiên trải nghiệm vượt quyền.
 const bootstrap=old.find(u=>u.roles.includes('ADMIN')),users={};
 for(const [login,name,roles]of sampleAccounts)users[login]=await identity.create({login,name,roles,password:samplePassword},bootstrap);
 for(const u of old)await identity.update({id:u.id,roles:u.roles,active:false},users.admin);
 const engine=createWorkspace({root:new URL('workspace/',stage)}),s=await engine.read();
 const g=s.governance=freshGovernance();Object.assign(g,{authority:'GDNS',scopeMode:'ASSIGNED',decisionSource:'MẪU B4 · worksheet-data.roles, segments.P1–P3; không là chính sách công ty thật'});
 for(const [index,j]of s.jobs.entries()){
  j.createdBy=users.minh.id;j.manager=index===0?users.minh.name:users.quanly.name;
  for(const login of ['hr01','quanly',...(index===0?['minh']:index===1?['nam']:['minh'])])g.assignments.push({jobId:j.id,userId:users[login].id});
 }
 for(const c of s.candidates){
  if(c.schedule)c.schedule.interviewers=[users.minh.id,users.phongvan.id];
  for(const e of c.evaluations||[])e.actor=users.minh.id;
 }
 s.experience={level:4,synthetic:true,aiResultsPreloaded:false};
 const at=new Date().toISOString(),src=sources('AI07');
 g.policies.push({id:randomUUID(),days:5,effective:'2026-11-02',source:'Mẫu B4 · Sổ tay §9',reason:'Thử thay hạn thư mới, giữ thư đã gửi',status:'DRAFT',oldHandling:'KEEP_SENT',by:users.hr01.name,actor:users.hr01.id,at});
 g.modules.push({id:randomUUID(),task:'AI07',instructions:'Ưu tiên tiêu chí phải có và điểm cần xác minh từ CV. Mỗi câu gắn tiêu chí và dấu hiệu trả lời tốt. Không chấm điểm hoặc quyết tuyển.',min:4,max:6,reason:'Mẫu B4 · rút ngắn buổi phỏng vấn',sourceHash:src.hash,manifest:src.manifest,status:'DRAFT',by:users.ai01.name,actor:users.ai01.id,at});
 s.events.push({id:randomUUID(),action:'KHOI_TAO_MAU_B4',actor:users.admin.id,actorName:users.admin.name,at});
 const {version,checksum,createdAt,...value}=s;await engine.store.save(value,version);
 const marker={kind:'HR1-B4-v1',synthetic:true,createdAt:at,jobs:s.jobs.length,candidates:s.candidates.length};
 await writeFile(new URL('TAI_KHOAN_MAU.md',stage),'# Chỉ dùng cho kho mẫu local Buổi 4\n\nMật khẩu chung: '+samplePassword+'\n\n'+sampleAccounts.map(([l,n,r])=>`- ${l} — ${n} — ${r.join(', ')}`).join('\n')+'\n');
 await writeFile(new URL('B4_MAU.json',stage),JSON.stringify(marker,null,2));await rename(stage,root);return marker;
}

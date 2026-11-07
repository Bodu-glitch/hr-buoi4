import {randomBytes,randomUUID,scrypt as scryptCb,timingSafeEqual} from 'node:crypto';
import {promisify} from 'node:util';
import {loi} from './nghiep_vu.mjs';

let fsModule = null;
async function getFs() {
  if (!fsModule) {
    fsModule = await import('node:fs/promises');
  }
  return fsModule;
}

const scrypt=promisify(scryptCb);
export const roles=['ADMIN','HR','TBP','GD','QL','IT','HC','PV','GDNS','AIM'];
const view=u=>({id:u.id,name:u.name,login:u.login,roles:u.roles,active:u.active});
export function auth(root,{cookieName='hr_auth'}={}){
 const cookiePattern=new RegExp('(?:^|;\\s*)'+cookieName+'=([a-f0-9]{64})(?:;|$)');
 const file=new URL('tai_khoan.json',root),sessions=new Map(),attempts=new Map();let writing=false;
 async function read(){
  const {readFile}=await getFs();
  try{return JSON.parse(await readFile(file,'utf8'));}catch(e){if(e.code==='ENOENT')return [];throw e;}
 }
 async function save(users){
  const {mkdir,open,rename}=await getFs();
  await mkdir(root,{recursive:true});const tmp=new URL('auth-'+randomUUID()+'.tmp',root);const f=await open(tmp,'wx',0o600);try{await f.writeFile(JSON.stringify(users));await f.sync();}finally{await f.close();}await rename(tmp,file);
 }
 async function create(data,user){if(writing)throw loi(409,'Đang cập nhật tài khoản.');writing=true;try{
  const users=await read();if(users.length&&!user?.roles.includes('ADMIN'))throw loi(403,'Chỉ quản trị viên tạo tài khoản.');
  if(!/^[a-z0-9_-]{3,32}$/.test(data.login||''))throw loi(400,'Tên đăng nhập 3–32 ký tự thường, số, gạch.');
  if(users.some(u=>u.login===data.login))throw loi(409,'Tên đăng nhập đã có.');
  if(typeof data.password!=='string'||data.password.length<8)throw loi(400,'Mật khẩu từ 8 ký tự.');
  const salt=randomBytes(16).toString('hex');const hash=(await scrypt(data.password,salt,64)).toString('hex');
  const record={id:randomUUID(),name:data.name?.trim()||data.login,login:data.login,salt,hash,roles:data.roles||['HR'],active:true};
  users.push(record);await save(users);return view(record);
 }finally{writing=false;}}
 async function update(data,user){if(!user?.roles.includes('ADMIN'))throw loi(403,'Chỉ quản trị viên cập nhật tài khoản.');if(writing)throw loi(409,'Đang cập nhật.');writing=true;try{
  const users=await read();const target=users.find(u=>u.id===data.id);if(!target)throw loi(404,'Không tìm thấy người dùng.');
  if(data.name!==undefined)target.name=data.name.trim();
  if(Array.isArray(data.roles)&&data.roles.length&&data.roles.every(r=>roles.includes(r)))target.roles=[...new Set(data.roles)];
  if(typeof data.active==='boolean'){if(target.id===user.id&&!data.active)throw loi(400,'Không thể tự khóa tài khoản của mình.');target.active=data.active;}
  await save(users);return view(target);
 }finally{writing=false;}}
 async function login(data){
  const key=data.login||'';const att=attempts.get(key)||{count:0,until:0};if(att.until>Date.now())throw loi(429,'Quá nhiều lần thử sai. Thử lại sau.');
  const users=await read();const u=users.find(x=>x.login===key);
  const ok=u&&u.active&&timingSafeEqual(Buffer.from(u.hash,'hex'),await scrypt(data.password||'',u.salt,64));
  if(!ok){att.count++;if(att.count>=5){att.until=Date.now()+15*60*1000;att.count=0;}attempts.set(key,att);throw loi(401,'Tên đăng nhập hoặc mật khẩu chưa đúng.');}
  attempts.delete(key);const token=randomBytes(32).toString('hex');sessions.set(token,{userId:u.id,expires:Date.now()+8*3600*1000});return{token,user:view(u)};
 }
 function token(req){const m=(req.headers.cookie||'').match(cookiePattern);return m?m[1]:null;}
 async function user(req){const t=token(req);if(!t)throw loi(401,'Chưa đăng nhập.');const s=sessions.get(t);if(!s||s.expires<Date.now()){sessions.delete(t);throw loi(401,'Phiên đã hết hạn.');}const users=await read();const u=users.find(x=>x.id===s.userId);if(!u||!u.active)throw loi(401,'Tài khoản không hợp lệ.');return u;}
 return{create,update,login,ready:async()=>(await read()).length>0,users:async u=>{if(!u?.roles.includes('ADMIN'))throw loi(403,'Chỉ quản trị xem danh sách.');return(await read()).map(view);},directory:async()=>(await read()).filter(u=>u.active).map(view),user,async switchUser(id){const users=await read();const target=users.find(u=>u.id===id&&u.active);if(!target)throw loi(404,'Không có người dùng này.');const token=randomBytes(32).toString('hex');sessions.set(token,{userId:target.id,expires:Date.now()+8*3600*1000});return{token,user:view(target)};}};
}

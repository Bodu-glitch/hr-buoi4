let fsPromises = null;
try { fsPromises = await import('node:fs/promises'); } catch {}
const readFile = fsPromises?.readFile;
const open = fsPromises?.open;
const mkdir = fsPromises?.mkdir;
const rename = fsPromises?.rename;
const unlink = fsPromises?.unlink;
import {randomBytes,randomUUID,scrypt as scryptCb,timingSafeEqual} from 'node:crypto';
import {promisify} from 'node:util';
import {loi} from './nghiep_vu.mjs';
const scrypt=promisify(scryptCb);
export const roles=['ADMIN','HR','TBP','GD','QL','IT','HC','PV','GDNS','AIM'];
const view=u=>({id:u.id,name:u.name,login:u.login,roles:u.roles,active:u.active});
export function auth(root,{cookieName='hr_auth'}={}){
 const cookiePattern=new RegExp('(?:^|;\\s*)'+cookieName+'=([a-f0-9]{64})(?:;|$)');
 const file=new URL('tai_khoan.json',root),sessions=new Map(),attempts=new Map();let writing=false;
 async function read(){try{return JSON.parse(await readFile(file,'utf8'));}catch(e){if(e.code==='ENOENT')return [];throw e;}}
 async function save(users){await mkdir(root,{recursive:true});const tmp=new URL('auth-'+randomUUID()+'.tmp',root);const f=await open(tmp,'wx',0o600);try{await f.writeFile(JSON.stringify(users));await f.sync();}finally{await f.close();}await rename(tmp,file);}
 async function create(data,user){if(writing)throw loi(409,'Đang cập nhật tài khoản.');writing=true;try{
  const users=await read();if(users.length&&!user?.roles.includes('ADMIN'))throw loi(403,'Chỉ quản trị viên tạo tài khoản.');
  const login=String(data.login||'').trim().toLowerCase(),name=String(data.name||'').trim();
  if(!/^[a-z0-9._-]{3,40}$/.test(login)||!name||name.length>120)throw loi(400,'Tên đăng nhập 3–40 ký tự không dấu; cần họ tên.');
  if(typeof data.password!=='string'||data.password.length<12||data.password.length>200)throw loi(400,'Mật khẩu cần 12–200 ký tự.');
  if(users.some(u=>u.login===login))throw loi(409,'Tên đăng nhập đã tồn tại.');
  const rs=users.length?data.roles:['ADMIN','HR'];if(!Array.isArray(rs)||!rs.length||rs.some(r=>!roles.includes(r)))throw loi(400,'Vai trò chưa hợp lệ.');
  const salt=randomBytes(16).toString('hex');const hash=(await scrypt(data.password,salt,64)).toString('hex');
  const next={id:randomUUID(),login,name,roles:[...new Set(rs)],salt,hash,active:true,audit:[{action:'CREATE',by:user?.name||'Thiết lập đầu tiên',at:new Date().toISOString()}]};await save([...users,next]);return view(next);
 }finally{writing=false;}}
 return{async update(data,user){if(!user?.roles.includes('ADMIN'))throw loi(403,'Chỉ quản trị viên sửa vai/tạm khóa.');if(writing)throw loi(409,'Đang cập nhật tài khoản.');writing=true;try{const users=await read();const found=users.find(x=>x.id===data.id);if(!found)throw loi(404,'Không có tài khoản.');if(!Array.isArray(data.roles)||!data.roles.length||data.roles.some(r=>!roles.includes(r))||typeof data.active!=='boolean')throw loi(400,'Vai hoặc trạng thái chưa hợp lệ.');const next={...found,roles:[...new Set(data.roles)],active:data.active};if(!users.some(x=>x.id!==next.id&&x.active&&x.roles.includes('ADMIN'))&&(!next.active||!next.roles.includes('ADMIN')))throw loi(409,'Không thể khóa hoặc bỏ vai quản trị cuối cùng.');next.audit=[...(found.audit||[]),{action:'UPDATE_ACCESS',by:user.name,at:new Date().toISOString()}];await save(users.map(x=>x.id===next.id?next:x));for(const[k,v]of sessions)if(v.id===next.id)sessions.delete(k);return view(next);}finally{writing=false;}},async directory(){return (await read()).filter(u=>u.active).map(view);},async ready(){return (await read()).length>0;},create,
  async users(user){if(!user.roles.includes('ADMIN'))throw loi(403,'Chỉ quản trị viên xem tài khoản.');return(await read()).map(view);},
  async login(data){const name=String(data.login||'').toLowerCase().trim();if(name.length>40||typeof data.password!=='string'||data.password.length>200)throw loi(400,'Thông tin đăng nhập chưa hợp lệ.');
   const past=attempts.get(name);if(past&&past.count>=5&&past.until>Date.now())throw loi(429,'Đăng nhập sai nhiều lần; chờ 5 phút.');
   const u=(await read()).find(x=>x.login===name&&x.active);const hash=await scrypt(data.password,u?.salt||'nonexistent',64);
   if(!u||!timingSafeEqual(hash,Buffer.from(u.hash,'hex'))){attempts.set(name,{count:(past?.until>Date.now()?past.count:0)+1,until:Date.now()+300000});throw loi(401,'Tên đăng nhập hoặc mật khẩu không đúng.');}
   attempts.delete(name);const token=randomBytes(32).toString('hex');sessions.set(token,{id:u.id,expires:Date.now()+8*3600000});for(const[k,v]of sessions)if(v.expires<Date.now())sessions.delete(k);return{token,user:view(u)};
  },async switchUser(userId){const users=await read();const u=users.find(x=>x.id===userId&&x.active);if(!u)throw loi(404,'Không có tài khoản.');const token=randomBytes(32).toString('hex');sessions.set(token,{id:u.id,expires:Date.now()+8*3600000});for(const[k,v]of sessions)if(v.expires<Date.now())sessions.delete(k);return{token,user:view(u)};
  },async user(req){const token=req.headers.cookie?.match(cookiePattern)?.[1];const session=sessions.get(token);if(!session||session.expires<Date.now())return null;const u=(await read()).find(x=>x.id===session.id&&x.active);return u?view(u):null;},
  logout(req){const token=req.headers.cookie?.match(cookiePattern)?.[1];sessions.delete(token);}
 };
}

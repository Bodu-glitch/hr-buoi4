import { randomUUID, createHash } from 'node:crypto';

let fsModule = null;
async function getFs() {
  if (!fsModule) {
    fsModule = await import('node:fs/promises');
  }
  return fsModule;
}

export const dataRoot = new URL('../../data/ung_dung/', import.meta.url);
export function taoKho(root = dataRoot) {
  let writing = false;
  return { root, async list() {
    const { mkdir, readdir } = await getFs();
    await mkdir(root,{recursive:true});
    const names=await readdir(root);const rows=[];
    for(const id of names.filter(n=>/^[0-9a-f-]{36}$/.test(n))){
      const item=await this.latest(id);
      if(item)rows.push({id,version:item.version,updatedAt:item.createdAt,name:item.input.hoTen,uv:item.input.maUV,status:item.status});
    }
    return rows.sort((a,b)=>b.updatedAt.localeCompare(a.updatedAt));
  }, async latest(id) {
    if(!/^[0-9a-f-]{36}$/.test(id))throw new Error('BAD_ID');
    const { readdir, readFile } = await getFs();
    const folder=new URL(id+'/',asURL(root));let names;
    try{names=(await readdir(folder)).filter(n=>/^\d{6}\.json$/.test(n)).sort();}catch(e){if(e.code==='ENOENT')return null;throw e;}
    if(!names.length)return null;
    if(Number(names.at(-1).slice(0,6))!==names.length)throw new Error('DATA_SEQUENCE_CORRUPT');
    const value=JSON.parse(await readFile(new URL(names.at(-1),folder),'utf8'));const{checksum,...body}=value;
    if(checksum!==hash(body)||value.id!==id||value.version!==names.length)throw new Error('DATA_CORRUPT');
    return value;
  }, async versions(id) {
    if(!/^[0-9a-f-]{36}$/.test(id)) throw new Error('BAD_ID');
    const { readdir, readFile } = await getFs();
    const folder=new URL(id+'/',asURL(root));
    let names;try{names=await readdir(folder);}catch(e){if(e.code==='ENOENT')return [];throw e;}
    const result=[];
    for(const name of names.filter(n=>/^\d{6}\.json$/.test(n)).sort()) {
      const value=JSON.parse(await readFile(new URL(name,folder),'utf8'));
      const {checksum,...body}=value;
      if(checksum!==hash(body)||value.id!==id)throw new Error('DATA_CORRUPT');
      result.push(value);
    }
    return result;
  },async save(record,expected=0) {
    if(writing)throw Object.assign(new Error('BUSY'),{status:409,publicMessage:'Đang lưu hồ sơ khác; thử lại sau.'});
    writing=true;
    try {
      const { latest } = this;
      const { mkdir, open, link, unlink } = await getFs();
      const id=record.id||randomUUID();const last=await this.latest(id);const count=last?.version||0;
      if(count!==expected)throw Object.assign(new Error('CONFLICT'),{status:409,publicMessage:'Hồ sơ đã có phiên bản mới. Mở lại trước khi lưu để không đè bản khác.'});
      const folder=new URL(id+'/',asURL(root));await mkdir(folder,{recursive:true});
      const value={...record,id,version:count+1,createdAt:new Date().toISOString()};
      value.checksum=hash(value);
      const temp=new URL(`.${randomUUID()}.tmp`,folder);const final=new URL(`${String(value.version).padStart(6,'0')}.json`,folder);
      const handle=await open(temp,'wx');
      try{await handle.writeFile(JSON.stringify(value,null,2),'utf8');await handle.sync();}finally{await handle.close();}
      try{await link(temp,final);}finally{await unlink(temp);} // Publish complete file without overwriting a version.
      return structuredClone(value);
    } finally {
      writing=false;
    }
  } };
}
function hash(v){return createHash('sha256').update(JSON.stringify(v)).digest('hex');}
function asURL(v){return v instanceof URL?v:new URL(v,import.meta.url);}

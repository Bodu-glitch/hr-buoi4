const fields={maUV:'Mã UV',hoTen:'Họ tên',viTri:'Vị trí',maYC:'Mã phiếu yêu cầu',ngayNop:'Ngày nộp',tieuChi:'Tiêu chí phải có đã chốt',cv:'Nội dung CV'};
export function kiemPhieu(data){
  const input={};
  for(const key of [...Object.keys(fields),'nguon','tieuChiNenCo']){
    if(typeof data?.[key]!=='string'||data[key].length>20000)throw Object.assign(new Error('INPUT'),{status:400,publicMessage:'Các ô phải là văn bản, mỗi ô tối đa 20.000 ký tự.'});
    input[key]=data[key].trim();
  }
  const missing=Object.entries(fields).filter(([k])=>!input[k]||/^(chưa chốt|chưa gắn|chưa kiểm)$/iu.test(input[k])).map(([,v])=>v);
  if(data.tieuChiDaChot!==true)missing.push('HR xác nhận tiêu chí đã chốt');
  if(input.ngayNop && (!/^\d{4}-\d{2}-\d{2}$/.test(input.ngayNop)||!Number.isFinite(Date.parse(input.ngayNop))||new Date(input.ngayNop).toISOString().slice(0,10)!==input.ngayNop))throw Object.assign(new Error('DATE'),{status:400,publicMessage:'Ngày nộp chưa hợp lệ.'});
  input.tieuChiDaChot=data.tieuChiDaChot===true;
  return {input,missing};
}
export function taoPhieu(input){return Object.entries({...input,tieuChiDaChot:input.tieuChiDaChot?'HR xác nhận đã chốt':'CHƯA CHỐT'}).map(([k,v])=>`${fields[k]||k}: ${v||'[CHƯA CÓ]'}`).join('\n');}
export function coChan(result){return /⛔|\[CẦN|CHƯA ĐỦ ĐIỀU KIỆN|CÓ MÂU THUẪN/iu.test(result||'');}
export function loi(status,message){return Object.assign(new Error('PUBLIC_ERROR'),{status,publicMessage:message});}

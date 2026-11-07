import {resolve,sep} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {prepareB4} from './b4_du_lieu_mau.mjs';
import {taoMayChu} from '../app/server.mjs';
import {taoKho} from '../app/du_lieu.mjs';
import {docCauHinh,thongBaoThieu} from '../../thu_nghiem/ai05/cau_hinh.mjs';
import {runStructured} from '../app/ai_du_lieu.mjs';
const data=resolve(fileURLToPath(new URL('../../data/',import.meta.url))),i=process.argv.indexOf('--kho');
const target=i>=0?resolve(process.argv[i+1]||''):resolve(data,'hr1-buoi4');
if(!target.startsWith(data+sep)||target.startsWith(resolve(data,'backup')+sep))throw Error('Chỉ chạy kho riêng trong data/, không chạy trực tiếp bản sao.');
const root=pathToFileURL(target+sep),port=3096;
try{
 await prepareB4(root);const config=docCauHinh();
 const server=taoMayChu({port,b4Mode:true,workflowRoot:root,store:taoKho(new URL('legacy/',root)),config,runWorkflowAI:runStructured,governanceDecision:{authority:'GDNS',scopeMode:'ASSIGNED',source:'MẪU B4'}});
 server.on('error',e=>{console.error(e.code==='EADDRINUSE'?'Cổng 3096 đang được dùng. Mở địa chỉ hiện có; không dừng ứng dụng khác.':'Không mở được B4. Giữ nguyên kho dữ liệu.');process.exitCode=1;});
 server.listen(port,'127.0.0.1',()=>{console.log('HR1 Buổi 4: http://127.0.0.1:3096/');console.log('Tài khoản mẫu: data/hr1-buoi4/TAI_KHOAN_MAU.md');console.log(thongBaoThieu(config)||'AI sẵn cấu hình. Chỉ gọi khi người dùng xem trước và đồng ý.');console.log('Ctrl+C để dừng. Kho B3 giữ nguyên.');});
}catch(e){console.error('Chưa mở B4: '+(e.publicMessage||e.message));process.exitCode=1;}

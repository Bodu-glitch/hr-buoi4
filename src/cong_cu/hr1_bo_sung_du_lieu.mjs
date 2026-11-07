import {randomUUID} from 'node:crypto';
import {createWorkspace} from '../app/workspace.mjs';
const batch='HR1-SAMPLE-20261028-V4';
const cvDuc=`NGUYỄN MINH ĐỨC
Vị trí ứng tuyển: Chuyên viên Kinh doanh B2B
Email liên hệ: minhduc@example.com
Mức thu nhập mong muốn: 19.000.000 đồng/tháng. Có thể bắt đầu ngày 16/11/2026.

KINH NGHIỆM LÀM VIỆC
06/2023–09/2026 — Công ty Minh Phát Solutions — Chuyên viên kinh doanh khách hàng doanh nghiệp.
Bán giải pháp phần mềm cho doanh nghiệp vừa và nhỏ theo mô hình B2B; tự tìm khách hàng, xác định nhu cầu, trình bày giải pháp và theo dõi hợp đồng.
Sử dụng HubSpot CRM hằng ngày để tạo lead, cập nhật giai đoạn cơ hội, lịch liên hệ và dự báo doanh số. Quản lý khoảng 40 cơ hội/tháng.
Trong quý II/2026, hoàn thành 105% chỉ tiêu doanh số theo báo cáo nội bộ; phối hợp với đội kỹ thuật để chuẩn bị demo sản phẩm.
08/2021–05/2023 — Công ty Phương Đông — Nhân viên chăm sóc khách hàng doanh nghiệp, tiếp nhận và theo dõi yêu cầu qua email.

HỌC VẤN VÀ KỸ NĂNG
Cử nhân Quản trị kinh doanh, tốt nghiệp năm 2021.
Tiếng Anh: tự giới thiệu và trao đổi email công việc; chưa có chứng chỉ, có thể kiểm tra giao tiếp khi phỏng vấn.
Excel: lập báo cáo bán hàng, lọc và tổng hợp dữ liệu.`;
const cvVy=`TRƯƠNG THẢO VY
Vị trí ứng tuyển: Chuyên viên Kinh doanh B2B
Email liên hệ: thaovy@example.com
Mức thu nhập mong muốn: 17.000.000 đồng/tháng. Có thể bắt đầu ngày 23/11/2026.

KINH NGHIỆM
09/2023–09/2026 — Công ty Hướng Dương — Nhân viên kinh doanh khách hàng doanh nghiệp.
Tìm kiếm và tư vấn dịch vụ văn phòng cho doanh nghiệp theo mô hình B2B; tiếp nhận nhu cầu và chuyển hồ sơ cho người phụ trách hợp đồng.
Ghi lịch liên hệ, danh sách khách hàng và trạng thái xử lý bằng Excel. Chưa từng sử dụng phần mềm CRM trong công việc.
Sử dụng Word và Excel để lập đề xuất dịch vụ, cập nhật báo cáo tuần.

HỌC VẤN
Cao đẳng Quản trị kinh doanh, tốt nghiệp năm 2023.`;
const updates={
 'UV-2610-047':`TRẦN MINH KHANG
Ứng tuyển: Chuyên viên Kinh doanh B2B. Email: minhkhang@example.com.
KINH NGHIỆM
08/2024–09/2026 — Cửa hàng điện máy An Khang — Nhân viên bán lẻ.
Tư vấn tivi, tủ lạnh và máy giặt cho khách hàng cá nhân; kiểm tra tồn kho và lập đơn hàng bằng Excel.
01/2023–07/2024 — Cửa hàng Thành Công — Nhân viên thu ngân.
Chưa có kinh nghiệm bán hàng cho doanh nghiệp B2B. Chưa sử dụng phần mềm CRM.
HỌC VẤN: Cao đẳng Kinh doanh thương mại, tốt nghiệp năm 2022.
Thu nhập mong muốn 15.000.000 đồng/tháng. Thời gian có thể nhận việc: 16/11/2026.`,
 'UV-2610-052':`LÊ NGỌC ANH
Ứng tuyển: Kế toán tổng hợp. Email: ngocanh@example.com.
TÓM TẮT: Có 2 năm kinh nghiệm kế toán tổng hợp, thành thạo MISA.
KINH NGHIỆM CHI TIẾT
10/2021–09/2026 — Công ty An Bình — Kế toán tổng hợp.
Lập báo cáo tài chính, đối chiếu công nợ và kê khai thuế. Sử dụng MISA để hạch toán và xuất báo cáo.
08/2020–09/2021 — Công ty Đông Á — Thực tập sinh kế toán.
KỸ NĂNG TỰ ĐÁNH GIÁ: Chưa từng sử dụng MISA trong công việc; chỉ hạch toán và theo dõi trên Excel.
HỌC VẤN: Cử nhân Kế toán, tốt nghiệp năm 2020.
Thu nhập mong muốn 22.000.000 đồng/tháng. Có thể bắt đầu 16/11/2026.`
};
export async function upgradeSamples(root){
 const engine=createWorkspace({root:new URL('workspace/',root)});const s=await engine.read();
 if(s.experience?.synthetic!==true)throw Error('Chỉ bổ sung bộ dữ liệu kiểm thử, không thay kho vận hành.');
 if(s.experience.sampleRevision===4)return {changed:false,version:s.version};
 const now=new Date().toISOString(),changes=[];
 // Không sửa CV/đầu vào của hồ sơ đã chạy AI hoặc đã chuyển bước.
 for(const c of s.candidates){if(c.sampleSource)c.sampleBatch=batch;if(updates[c.code]&&c.status==='MOI_NOP'&&!c.runs.length){c.cvOriginal??=c.cv;c.cv=updates[c.code];c.sampleScenario=c.code==='UV-2610-052'?'Mâu thuẫn cần xác minh':'Thiếu kinh nghiệm bắt buộc';changes.push(c.code);}}
 for(const j of s.jobs)if(j.source?.includes('DỮ LIỆU MẪU'))j.sampleBatch=batch;
 const draft=s.jobs.find(j=>j.code==='YC-2026-020');
 if(draft?.status==='NHAP'&&!draft.runs.length){Object.assign(draft,{reason:'Bổ sung nhân sự để xử lý lượng yêu cầu khách hàng tăng trong quý IV; không thay thế vị trí đang tuyển.',duties:'Tiếp nhận yêu cầu hỗ trợ từ email và điện thoại.\nGhi nhận nội dung, người phụ trách và thời hạn phản hồi trên công cụ quản lý.\nPhối hợp bộ phận vận hành xử lý yêu cầu; cập nhật kết quả cho khách hàng.\nTổng hợp báo cáo tình trạng xử lý hằng tuần.',must:'P1. Có ít nhất 1 năm kinh nghiệm chăm sóc khách hàng\nP2. Sử dụng Excel để theo dõi yêu cầu và lập báo cáo',nice:'Có kinh nghiệm sử dụng CRM\nGiao tiếp tiếng Anh trong công việc',deadline:'2026-11-06',needDate:'2026-11-23',notes:'Thời gian phỏng vấn dự kiến 07–13/11, chốt điều kiện trước 16/11, nhận việc 23/11. Hạn nhận hồ sơ có trước ngày cần người để đủ thời gian đánh giá. Quyền lợi theo sổ tay hiện hành; không tự bổ sung phụ cấp hoặc cam kết khác.'});changes.push(draft.code);}
 const job=s.jobs.find(j=>j.code==='YC-2026-018');if(!job)throw Error('Thiếu yêu cầu tuyển nguồn; không tự gắn hồ sơ vào vị trí khác.');
 for(const [code,name,cv,scenario,salary]of [['UV-2610-061','Nguyễn Minh Đức',cvDuc,'Đủ dữ liệu để đối chiếu',19000000],['UV-2610-062','Trương Thảo Vy',cvVy,'Có B2B, chưa có CRM',17000000]]){
  const existing=s.candidates.find(c=>c.code===code||c.externalCode==='HR1-V2-'+code);if(existing){if(existing.sampleBatch&&existing.status==='MOI_NOP'&&!existing.runs.length){existing.cvOriginal??=existing.cv;existing.cv=cv;existing.sampleScenario=scenario;}continue;}
  s.candidates.push({id:randomUUID(),code,name,jobId:job.id,status:'MOI_NOP',source:'Website tuyển dụng',applied:'2026-10-28',cv,cvOriginal:cv,externalCode:'HR1-V2-'+code,desiredSalary:String(salary),createdAt:now,runs:[],decisions:{},evaluations:[],tasks:[],history:[],sampleSource:'Dữ liệu kiểm thử',sampleBatch:batch,sampleScenario:scenario});changes.push(code);
 }
 s.experience.sampleRevision=4;s.experience.sampleBatch=batch;s.experience.sampleUpdatedAt=now;
 s.events.push({id:randomUUID(),at:now,actor:'sample-data-maintenance',actorName:'Bảo trì dữ liệu kiểm thử',action:'CAP_NHAT_DU_LIEU_KIEM_THU',detail:'Bổ sung CV và bối cảnh yêu cầu; giữ nguyên hồ sơ đã chạy AI và mọi run cũ.',targets:changes});
 const{checksum,version,createdAt,...value}=s;const saved=await engine.store.save(value,s.version);return{changed:true,version:saved.version,changes};
}

# AI05_SANG_LOC_CV — nhiệm vụ và giới hạn

Trạng thái: **CHƯA DUYỆT**. Bản chuyển nguyên văn từ dữ liệu đã lưu; không phải SPEC hay bằng chứng đã chạy AI.

Nguồn HTML: S1: [GO4AI_Level2_HR_Buoi_1_Quy_trinh_Tuyen_dung_Hoi_nhap.html](../../../data/nguon/GO4AI_Level2_HR_Buoi_1_Quy_trinh_Tuyen_dung_Hoi_nhap.html) · S2: [GO4AI_Level2_HR_Buoi_2_AI_Project_Tuyen_dung_Hoi_nhap.html](../../../data/nguon/GO4AI_Level2_HR_Buoi_2_AI_Project_Tuyen_dung_Hoi_nhap.html) · phần JSON nhúng `worksheet-data`. Mỗi mục ghi khóa cụ thể. S1 và S2 có cùng dữ liệu; chỉ lưu một bản chuẩn.

<a id="nguon-261"></a>
## id

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/1/id`.

<!-- NGUON_JSON: ["/b2/projects/1/id"] -->
~~~~text
AI05_SANG_LOC_CV
~~~~

<a id="nguon-262"></a>
## name

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/1/name`.

<!-- NGUON_JSON: ["/b2/projects/1/name"] -->
~~~~text
AI05_SANG_LOC_CV · 05 · Soạn nháp
~~~~

<a id="nguon-263"></a>
## Lúc chạy và mục đích

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/1/n1_flow`.

<!-- NGUON_JSON: ["/b2/projects/1/n1_flow"] -->
~~~~text
Khi nhận phiếu sàng lọc gồm CV và tiêu chí đã chốt của vị trí, AI lập bảng đối chiếu từng tiêu chí có trích dẫn CV, đề xuất nhóm A/B/C theo Sổ tay và câu cần xác minh, để HR kiểm và Trưởng bộ phận quyết định mời phỏng vấn.
~~~~

<a id="nguon-264"></a>
## Bước

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/1/n1_step`.

<!-- NGUON_JSON: ["/b2/projects/1/n1_step"] -->
~~~~text
Bước 05
~~~~

<a id="nguon-265"></a>
## Mã màn hình

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/1/n1_screen`.

<!-- NGUON_JSON: ["/b2/projects/1/n1_screen"] -->
~~~~text
MH02
~~~~

<a id="nguon-266"></a>
## Người làm gì

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/1/n1_human`.

<!-- NGUON_JSON: ["/b2/projects/1/n1_human"] -->
~~~~text
HR kiểm từng trích dẫn với CV gốc; HR và Trưởng bộ phận bấm Mời phỏng vấn / Không mời kèm lý do; HR tự liên hệ ứng viên.
~~~~

<a id="nguon-267"></a>
## AI làm gì

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/1/n1_ai`.

<!-- NGUON_JSON: ["/b2/projects/1/n1_ai"] -->
~~~~text
đối chiếu CV với tiêu chí, tóm tắt có trích dẫn, đề xuất nhóm A/B/C và câu cần xác minh
~~~~

<a id="nguon-268"></a>
## Hệ thống làm gì

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/1/n1_system`.

<!-- NGUON_JSON: ["/b2/projects/1/n1_system"] -->
~~~~text
Cấp mã UV, ghi nguồn và ngày nộp, gắn tiêu chí đã chốt của vị trí vào phiếu; lưu bản tóm tắt; chỉ người được đổi trạng thái ứng viên. Nếu làm được: che ảnh, ngày sinh, hôn nhân trước khi gửi CV cho AI.
~~~~

<a id="nguon-269"></a>
## Người xác nhận

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/1/n1_approver`.

<!-- NGUON_JSON: ["/b2/projects/1/n1_approver"] -->
~~~~text
HR (Chuyên viên tuyển dụng) kiểm · Trưởng bộ phận quyết
~~~~

<a id="nguon-270"></a>
## Giới hạn 1

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/1/n1_prohibit_1`.

<!-- NGUON_JSON: ["/b2/projects/1/n1_prohibit_1"] -->
~~~~text
Bản tóm tắt không nhắc ảnh, tuổi, giới tính, hôn nhân, con cái, quê quán (03 mục 1)
~~~~

<a id="nguon-271"></a>
## Giới hạn 2

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/1/n1_prohibit_2`.

<!-- NGUON_JSON: ["/b2/projects/1/n1_prohibit_2"] -->
~~~~text
Không có điểm số, xếp hạng, "đã mời", "đã loại" (03 mục 6, 15)
~~~~

<a id="nguon-272"></a>
## Giới hạn 3

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/1/n1_prohibit_3`.

<!-- NGUON_JSON: ["/b2/projects/1/n1_prohibit_3"] -->
~~~~text
Không ghi CÓ khi không trích được câu trong CV; không biến CHƯA THẤY thành KHÔNG ĐẠT
~~~~

<a id="nguon-273"></a>
## Trường bắt buộc (dẫn chiếu gốc)

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/1/n2_mandatory`.

<!-- NGUON_JSON: ["/b2/projects/1/n2_mandatory"] -->
~~~~text
Xem 02_QUY_TRINH_SANG_LOC_CV.md mục 2 (một chỗ, không chép lại).
~~~~

<a id="nguon-274"></a>
## Điều kiện chặn

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/1/n2_blocking`.

<!-- NGUON_JSON: ["/b2/projects/1/n2_blocking"] -->
~~~~text
Thiếu vị trí, mã phiếu yêu cầu, tiêu chí phải có hoặc nội dung CV; hoặc CV mâu thuẫn ở một tiêu chí phải có → dòng ⛔, "Chưa đề xuất", E1 nêu rõ; HR không dùng bản tóm tắt để mời/không mời.
~~~~

<a id="nguon-275"></a>
## Phần vẫn làm khi thiếu

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/1/n2_partial`.

<!-- NGUON_JSON: ["/b2/projects/1/n2_partial"] -->
~~~~text
Vẫn tóm tắt điều CV viết và đặt câu cần xác minh; CV không nói về một tiêu chí thì ghi CHƯA THẤY (không phải thiếu trường). Không đoán vị trí từ nội dung CV.
~~~~

<a id="nguon-276"></a>
## Lỗi đỏ

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/1/n2_red_flags`.

<!-- NGUON_JSON: ["/b2/projects/1/n2_red_flags"] -->
~~~~text
Đ1 sai người, sai mốc kinh nghiệm, trích câu không có trong CV · Đ2 gán năng lực CV không nói (ví dụ ghi CÓ Excel nâng cao) · Đ3 nhắc ảnh, tuổi, giới tính, hôn nhân, con cái, quê quán · Đ4 tự gán vị trí, tự chọn một bên khi CV mâu thuẫn, xếp nhóm khi còn ⛔, chấm điểm/loại ứng viên.
~~~~

<a id="nguon-277"></a>
## B1 — which

Nguồn: S1 + S2 → `worksheet-data` → `/b1/ai/1/which`.

<!-- NGUON_JSON: ["/b1/ai/1/which"] -->
~~~~text
Bước 5 — AI05 sàng lọc CV theo tiêu chí
~~~~

<a id="nguon-278"></a>
## B1 — read

Nguồn: S1 + S2 → `worksheet-data` → `/b1/ai/1/read`.

<!-- NGUON_JSON: ["/b1/ai/1/read"] -->
~~~~text
Phiếu sàng lọc: nội dung CV + tiêu chí đã chốt của vị trí. Ảnh, tuổi, hôn nhân, quê quán trong CV thì bỏ qua.
~~~~

<a id="nguon-279"></a>
## B1 — make

Nguồn: S1 + S2 → `worksheet-data` → `/b1/ai/1/make`.

<!-- NGUON_JSON: ["/b1/ai/1/make"] -->
~~~~text
Bảng đối chiếu từng tiêu chí CÓ / CHƯA THẤY / KHÔNG ĐẠT kèm câu trích CV; nhóm đề xuất A/B/C theo Sổ tay; câu cần xác minh. Không điểm số.
~~~~

<a id="nguon-280"></a>
## B1 — approve

Nguồn: S1 + S2 → `worksheet-data` → `/b1/ai/1/approve`.

<!-- NGUON_JSON: ["/b1/ai/1/approve"] -->
~~~~text
HR kiểm từng trích dẫn với CV gốc; HR + Trưởng bộ phận quyết định mời hay không.
~~~~

<a id="nguon-281"></a>
## B1 — fail

Nguồn: S1 + S2 → `worksheet-data` → `/b1/ai/1/fail`.

<!-- NGUON_JSON: ["/b1/ai/1/fail"] -->
~~~~text
Gán năng lực CV không nói, hoặc biến "chưa thấy" thành "không đạt" → bỏ sót người tốt. HR phát hiện khi kiểm trích dẫn ở MH02, trước khi hẹn lịch; AI không tự loại ai.
~~~~

- [01_KIEN_THUC_NEN.md](../KIEN_THUC_CHUNG/01_KIEN_THUC_NEN.md)

- [02_QUY_TRINH_SANG_LOC_CV.md](02_QUY_TRINH_SANG_LOC_CV.md)

- [03_SO_TAY_TUYEN_DUNG_HOI_NHAP.md](../KIEN_THUC_CHUNG/03_SO_TAY_TUYEN_DUNG_HOI_NHAP.md)

- [04_OUTPUT_MAU_SANG_LOC_CV.md](04_OUTPUT_MAU_SANG_LOC_CV.md)

Hướng dẫn: [HUONG_DAN.md](HUONG_DAN.md). Danh mục nạp: [NAP.md](NAP.md). Màn hình: [MH02.md](../../2_MAN_HINH/MH02.md). Kết quả thực chạy vẫn CHUA_KIEM; nguồn ghi 0/6 lượt mỗi tác vụ.

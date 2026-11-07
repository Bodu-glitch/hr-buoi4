# AI10_THU_MOI_NHAN_VIEC — nhiệm vụ và giới hạn

Trạng thái: **CHƯA DUYỆT**. Bản chuyển nguyên văn từ dữ liệu đã lưu; không phải SPEC hay bằng chứng đã chạy AI.

Nguồn HTML: S1: [GO4AI_Level2_HR_Buoi_1_Quy_trinh_Tuyen_dung_Hoi_nhap.html](../../../data/nguon/GO4AI_Level2_HR_Buoi_1_Quy_trinh_Tuyen_dung_Hoi_nhap.html) · S2: [GO4AI_Level2_HR_Buoi_2_AI_Project_Tuyen_dung_Hoi_nhap.html](../../../data/nguon/GO4AI_Level2_HR_Buoi_2_AI_Project_Tuyen_dung_Hoi_nhap.html) · phần JSON nhúng `worksheet-data`. Mỗi mục ghi khóa cụ thể. S1 và S2 có cùng dữ liệu; chỉ lưu một bản chuẩn.

<a id="nguon-377"></a>
## id

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/3/id`.

<!-- NGUON_JSON: ["/b2/projects/3/id"] -->
~~~~text
AI10_THU_MOI_NHAN_VIEC
~~~~

<a id="nguon-378"></a>
## name

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/3/name`.

<!-- NGUON_JSON: ["/b2/projects/3/name"] -->
~~~~text
AI10_THU_MOI_NHAN_VIEC · 10 · Soạn nháp
~~~~

<a id="nguon-379"></a>
## Lúc chạy và mục đích

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/3/n1_flow`.

<!-- NGUON_JSON: ["/b2/projects/3/n1_flow"] -->
~~~~text
Khi nhận phiếu chốt nhận việc đã được Giám đốc duyệt, AI soạn thư mời nhận việc và bảng việc chuẩn bị nội bộ có hạn, để HR kiểm, duyệt và tự gửi từ email công ty.
~~~~

<a id="nguon-380"></a>
## Bước

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/3/n1_step`.

<!-- NGUON_JSON: ["/b2/projects/3/n1_step"] -->
~~~~text
Bước 10
~~~~

<a id="nguon-381"></a>
## Mã màn hình

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/3/n1_screen`.

<!-- NGUON_JSON: ["/b2/projects/3/n1_screen"] -->
~~~~text
MH04
~~~~

<a id="nguon-382"></a>
## Người làm gì

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/3/n1_human`.

<!-- NGUON_JSON: ["/b2/projects/3/n1_human"] -->
~~~~text
HR đối chiếu lương, ngày–thứ, thử việc, địa chỉ; xử lý điểm C1; tự gửi thư và ghi phản hồi của ứng viên.
~~~~

<a id="nguon-383"></a>
## AI làm gì

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/3/n1_ai`.

<!-- NGUON_JSON: ["/b2/projects/3/n1_ai"] -->
~~~~text
soạn thư mời nhận việc và bảng việc chuẩn bị nội bộ
~~~~

<a id="nguon-384"></a>
## Hệ thống làm gì

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/3/n1_system`.

<!-- NGUON_JSON: ["/b2/projects/3/n1_system"] -->
~~~~text
Kiểm thứ–ngày bằng hàm lịch; tính lại hạn việc chuẩn bị và so với bản nháp; khóa Gửi khi phiếu chưa duyệt, còn ⛔ / [CẦN …], lương trong thư khác phiếu, thư có từ nội bộ; nhắc hạn xác nhận 3 ngày làm việc.
~~~~

<a id="nguon-385"></a>
## Người xác nhận

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/3/n1_approver`.

<!-- NGUON_JSON: ["/b2/projects/3/n1_approver"] -->
~~~~text
HR (Chuyên viên tuyển dụng); C1 về lương/thử việc → Giám đốc Nhân sự
~~~~

<a id="nguon-386"></a>
## Giới hạn 1

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/3/n1_prohibit_1`.

<!-- NGUON_JSON: ["/b2/projects/3/n1_prohibit_1"] -->
~~~~text
Thư không có ghi chú phỏng vấn, mức lương đề nghị, lịch sử thương lượng (03 mục 14)
~~~~

<a id="nguon-387"></a>
## Giới hạn 2

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/3/n1_prohibit_2`.

<!-- NGUON_JSON: ["/b2/projects/3/n1_prohibit_2"] -->
~~~~text
Thư không có thời gian thử việc khác 03 mục 3 khi không có NGOẠI LỆ ĐÃ DUYỆT
~~~~

<a id="nguon-388"></a>
## Giới hạn 3

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/3/n1_prohibit_3`.

<!-- NGUON_JSON: ["/b2/projects/3/n1_prohibit_3"] -->
~~~~text
Thư không có thưởng, phụ cấp, làm từ xa hay lời hứa không có trong phiếu và Sổ tay
~~~~

<a id="nguon-389"></a>
## Trường bắt buộc (dẫn chiếu gốc)

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/3/n2_mandatory`.

<!-- NGUON_JSON: ["/b2/projects/3/n2_mandatory"] -->
~~~~text
Xem 02_QUY_TRINH_THU_MOI.md mục 2 (một chỗ, không chép lại).
~~~~

<a id="nguon-390"></a>
## Điều kiện chặn

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/3/n2_blocking`.

<!-- NGUON_JSON: ["/b2/projects/3/n2_blocking"] -->
~~~~text
Phiếu chưa duyệt, thiếu trường bắt buộc, hoặc mâu thuẫn (thứ–ngày, chức danh–cấp bậc, điều khoản khác Sổ tay không có ngoại lệ) → dòng ⛔, C1 nêu rõ; nút Gửi khóa.
~~~~

<a id="nguon-391"></a>
## Phần vẫn làm khi thiếu

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/3/n2_partial`.

<!-- NGUON_JSON: ["/b2/projects/3/n2_partial"] -->
~~~~text
Vẫn soạn thư và bảng phần có căn cứ; thiếu ghi [CẦN HR ĐIỀN: …], mâu thuẫn ghi [CẦN HR XÁC NHẬN: …]; danh xưng trống dùng "Anh/Chị" và ghi C2.
~~~~

<a id="nguon-392"></a>
## Lỗi đỏ

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/3/n2_red_flags`.

<!-- NGUON_JSON: ["/b2/projects/3/n2_red_flags"] -->
~~~~text
Đ1 sai người, sai lương, sai ngày trong thư · Đ2 bịa chính sách (thử việc, phụ cấp, lịch hội nhập) · Đ3 lộ ghi chú phỏng vấn, 17.000.000, "thương lượng", làm từ xa chưa duyệt · Đ4 đoán ngày, tự chọn thời gian thử việc, thiếu dòng ⛔.
~~~~

<a id="nguon-393"></a>
## B1 — which

Nguồn: S1 + S2 → `worksheet-data` → `/b1/ai/3/which`.

<!-- NGUON_JSON: ["/b1/ai/3/which"] -->
~~~~text
Bước 10 — AI10 soạn thư mời nhận việc
~~~~

<a id="nguon-394"></a>
## B1 — read

Nguồn: S1 + S2 → `worksheet-data` → `/b1/ai/3/read`.

<!-- NGUON_JSON: ["/b1/ai/3/read"] -->
~~~~text
Phiếu chốt nhận việc đã Giám đốc duyệt + Sổ tay (thử việc, giờ làm, ngày đầu, giấy tờ, việc chuẩn bị) + lịch tra cứu.
~~~~

<a id="nguon-395"></a>
## B1 — make

Nguồn: S1 + S2 → `worksheet-data` → `/b1/ai/3/make`.

<!-- NGUON_JSON: ["/b1/ai/3/make"] -->
~~~~text
Thư mời ≤250 chữ + bảng việc chuẩn bị nội bộ có hạn + phần cần HR xác nhận. Ghi chú phỏng vấn và lương thương lượng không vào thư.
~~~~

<a id="nguon-396"></a>
## B1 — approve

Nguồn: S1 + S2 → `worksheet-data` → `/b1/ai/3/approve`.

<!-- NGUON_JSON: ["/b1/ai/3/approve"] -->
~~~~text
HR đối chiếu lương, ngày–thứ, thử việc, địa chỉ với phiếu và Sổ tay rồi tự gửi từ email công ty.
~~~~

<a id="nguon-397"></a>
## B1 — fail

Nguồn: S1 + S2 → `worksheet-data` → `/b1/ai/3/fail`.

<!-- NGUON_JSON: ["/b1/ai/3/fail"] -->
~~~~text
Sai lương/ngày, lộ mức lương đề nghị hoặc ghi chú phỏng vấn → cam kết sai, mất uy tín. HR phát hiện ở MH04 trước khi bấm gửi; code khóa Gửi khi lương khác phiếu, sai thứ–ngày, còn ⛔.
~~~~

- [01_KIEN_THUC_NEN.md](../KIEN_THUC_CHUNG/01_KIEN_THUC_NEN.md)

- [02_QUY_TRINH_THU_MOI.md](02_QUY_TRINH_THU_MOI.md)

- [03_SO_TAY_TUYEN_DUNG_HOI_NHAP.md](../KIEN_THUC_CHUNG/03_SO_TAY_TUYEN_DUNG_HOI_NHAP.md)

- [04_OUTPUT_MAU_THU_MOI.md](04_OUTPUT_MAU_THU_MOI.md)

Hướng dẫn: [HUONG_DAN.md](HUONG_DAN.md). Danh mục nạp: [NAP.md](NAP.md). Màn hình: [MH04.md](../../2_MAN_HINH/MH04.md). Kết quả thực chạy vẫn CHUA_KIEM; nguồn ghi 0/6 lượt mỗi tác vụ.

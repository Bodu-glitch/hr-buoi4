# AI13_KE_HOACH_HOI_NHAP — nhiệm vụ và giới hạn

Trạng thái: **CHƯA DUYỆT**. Bản chuyển nguyên văn từ dữ liệu đã lưu; không phải SPEC hay bằng chứng đã chạy AI.

Nguồn HTML: S1: [GO4AI_Level2_HR_Buoi_1_Quy_trinh_Tuyen_dung_Hoi_nhap.html](../../../data/nguon/GO4AI_Level2_HR_Buoi_1_Quy_trinh_Tuyen_dung_Hoi_nhap.html) · S2: [GO4AI_Level2_HR_Buoi_2_AI_Project_Tuyen_dung_Hoi_nhap.html](../../../data/nguon/GO4AI_Level2_HR_Buoi_2_AI_Project_Tuyen_dung_Hoi_nhap.html) · phần JSON nhúng `worksheet-data`. Mỗi mục ghi khóa cụ thể. S1 và S2 có cùng dữ liệu; chỉ lưu một bản chuẩn.

<a id="nguon-435"></a>
## id

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/4/id`.

<!-- NGUON_JSON: ["/b2/projects/4/id"] -->
~~~~text
AI13_KE_HOACH_HOI_NHAP
~~~~

<a id="nguon-436"></a>
## name

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/4/name`.

<!-- NGUON_JSON: ["/b2/projects/4/name"] -->
~~~~text
AI13_KE_HOACH_HOI_NHAP · 13 · Soạn nháp
~~~~

<a id="nguon-437"></a>
## Lúc chạy và mục đích

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/4/n1_flow`.

<!-- NGUON_JSON: ["/b2/projects/4/n1_flow"] -->
~~~~text
Khi người được tuyển đã xác nhận và phiếu hội nhập có đủ người kèm cặp, mốc do hệ thống tính và chỉ tiêu của quản lý, AI soạn kế hoạch hội nhập 30 ngày theo tuần, để Quản lý trực tiếp sửa và duyệt trước ngày đầu.
~~~~

<a id="nguon-438"></a>
## Bước

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/4/n1_step`.

<!-- NGUON_JSON: ["/b2/projects/4/n1_step"] -->
~~~~text
Bước 13
~~~~

<a id="nguon-439"></a>
## Mã màn hình

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/4/n1_screen`.

<!-- NGUON_JSON: ["/b2/projects/4/n1_screen"] -->
~~~~text
MH05
~~~~

<a id="nguon-440"></a>
## Người làm gì

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/4/n1_human`.

<!-- NGUON_JSON: ["/b2/projects/4/n1_human"] -->
~~~~text
Quản lý trực tiếp sửa, duyệt kế hoạch trước ngày đầu; người kèm cặp thực hiện; HR lưu và gửi phần Tuần 1 cho người mới khi quản lý đồng ý.
~~~~

<a id="nguon-441"></a>
## AI làm gì

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/4/n1_ai`.

<!-- NGUON_JSON: ["/b2/projects/4/n1_ai"] -->
~~~~text
soạn kế hoạch hội nhập 30 ngày theo tuần, bảng mốc gặp, việc hỗ trợ cần kèm
~~~~

<a id="nguon-442"></a>
## Hệ thống làm gì

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/4/n1_system`.

<!-- NGUON_JSON: ["/b2/projects/4/n1_system"] -->
~~~~text
Chỉ mở phiếu hội nhập khi ứng viên đã xác nhận; tính mốc check-in tuần 1, check-in 30 ngày, hạn đánh giá và kết thúc thử việc theo Sổ tay; nhắc lịch các mốc.
~~~~

<a id="nguon-443"></a>
## Người xác nhận

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/4/n1_approver`.

<!-- NGUON_JSON: ["/b2/projects/4/n1_approver"] -->
~~~~text
Quản lý trực tiếp
~~~~

<a id="nguon-444"></a>
## Giới hạn 1

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/4/n1_prohibit_1`.

<!-- NGUON_JSON: ["/b2/projects/4/n1_prohibit_1"] -->
~~~~text
Kế hoạch không có lương, mức đề nghị, lịch sử thương lượng (03 mục 12, 14)
~~~~

<a id="nguon-445"></a>
## Giới hạn 2

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/4/n1_prohibit_2`.

<!-- NGUON_JSON: ["/b2/projects/4/n1_prohibit_2"] -->
~~~~text
Không có ngày tự tính khác phiếu, chỉ tiêu tự đặt, khóa học hay chi phí tự thêm
~~~~

<a id="nguon-446"></a>
## Giới hạn 3

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/4/n1_prohibit_3`.

<!-- NGUON_JSON: ["/b2/projects/4/n1_prohibit_3"] -->
~~~~text
Không có đề nghị chưa được chấp thuận (làm việc từ xa) và không có từ "yếu", "kém"
~~~~

<a id="nguon-447"></a>
## Trường bắt buộc (dẫn chiếu gốc)

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/4/n2_mandatory`.

<!-- NGUON_JSON: ["/b2/projects/4/n2_mandatory"] -->
~~~~text
Xem 02_QUY_TRINH_HOI_NHAP.md mục 2 (một chỗ, không chép lại).
~~~~

<a id="nguon-448"></a>
## Điều kiện chặn

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/4/n2_blocking`.

<!-- NGUON_JSON: ["/b2/projects/4/n2_blocking"] -->
~~~~text
Ngày bắt đầu chưa xác nhận, mốc chưa tính, chưa có người kèm cặp, hoặc thử việc khác Sổ tay không có ngoại lệ → dòng ⛔, E1 nêu rõ; quản lý không duyệt kế hoạch.
~~~~

<a id="nguon-449"></a>
## Phần vẫn làm khi thiếu

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/4/n2_partial`.

<!-- NGUON_JSON: ["/b2/projects/4/n2_partial"] -->
~~~~text
Vẫn soạn khung tuần theo việc chính và Sổ tay; ngày trống ghi [CẦN HR ĐIỀN], người kèm cặp/chỉ tiêu trống ghi [CẦN QUẢN LÝ ĐIỀN]; mốc không bị ảnh hưởng giữ nguyên.
~~~~

<a id="nguon-450"></a>
## Lỗi đỏ

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/4/n2_red_flags`.

<!-- NGUON_JSON: ["/b2/projects/4/n2_red_flags"] -->
~~~~text
Đ1 sai người, sai mốc ngày, sai quản lý/người kèm cặp · Đ2 bịa chỉ tiêu, khóa học, chi phí, ngày · Đ3 chép lương/thương lượng hoặc nhận xét ngoài công việc · Đ4 tự tính lại thử việc, tự chọn người kèm cặp, đưa làm từ xa chưa duyệt vào kế hoạch, thiếu ⛔.
~~~~

<a id="nguon-451"></a>
## B1 — which

Nguồn: S1 + S2 → `worksheet-data` → `/b1/ai/4/which`.

<!-- NGUON_JSON: ["/b1/ai/4/which"] -->
~~~~text
Bước 13 — AI13 soạn kế hoạch hội nhập 30 ngày
~~~~

<a id="nguon-452"></a>
## B1 — read

Nguồn: S1 + S2 → `worksheet-data` → `/b1/ai/4/read`.

<!-- NGUON_JSON: ["/b1/ai/4/read"] -->
~~~~text
Phiếu hội nhập: việc chính, người kèm cặp, mốc hệ thống đã tính, chỉ tiêu quản lý đặt, ghi chú phỏng vấn (nội bộ).
~~~~

<a id="nguon-453"></a>
## B1 — make

Nguồn: S1 + S2 → `worksheet-data` → `/b1/ai/4/make`.

<!-- NGUON_JSON: ["/b1/ai/4/make"] -->
~~~~text
Kế hoạch theo tuần (việc, người phụ trách, căn cứ), bảng mốc gặp, việc hỗ trợ cần kèm. Không ghi lương, không tự đặt chỉ tiêu, không tự tính ngày.
~~~~

<a id="nguon-454"></a>
## B1 — approve

Nguồn: S1 + S2 → `worksheet-data` → `/b1/ai/4/approve`.

<!-- NGUON_JSON: ["/b1/ai/4/approve"] -->
~~~~text
Quản lý trực tiếp sửa và duyệt trước ngày đầu; HR lưu.
~~~~

<a id="nguon-455"></a>
## B1 — fail

Nguồn: S1 + S2 → `worksheet-data` → `/b1/ai/4/fail`.

<!-- NGUON_JSON: ["/b1/ai/4/fail"] -->
~~~~text
Bịa chỉ tiêu, tự tính ngày, chép lương/thương lượng hoặc đề nghị chưa duyệt (làm từ xa) vào kế hoạch. Quản lý phát hiện khi duyệt ở MH05; mốc ngày do code tính.
~~~~

- [01_KIEN_THUC_NEN.md](../KIEN_THUC_CHUNG/01_KIEN_THUC_NEN.md)

- [02_QUY_TRINH_HOI_NHAP.md](02_QUY_TRINH_HOI_NHAP.md)

- [03_SO_TAY_TUYEN_DUNG_HOI_NHAP.md](../KIEN_THUC_CHUNG/03_SO_TAY_TUYEN_DUNG_HOI_NHAP.md)

- [04_OUTPUT_MAU_HOI_NHAP.md](04_OUTPUT_MAU_HOI_NHAP.md)

Hướng dẫn: [HUONG_DAN.md](HUONG_DAN.md). Danh mục nạp: [NAP.md](NAP.md). Màn hình: [MH05.md](../../2_MAN_HINH/MH05.md). Kết quả thực chạy vẫn CHUA_KIEM; nguồn ghi 0/6 lượt mỗi tác vụ.

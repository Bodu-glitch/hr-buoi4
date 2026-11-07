# 02_QUY_TRINH_HOI_NHAP — kiến thức riêng nguyên văn

Trạng thái: **CHƯA DUYỆT**. Bản chuyển nguyên văn từ dữ liệu đã lưu; không phải SPEC hay bằng chứng đã chạy AI.

Nguồn HTML: S1: [GO4AI_Level2_HR_Buoi_1_Quy_trinh_Tuyen_dung_Hoi_nhap.html](../../../data/nguon/GO4AI_Level2_HR_Buoi_1_Quy_trinh_Tuyen_dung_Hoi_nhap.html) · S2: [GO4AI_Level2_HR_Buoi_2_AI_Project_Tuyen_dung_Hoi_nhap.html](../../../data/nguon/GO4AI_Level2_HR_Buoi_2_AI_Project_Tuyen_dung_Hoi_nhap.html) · phần JSON nhúng `worksheet-data`. Mỗi mục ghi khóa cụ thể. S1 và S2 có cùng dữ liệu; chỉ lưu một bản chuẩn.

<a id="nguon-457"></a>
## id

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/4/n3_files/1/id`.

<!-- NGUON_JSON: ["/b2/projects/4/n3_files/1/id"] -->
~~~~text
f2
~~~~

<a id="nguon-458"></a>
## name

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/4/n3_files/1/name`.

<!-- NGUON_JSON: ["/b2/projects/4/n3_files/1/name"] -->
~~~~text
02_QUY_TRINH_HOI_NHAP.md
~~~~

<a id="nguon-459"></a>
## role

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/4/n3_files/1/role`.

<!-- NGUON_JSON: ["/b2/projects/4/n3_files/1/role"] -->
~~~~text
process
~~~~

<a id="nguon-460"></a>
## desc

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/4/n3_files/1/desc`.

<!-- NGUON_JSON: ["/b2/projects/4/n3_files/1/desc"] -->
~~~~text
Bước 12–14: vị trí, trường bắt buộc của phiếu hội nhập, điều kiện đi tiếp.
~~~~

<a id="nguon-461"></a>
## content

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/4/n3_files/1/content`.

<!-- NGUON_JSON: ["/b2/projects/4/n3_files/1/content"] -->
~~~~text
# 02_QUY_TRINH_HOI_NHAP — Bước 12–14 · Phiên bản 1.0
> Chỉ ghi các bước, ai làm, trường bắt buộc, điều kiện đi tiếp. Quy định hội nhập: xem 03 mục 12.

## 1. Vị trí
12 người được tuyển đã xác nhận; hệ thống tính các mốc và nhắc việc chuẩn bị → **13 AI soạn kế hoạch hội nhập 30 ngày** → quản lý trực tiếp sửa, duyệt trước ngày đầu (03 mục 10) → 14 ngày đầu, check-in, đánh giá thử việc.

## 2. Trường của phiếu hội nhập
| Trường | Bắt buộc? |
|---|---|
| Mã NV, Họ tên, Vị trí, Cấp bậc, Phòng | Có |
| Quản lý trực tiếp, Người kèm cặp | Có |
| Nơi làm việc | Có |
| Ngày bắt đầu — phải ghi "đã xác nhận" | Có |
| Thử việc | Có |
| Mốc do hệ thống tính: Check-in tuần 1, Check-in 30 ngày, Hạn đánh giá thử việc, Kết thúc thử việc | Có |
| Việc chính (từ JD) | Có |
| Chỉ tiêu 30 ngày (quản lý đặt) | Không — trống thì nhắc quản lý, không chặn |
| Ghi chú phỏng vấn (nội bộ), Ngoại lệ | Không |
**Thiếu** = để trống, "chưa chọn", "chưa chốt", "chưa tính được", hoặc ngày bắt đầu chưa xác nhận.

## 3. Điều kiện đi tiếp
Không còn ⛔; quản lý trực tiếp đã duyệt kế hoạch trước ngày đầu. HR gửi phần Tuần 1 cho người mới khi quản lý đồng ý.

~~~~

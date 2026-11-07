# 02_QUY_TRINH_JD_TIN_DANG — kiến thức riêng nguyên văn

Trạng thái: **CHƯA DUYỆT**. Bản chuyển nguyên văn từ dữ liệu đã lưu; không phải SPEC hay bằng chứng đã chạy AI.

Nguồn HTML: S1: [GO4AI_Level2_HR_Buoi_1_Quy_trinh_Tuyen_dung_Hoi_nhap.html](../../../data/nguon/GO4AI_Level2_HR_Buoi_1_Quy_trinh_Tuyen_dung_Hoi_nhap.html) · S2: [GO4AI_Level2_HR_Buoi_2_AI_Project_Tuyen_dung_Hoi_nhap.html](../../../data/nguon/GO4AI_Level2_HR_Buoi_2_AI_Project_Tuyen_dung_Hoi_nhap.html) · phần JSON nhúng `worksheet-data`. Mỗi mục ghi khóa cụ thể. S1 và S2 có cùng dữ liệu; chỉ lưu một bản chuẩn.

<a id="nguon-225"></a>
## id

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/0/n3_files/1/id`.

<!-- NGUON_JSON: ["/b2/projects/0/n3_files/1/id"] -->
~~~~text
f2
~~~~

<a id="nguon-226"></a>
## name

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/0/n3_files/1/name`.

<!-- NGUON_JSON: ["/b2/projects/0/n3_files/1/name"] -->
~~~~text
02_QUY_TRINH_JD_TIN_DANG.md
~~~~

<a id="nguon-227"></a>
## role

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/0/n3_files/1/role`.

<!-- NGUON_JSON: ["/b2/projects/0/n3_files/1/role"] -->
~~~~text
process
~~~~

<a id="nguon-228"></a>
## desc

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/0/n3_files/1/desc`.

<!-- NGUON_JSON: ["/b2/projects/0/n3_files/1/desc"] -->
~~~~text
Bước 01–04: vị trí, trường bắt buộc của phiếu yêu cầu tuyển, điều kiện chốt tin.
~~~~

<a id="nguon-229"></a>
## content

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/0/n3_files/1/content`.

<!-- NGUON_JSON: ["/b2/projects/0/n3_files/1/content"] -->
~~~~text
# 02_QUY_TRINH_JD_TIN_DANG — Bước 01–04 · Phiên bản 1.0
> Chỉ ghi các bước, ai làm, trường bắt buộc, điều kiện đi tiếp. Con số và chính sách: xem 03.

## 1. Vị trí
01 Trưởng bộ phận lập phiếu yêu cầu tuyển, Giám đốc duyệt → **02 AI soạn JD, tin đăng, tiêu chí sàng lọc** → 03 HR chốt tin và tự đăng lên kênh đang dùng → 04 ứng viên nộp CV.
Phần C "Tiêu chí sàng lọc" sau khi HR chốt được hệ thống gắn vào mọi phiếu sàng lọc của vị trí (bước 05).

## 2. Trường của phiếu yêu cầu tuyển
| Trường | Bắt buộc? |
|---|---|
| Mã phiếu, Vị trí, Phòng, Cấp bậc, Số lượng | Có |
| Nơi làm việc, Quản lý trực tiếp | Có |
| Việc chính | Có |
| Tiêu chí phải có | Có |
| Tiêu chí nên có | Không |
| Khung lương, Công khai khung lương (Có/Không) | Có |
| Thử việc | Không — không ghi thì theo 03 mục 3 |
| Ngày cần người ("Thứ X, dd/mm/yyyy"), Hạn nhận CV | Có |
| Người duyệt và ngày duyệt | Có — phải ghi "đã duyệt" |
| Lý do tuyển, Ghi chú nội bộ | Không |
**Thiếu** = để trống, "chưa chốt", hoặc Người duyệt ghi "chưa duyệt".

## 3. Điều kiện để HR chốt tin (bước 03)
Phiếu đã duyệt · đủ trường bắt buộc · bản nháp không còn ⛔ và [CẦN …] · lương trên tin trùng phiếu · không có tiêu chí thuộc 03 mục 1. HR tự đăng; AI không đăng.

~~~~

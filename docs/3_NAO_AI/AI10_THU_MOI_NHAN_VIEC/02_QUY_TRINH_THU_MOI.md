# 02_QUY_TRINH_THU_MOI — kiến thức riêng nguyên văn

Trạng thái: **CHƯA DUYỆT**. Bản chuyển nguyên văn từ dữ liệu đã lưu; không phải SPEC hay bằng chứng đã chạy AI.

Nguồn HTML: S1: [GO4AI_Level2_HR_Buoi_1_Quy_trinh_Tuyen_dung_Hoi_nhap.html](../../../data/nguon/GO4AI_Level2_HR_Buoi_1_Quy_trinh_Tuyen_dung_Hoi_nhap.html) · S2: [GO4AI_Level2_HR_Buoi_2_AI_Project_Tuyen_dung_Hoi_nhap.html](../../../data/nguon/GO4AI_Level2_HR_Buoi_2_AI_Project_Tuyen_dung_Hoi_nhap.html) · phần JSON nhúng `worksheet-data`. Mỗi mục ghi khóa cụ thể. S1 và S2 có cùng dữ liệu; chỉ lưu một bản chuẩn.

<a id="nguon-399"></a>
## id

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/3/n3_files/1/id`.

<!-- NGUON_JSON: ["/b2/projects/3/n3_files/1/id"] -->
~~~~text
f2
~~~~

<a id="nguon-400"></a>
## name

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/3/n3_files/1/name`.

<!-- NGUON_JSON: ["/b2/projects/3/n3_files/1/name"] -->
~~~~text
02_QUY_TRINH_THU_MOI.md
~~~~

<a id="nguon-401"></a>
## role

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/3/n3_files/1/role`.

<!-- NGUON_JSON: ["/b2/projects/3/n3_files/1/role"] -->
~~~~text
process
~~~~

<a id="nguon-402"></a>
## desc

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/3/n3_files/1/desc`.

<!-- NGUON_JSON: ["/b2/projects/3/n3_files/1/desc"] -->
~~~~text
Bước 09–12: vị trí, trường bắt buộc của phiếu chốt nhận việc, điều kiện được gửi thư.
~~~~

<a id="nguon-403"></a>
## content

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/3/n3_files/1/content`.

<!-- NGUON_JSON: ["/b2/projects/3/n3_files/1/content"] -->
~~~~text
# 02_QUY_TRINH_THU_MOI — Bước 09–12 · Phiên bản 1.0
> Chỉ ghi các bước, ai làm, trường bắt buộc, điều kiện đi tiếp. Con số và chính sách: xem 03.

## 1. Vị trí
09 Trưởng bộ phận lập phiếu chốt nhận việc, Giám đốc duyệt → **10 AI soạn thư mời nhận việc và danh sách việc chuẩn bị** → 11 HR kiểm, xử lý điểm cần xác nhận, tự gửi thư từ email Phòng Nhân sự → 12 hệ thống nhắc hạn xác nhận (03 mục 9) và hạn việc chuẩn bị (03 mục 10).

## 2. Trường của phiếu chốt nhận việc
**Bắt buộc:** Mã hồ sơ · Họ tên · Vị trí · Cấp bậc · Phòng · Quản lý trực tiếp · Lương chính thức · Ngày bắt đầu · Nơi làm việc · Email ứng viên · Người duyệt và ngày duyệt.

**Không bắt buộc:** Danh xưng (phiếu không ghi thì dùng quy ước trong 04) · Thử việc (không ghi thì theo 03 mục 3) · Ghi chú nội bộ.

Trường bắt buộc được coi là **thiếu** khi: để trống, ghi "chưa chốt", hoặc (với trường Người duyệt) ghi "chưa duyệt".

## 3. Điều kiện được gửi thư (bước 11)
Thư chỉ được gửi khi đủ cả ba điều kiện:
1. Phiếu đã được Giám đốc duyệt.
2. Đủ trường bắt buộc.
3. Phần C1 của bản nháp ("Phải xử lý trước khi gửi") không còn điểm nào.

Các điểm ở Phần C2 ("Lưu ý cho HR") không chặn việc gửi thư; HR đọc và tự quyết.

~~~~

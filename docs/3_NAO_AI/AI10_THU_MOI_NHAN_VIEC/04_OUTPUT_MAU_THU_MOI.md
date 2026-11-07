# 04_OUTPUT_MAU_THU_MOI — kiến thức riêng nguyên văn

Trạng thái: **CHƯA DUYỆT**. Bản chuyển nguyên văn từ dữ liệu đã lưu; không phải SPEC hay bằng chứng đã chạy AI.

Nguồn HTML: S1: [GO4AI_Level2_HR_Buoi_1_Quy_trinh_Tuyen_dung_Hoi_nhap.html](../../../data/nguon/GO4AI_Level2_HR_Buoi_1_Quy_trinh_Tuyen_dung_Hoi_nhap.html) · S2: [GO4AI_Level2_HR_Buoi_2_AI_Project_Tuyen_dung_Hoi_nhap.html](../../../data/nguon/GO4AI_Level2_HR_Buoi_2_AI_Project_Tuyen_dung_Hoi_nhap.html) · phần JSON nhúng `worksheet-data`. Mỗi mục ghi khóa cụ thể. S1 và S2 có cùng dữ liệu; chỉ lưu một bản chuẩn.

<a id="nguon-404"></a>
## id

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/3/n3_files/3/id`.

<!-- NGUON_JSON: ["/b2/projects/3/n3_files/3/id"] -->
~~~~text
f4
~~~~

<a id="nguon-405"></a>
## name

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/3/n3_files/3/name`.

<!-- NGUON_JSON: ["/b2/projects/3/n3_files/3/name"] -->
~~~~text
04_OUTPUT_MAU_THU_MOI.md
~~~~

<a id="nguon-406"></a>
## role

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/3/n3_files/3/role`.

<!-- NGUON_JSON: ["/b2/projects/3/n3_files/3/role"] -->
~~~~text
template
~~~~

<a id="nguon-407"></a>
## desc

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/3/n3_files/3/desc`.

<!-- NGUON_JSON: ["/b2/projects/3/n3_files/3/desc"] -->
~~~~text
Khung A–B–C, quy ước viết, 1 ví dụ người được tuyển khác (NV-2026-009).
~~~~

<a id="nguon-408"></a>
## content

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/3/n3_files/3/content`.

<!-- NGUON_JSON: ["/b2/projects/3/n3_files/3/content"] -->
~~~~text
# 04_OUTPUT_MAU_THU_MOI — Khung, quy ước, một ví dụ · Phiên bản 1.0
File này có 3 phần: **khung bắt buộc**, **quy ước viết**, **một ví dụ đạt chuẩn**.

## PHẦN 1 — KHUNG BẮT BUỘC
Trình bày đúng và chỉ các phần dưới đây, theo đúng thứ tự.

**Dòng 1:** `BẢN NHÁP — CHỜ HR DUYỆT`

**Dòng 2 (chỉ khi cần, tối đa một dòng):**
- Phiếu chưa đủ điều kiện gửi: `⛔ CHƯA ĐỦ ĐIỀU KIỆN GỬI: <lý do ngắn>`
- Phiếu có mâu thuẫn: `⛔ CÓ MÂU THUẪN — KHÔNG GỬI KHI CHƯA XỬ LÝ: <lý do ngắn>`
- Có cả hai: `⛔ CHƯA ĐỦ ĐIỀU KIỆN GỬI VÀ CÓ MÂU THUẪN: <lý do 1>; <lý do 2>`

**ĐẦU HỒ SƠ** (mỗi mục một dòng): Mã hồ sơ · Họ tên · Vị trí · Ngày bắt đầu · Sổ tay đã dùng (tên + phiên bản)

**PHẦN A — THƯ MỜI NHẬN VIỆC** (gửi người được tuyển; tối đa 250 chữ, tính từ "Kính gửi" đến hết chữ ký)
- Dòng "Gửi:" email người được tuyển · Dòng "Tiêu đề:" `Thư mời nhận việc — <Vị trí> — <Họ tên>`
- `Kính gửi <Danh xưng> <Họ tên>,`
- Đủ 7 mục, đánh số, theo thứ tự:
  1. Lời mời
  2. Vị trí, phòng, quản lý trực tiếp
  3. Ngày, giờ có mặt ngày đầu; quầy lễ tân và địa chỉ đầy đủ của nơi làm việc
  4. Thu nhập: lương chính thức, thời gian thử việc, lương thử việc
  5. Giờ làm việc
  6. Giấy tờ mang theo
  7. Xác nhận và liên hệ: hạn xác nhận, email, điện thoại
- Chữ ký: `Phòng Nhân sự — Công ty Demo HR1`

**PHẦN B — VIỆC CHUẨN BỊ TRƯỚC NGÀY ĐẦU** (nội bộ)
Bảng 5 cột: `Việc | Người phụ trách | Hạn | Theo quy định nào | Trạng thái`
- Cột Hạn ghi thứ và ngày cụ thể. Cột Trạng thái để trống cho HR cập nhật.

**PHẦN C — CẦN HR XÁC NHẬN** — luôn có đủ hai nhóm:
- `C1. Phải xử lý trước khi gửi` — mỗi điểm một dòng: `<số>. <Nội dung> — <vấn đề> — Ảnh hưởng: <mục nào> — Ai xác nhận: <người>`
- `C2. Lưu ý cho HR (không chặn gửi)` — mỗi điểm một dòng: `<số>. <Nội dung> — <lưu ý>`
- Nhóm nào không có điểm nào thì ghi: `Không có.`

Không thêm phần nào khác: không in phần tự rà, không thêm lời bình, không thêm kết luận.

## PHẦN 2 — QUY ƯỚC VIẾT
- Danh xưng người nhận thư lấy theo trường "Danh xưng" của phiếu. Phiếu không ghi thì dùng "Anh/Chị".
- Không thêm danh xưng (Anh, Chị, Ông, Bà) cho người khác, ví dụ quản lý trực tiếp.
- Ngày viết dạng: Thứ Hai, 02/11/2026. Tiền viết dạng: 15.000.000 đồng/tháng.
- Giọng lịch sự, ngắn gọn. Không quảng cáo, không lời hứa ngoài phiếu và tài liệu.

## PHẦN 3 — VÍ DỤ ĐẠT CHUẨN
> **VÍ DỤ MINH HỌA — dữ liệu của một người được tuyển khác, làm việc ở nơi khác, cấp bậc khác. Chỉ dùng để học cách trình bày. KHÔNG lấy tên, ngày, địa chỉ, số tiền, thời gian thử việc, giấy tờ hay bất kỳ dữ kiện nào từ ví dụ này.**

BẢN NHÁP — CHỜ HR DUYỆT

Mã hồ sơ: NV-2026-009
Họ tên: Trần Văn Bình
Vị trí: Trưởng nhóm Kho vận
Ngày bắt đầu: Thứ Hai, 05/10/2026
Sổ tay đã dùng: Sổ tay Tuyển dụng & Hội nhập 1.0

**PHẦN A — THƯ MỜI NHẬN VIỆC**
Gửi: vanbinh.demo@example.com
Tiêu đề: Thư mời nhận việc — Trưởng nhóm Kho vận — Trần Văn Bình

Kính gửi Anh Trần Văn Bình,

1. Công ty Demo HR1 trân trọng mời Anh nhận vị trí Trưởng nhóm Kho vận.
2. Vị trí: Trưởng nhóm Kho vận, Phòng Kho vận. Quản lý trực tiếp: Lý Thanh Sơn — Trưởng kho.
3. Ngày đầu: Thứ Hai, 05/10/2026. Anh vui lòng có mặt lúc 8:30 tại quầy lễ tân nhà điều hành, tầng trệt, Kho Tân Mẫu, Lô K1, Khu công nghiệp Mẫu, Phường Tân Mẫu, TP.HCM. Phòng Nhân sự sẽ đón Anh.
4. Thu nhập: lương chính thức 18.000.000 đồng/tháng. Thời gian thử việc 60 ngày, lương thử việc bằng 100% lương chính thức.
5. Giờ làm việc: Thứ Hai đến Thứ Sáu, 8:00–17:00, nghỉ trưa 12:00–13:00.
6. Giấy tờ mang theo: căn cước công dân (bản chính), 2 ảnh 3x4, bản sao bằng cấp cao nhất, số tài khoản ngân hàng đứng tên Anh, bản sao chứng chỉ huấn luyện an toàn lao động. Giấy khám sức khỏe nộp trong vòng 30 ngày kể từ ngày đầu.
7. Xác nhận và liên hệ: Anh vui lòng trả lời email này để xác nhận trong vòng 3 ngày làm việc kể từ ngày nhận thư. Liên hệ: tuyendung@demo-hr1.local · 028 0000 0000.

Trân trọng,
Phòng Nhân sự — Công ty Demo HR1

**PHẦN B — VIỆC CHUẨN BỊ TRƯỚC NGÀY ĐẦU**
| Việc | Người phụ trách | Hạn | Theo quy định nào | Trạng thái |
|---|---|---|---|---|
| Cấp máy tính và email công ty | IT | Thứ Năm, 01/10/2026 | Sổ tay 1.0 mục 10 — trước 2 ngày làm việc | |
| Chuẩn bị hợp đồng thử việc | Nhân sự | Thứ Sáu, 02/10/2026 | Sổ tay 1.0 mục 10 — trước 1 ngày làm việc | |
| Chọn người kèm cặp; duyệt kế hoạch hội nhập 30 ngày | Lý Thanh Sơn — Quản lý trực tiếp | Thứ Sáu, 02/10/2026 | Sổ tay 1.0 mục 10 — trước 1 ngày làm việc | |
| Chuẩn bị chỗ ngồi và thẻ ra vào | Hành chính | Thứ Sáu, 02/10/2026 | Sổ tay 1.0 mục 10 — trước 1 ngày làm việc | |

**PHẦN C — CẦN HR XÁC NHẬN**
C1. Phải xử lý trước khi gửi
Không có.
C2. Lưu ý cho HR (không chặn gửi)
Không có.

~~~~

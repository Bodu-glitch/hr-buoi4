# 04_OUTPUT_MAU_JD_TIN_DANG — kiến thức riêng nguyên văn

Trạng thái: **CHƯA DUYỆT**. Bản chuyển nguyên văn từ dữ liệu đã lưu; không phải SPEC hay bằng chứng đã chạy AI.

Nguồn HTML: S1: [GO4AI_Level2_HR_Buoi_1_Quy_trinh_Tuyen_dung_Hoi_nhap.html](../../../data/nguon/GO4AI_Level2_HR_Buoi_1_Quy_trinh_Tuyen_dung_Hoi_nhap.html) · S2: [GO4AI_Level2_HR_Buoi_2_AI_Project_Tuyen_dung_Hoi_nhap.html](../../../data/nguon/GO4AI_Level2_HR_Buoi_2_AI_Project_Tuyen_dung_Hoi_nhap.html) · phần JSON nhúng `worksheet-data`. Mỗi mục ghi khóa cụ thể. S1 và S2 có cùng dữ liệu; chỉ lưu một bản chuẩn.

<a id="nguon-230"></a>
## id

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/0/n3_files/3/id`.

<!-- NGUON_JSON: ["/b2/projects/0/n3_files/3/id"] -->
~~~~text
f4
~~~~

<a id="nguon-231"></a>
## name

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/0/n3_files/3/name`.

<!-- NGUON_JSON: ["/b2/projects/0/n3_files/3/name"] -->
~~~~text
04_OUTPUT_MAU_JD_TIN_DANG.md
~~~~

<a id="nguon-232"></a>
## role

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/0/n3_files/3/role`.

<!-- NGUON_JSON: ["/b2/projects/0/n3_files/3/role"] -->
~~~~text
template
~~~~

<a id="nguon-233"></a>
## desc

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/0/n3_files/3/desc`.

<!-- NGUON_JSON: ["/b2/projects/0/n3_files/3/desc"] -->
~~~~text
Khung A–B–C–D, quy ước, 1 ví dụ phiếu khác (YC-DEMO-01).
~~~~

<a id="nguon-234"></a>
## content

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/0/n3_files/3/content`.

<!-- NGUON_JSON: ["/b2/projects/0/n3_files/3/content"] -->
~~~~text
# 04_OUTPUT_MAU_JD_TIN_DANG — Khung, quy ước, một ví dụ · Phiên bản 1.0

## 1. Khung
Trình bày đúng và chỉ các phần dưới đây, theo đúng thứ tự.
```
BẢN NHÁP — CHỜ HR CHỐT
[dòng 2 chỉ khi cần, tối đa một dòng:
  ⛔ CHƯA ĐỦ ĐIỀU KIỆN ĐĂNG: <lý do>
  ⛔ CÓ MÂU THUẪN — KHÔNG ĐĂNG KHI CHƯA XỬ LÝ: <lý do>
  ⛔ CHƯA ĐỦ ĐIỀU KIỆN ĐĂNG VÀ CÓ MÂU THUẪN: <lý do 1>; <lý do 2>]
Mã phiếu · Vị trí · Ngày cần người · Sổ tay đã dùng (tên + phiên bản)

PHẦN A — JD NỘI BỘ
 Vị trí · Phòng · Cấp bậc · Quản lý trực tiếp · Nơi làm việc · Số lượng
 Việc chính (đánh số) · Tiêu chí phải có · Tiêu chí nên có · Lương và thử việc

PHẦN B — TIN ĐĂNG (đưa ra ngoài, tối đa 250 chữ)
 Tiêu đề · 1 câu giới thiệu · Công việc · Yêu cầu (có dòng "Ưu tiên" cho tiêu chí nên có)
 · Quyền lợi · Ứng tuyển (link trên tin, hạn nhận CV, thời gian phản hồi)

PHẦN C — TIÊU CHÍ SÀNG LỌC
 P1, P2… (phải có) · N1, N2… (nên có) — mỗi dòng một tiêu chí

PHẦN D — CẦN HR XÁC NHẬN
 D1. Phải xử lý trước khi đăng — <số>. <Nội dung> — <vấn đề> — Ảnh hưởng: <phần> — Ai xác nhận: <người>
 D2. Lưu ý (không chặn đăng) — <số>. <Nội dung> — <lưu ý>
```

## 2. Quy ước
- Tiêu đề tin: `<Vị trí> — <Nơi làm việc> — <Khung lương hoặc "Thỏa thuận">`.
- Tiền viết dạng 13.000.000–16.000.000 đồng/tháng. Ngày viết dạng Thứ Hai, 02/11/2026.
- Không dùng từ "gấp", không dùng tính từ quảng cáo, không hứa điều ngoài 03 mục 4.
- Tiêu chí ở Phần C giữ đúng ý của phiếu; viết sao cho đọc CV là kiểm được.
- Thiếu: [CẦN HR ĐIỀN: …] · Mâu thuẫn: [CẦN HR XÁC NHẬN: …]. D1/D2 không có gì thì ghi "Không có."
- Không thêm phần tự rà, lời bình hay kết luận.

## 3. Ví dụ (phiếu khác — YC-DEMO-01, KHÔNG lấy dữ kiện từ đây)
BẢN NHÁP — CHỜ HR CHỐT
⛔ CHƯA ĐỦ ĐIỀU KIỆN ĐĂNG: thiếu Khung lương
Mã phiếu: YC-DEMO-01 · Vị trí: Nhân viên Hành chính · Ngày cần người: Thứ Ba, 01/12/2026 · Sổ tay đã dùng: Sổ tay Tuyển dụng & Hội nhập 1.0

PHẦN A — JD NỘI BỘ
Vị trí: Nhân viên Hành chính · Phòng: Hành chính · Cấp bậc: Chuyên viên · … · Lương và thử việc: [CẦN HR ĐIỀN: Khung lương]. Thử việc 45 ngày, lương thử việc bằng 100% lương chính thức.

PHẦN B — TIN ĐĂNG
Tiêu đề: Nhân viên Hành chính — Văn phòng TP.HCM — [CẦN HR ĐIỀN: Khung lương]
… Quyền lợi: Lương [CẦN HR ĐIỀN: Khung lương] · Thử việc 45 ngày, hưởng 100% lương · …

PHẦN C — TIÊU CHÍ SÀNG LỌC
P1. Ít nhất 1 năm làm hành chính văn phòng · N1. Dùng được Google Sheets

PHẦN D — CẦN HR XÁC NHẬN
D1. Phải xử lý trước khi đăng
1. Khung lương — phiếu để trống — Ảnh hưởng: Phần A, Phần B — Ai xác nhận: Giám đốc
D2. Lưu ý (không chặn đăng)
Không có.

~~~~

# 04_OUTPUT_MAU_HOI_NHAP — kiến thức riêng nguyên văn

Trạng thái: **CHƯA DUYỆT**. Bản chuyển nguyên văn từ dữ liệu đã lưu; không phải SPEC hay bằng chứng đã chạy AI.

Nguồn HTML: S1: [GO4AI_Level2_HR_Buoi_1_Quy_trinh_Tuyen_dung_Hoi_nhap.html](../../../data/nguon/GO4AI_Level2_HR_Buoi_1_Quy_trinh_Tuyen_dung_Hoi_nhap.html) · S2: [GO4AI_Level2_HR_Buoi_2_AI_Project_Tuyen_dung_Hoi_nhap.html](../../../data/nguon/GO4AI_Level2_HR_Buoi_2_AI_Project_Tuyen_dung_Hoi_nhap.html) · phần JSON nhúng `worksheet-data`. Mỗi mục ghi khóa cụ thể. S1 và S2 có cùng dữ liệu; chỉ lưu một bản chuẩn.

<a id="nguon-462"></a>
## id

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/4/n3_files/3/id`.

<!-- NGUON_JSON: ["/b2/projects/4/n3_files/3/id"] -->
~~~~text
f4
~~~~

<a id="nguon-463"></a>
## name

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/4/n3_files/3/name`.

<!-- NGUON_JSON: ["/b2/projects/4/n3_files/3/name"] -->
~~~~text
04_OUTPUT_MAU_HOI_NHAP.md
~~~~

<a id="nguon-464"></a>
## role

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/4/n3_files/3/role`.

<!-- NGUON_JSON: ["/b2/projects/4/n3_files/3/role"] -->
~~~~text
template
~~~~

<a id="nguon-465"></a>
## desc

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/4/n3_files/3/desc`.

<!-- NGUON_JSON: ["/b2/projects/4/n3_files/3/desc"] -->
~~~~text
Khung A–E, quy ước, 1 ví dụ người khác (NV-DEMO-01).
~~~~

<a id="nguon-466"></a>
## content

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/4/n3_files/3/content`.

<!-- NGUON_JSON: ["/b2/projects/4/n3_files/3/content"] -->
~~~~text
# 04_OUTPUT_MAU_HOI_NHAP — Khung, quy ước, một ví dụ · Phiên bản 1.0

## 1. Khung
Trình bày đúng và chỉ các phần dưới đây, theo đúng thứ tự.
```
KẾ HOẠCH HỘI NHẬP 30 NGÀY — BẢN NHÁP CHỜ QUẢN LÝ DUYỆT
[dòng 2 chỉ khi cần, tối đa một dòng:
  ⛔ CHƯA ĐỦ ĐIỀU KIỆN DÙNG: <lý do>
  ⛔ CÓ MÂU THUẪN — KHÔNG DÙNG KHI CHƯA XỬ LÝ: <lý do>
  ⛔ CHƯA ĐỦ ĐIỀU KIỆN DÙNG VÀ CÓ MÂU THUẪN: <lý do 1>; <lý do 2>]
Mã NV · Họ tên · Vị trí · Quản lý trực tiếp · Người kèm cặp · Ngày bắt đầu · Sổ tay đã dùng

PHẦN A — MỤC TIÊU 30 NGÀY (chép nguyên chỉ tiêu quản lý đặt, đánh số)
PHẦN B — KẾ HOẠCH THEO TUẦN
 | Giai đoạn | Việc | Người phụ trách | Căn cứ |
 Giai đoạn: "Tuần 1 (đến check-in tuần 1, <ngày>)" · "Tuần 2" · "Tuần 3–4 (đến check-in 30 ngày, <ngày>)" · "Cả 30 ngày"
PHẦN C — MỐC GẶP
 | Mốc | Ngày (chép từ phiếu) | Ai | Nội dung |
PHẦN D — HỖ TRỢ CẦN KÈM (từ ghi chú phỏng vấn; không có thì "Không có.")
PHẦN E — CẦN XÁC NHẬN
 E1. Phải xử lý trước khi dùng — <số>. <Nội dung> — <vấn đề> — Ai xác nhận: <người>
 E2. Lưu ý (không chặn) — <số>. <Nội dung> — <lưu ý>
```

## 2. Quy ước
- Cột Căn cứ ghi "Việc chính 2", "03 mục 8", "Phần A", "Ghi chú hỗ trợ".
- Ngày viết dạng Thứ Sáu, 06/11/2026 — chép từ phiếu, không tự tính.
- Mỗi giai đoạn 2–4 việc; mỗi việc một dòng, động từ ở đầu.
- E1/E2 không có gì thì ghi "Không có."
- Không thêm phần tự rà, lời bình, lời khen chê.

## 3. Ví dụ (người khác — NV-DEMO-01, KHÔNG lấy dữ kiện từ đây)
KẾ HOẠCH HỘI NHẬP 30 NGÀY — BẢN NHÁP CHỜ QUẢN LÝ DUYỆT
⛔ CHƯA ĐỦ ĐIỀU KIỆN DÙNG: thiếu Người kèm cặp
NV-DEMO-01 · Phan Gia Bảo · Nhân viên Hành chính · Quản lý trực tiếp: Trưởng bộ phận Hành chính · Người kèm cặp: [CẦN QUẢN LÝ ĐIỀN: Người kèm cặp] · Ngày bắt đầu: Thứ Ba, 01/12/2026 · Sổ tay Tuyển dụng & Hội nhập 1.0

PHẦN A — MỤC TIÊU 30 NGÀY
[CẦN QUẢN LÝ ĐIỀN: Chỉ tiêu 30 ngày]

PHẦN B — KẾ HOẠCH THEO TUẦN
| Giai đoạn | Việc | Người phụ trách | Căn cứ |
|---|---|---|---|
| Tuần 1 (đến check-in tuần 1, Thứ Hai, 07/12/2026) | Ngày đầu: thủ tục, ký hợp đồng thử việc; chiều gặp quản lý | HR; Quản lý trực tiếp | 03 mục 8 |
| Tuần 2 | Làm quen quy trình văn thư đến – đi | [CẦN QUẢN LÝ ĐIỀN: Người kèm cặp] | Việc chính 1 |

PHẦN C — MỐC GẶP
| Mốc | Ngày | Ai | Nội dung |
|---|---|---|---|
| Check-in tuần 1 | Thứ Hai, 07/12/2026 | Quản lý trực tiếp + HR | 15 phút: việc tuần 1, vướng mắc |

PHẦN D — HỖ TRỢ CẦN KÈM
Không có.

PHẦN E — CẦN XÁC NHẬN
E1. Phải xử lý trước khi dùng
1. Người kèm cặp — phiếu ghi "chưa chọn" — Ai xác nhận: Quản lý trực tiếp
E2. Lưu ý (không chặn)
1. Chỉ tiêu 30 ngày — phiếu để trống — quản lý đặt nếu cần.

~~~~

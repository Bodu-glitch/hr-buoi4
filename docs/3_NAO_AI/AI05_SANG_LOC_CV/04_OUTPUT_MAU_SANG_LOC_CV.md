# 04_OUTPUT_MAU_SANG_LOC_CV — kiến thức riêng nguyên văn

Trạng thái: **CHƯA DUYỆT**. Bản chuyển nguyên văn từ dữ liệu đã lưu; không phải SPEC hay bằng chứng đã chạy AI.

Nguồn HTML: S1: [GO4AI_Level2_HR_Buoi_1_Quy_trinh_Tuyen_dung_Hoi_nhap.html](../../../data/nguon/GO4AI_Level2_HR_Buoi_1_Quy_trinh_Tuyen_dung_Hoi_nhap.html) · S2: [GO4AI_Level2_HR_Buoi_2_AI_Project_Tuyen_dung_Hoi_nhap.html](../../../data/nguon/GO4AI_Level2_HR_Buoi_2_AI_Project_Tuyen_dung_Hoi_nhap.html) · phần JSON nhúng `worksheet-data`. Mỗi mục ghi khóa cụ thể. S1 và S2 có cùng dữ liệu; chỉ lưu một bản chuẩn.

<a id="nguon-288"></a>
## id

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/1/n3_files/3/id`.

<!-- NGUON_JSON: ["/b2/projects/1/n3_files/3/id"] -->
~~~~text
f4
~~~~

<a id="nguon-289"></a>
## name

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/1/n3_files/3/name`.

<!-- NGUON_JSON: ["/b2/projects/1/n3_files/3/name"] -->
~~~~text
04_OUTPUT_MAU_SANG_LOC_CV.md
~~~~

<a id="nguon-290"></a>
## role

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/1/n3_files/3/role`.

<!-- NGUON_JSON: ["/b2/projects/1/n3_files/3/role"] -->
~~~~text
template
~~~~

<a id="nguon-291"></a>
## desc

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/1/n3_files/3/desc`.

<!-- NGUON_JSON: ["/b2/projects/1/n3_files/3/desc"] -->
~~~~text
Khung A–E, quy ước trích dẫn, 1 ví dụ ứng viên khác (UV-DEMO-01).
~~~~

<a id="nguon-292"></a>
## content

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/1/n3_files/3/content`.

<!-- NGUON_JSON: ["/b2/projects/1/n3_files/3/content"] -->
~~~~text
# 04_OUTPUT_MAU_SANG_LOC_CV — Khung, quy ước, một ví dụ · Phiên bản 1.0

## 1. Khung
Trình bày đúng và chỉ các phần dưới đây, theo đúng thứ tự.
```
BẢN TÓM TẮT CV — BẢN NHÁP CHỜ HR KIỂM
[dòng 2 chỉ khi cần, tối đa một dòng:
  ⛔ CHƯA ĐỦ ĐIỀU KIỆN DÙNG: <lý do>
  ⛔ CÓ MÂU THUẪN — KHÔNG DÙNG KHI CHƯA XỬ LÝ: <lý do>
  ⛔ CHƯA ĐỦ ĐIỀU KIỆN DÙNG VÀ CÓ MÂU THUẪN: <lý do 1>; <lý do 2>]
Mã UV · Họ tên · Vị trí ứng tuyển · Mã phiếu yêu cầu

PHẦN A — ĐỐI CHIẾU TIÊU CHÍ
 | Tiêu chí | Kết quả | Trích CV |   (P trước, N sau; kết quả: CÓ / CHƯA THẤY / KHÔNG ĐẠT)
PHẦN B — TÓM TẮT KINH NGHIỆM (tối đa 5 dòng: mốc thời gian · chức danh · nơi làm · việc liên quan)
PHẦN C — ĐỀ XUẤT: Nhóm A / B / C + một câu lý do theo 03 mục 6 — hoặc "Chưa đề xuất — <lý do>"
PHẦN D — CÂU CẦN XÁC MINH (đánh số; ghi tiêu chí trong ngoặc ở đầu câu)
PHẦN E — CẦN HR XÁC NHẬN
 E1. Phải xử lý trước khi dùng — <số>. <Nội dung> — <vấn đề> — Ai xác nhận: <người>
 E2. Lưu ý (không chặn) — <số>. <Nội dung> — <lưu ý>
```

## 2. Quy ước
- Trích CV nguyên văn trong ngoặc kép, mỗi trích không quá 20 chữ.
- Kinh nghiệm ghi mốc như CV (ví dụ "03/2022 – nay"); khi tính số năm ghi thêm "tính đến <ngày nộp>".
- CHƯA THẤY: cột Trích CV ghi "CV không nói tới" hoặc trích câu gần nhất để HR thấy vì sao.
- Câu cần xác minh viết lịch sự, xưng "anh/chị", mỗi câu một ý.
- E1/E2 không có gì thì ghi "Không có."
- Không thêm phần tự rà, lời khen chê hay kết luận.

## 3. Ví dụ (ứng viên khác — UV-DEMO-01, KHÔNG lấy dữ kiện từ đây)
BẢN TÓM TẮT CV — BẢN NHÁP CHỜ HR KIỂM
UV-DEMO-01 · Phan Gia Bảo · Nhân viên Hành chính · YC-DEMO-01

PHẦN A — ĐỐI CHIẾU TIÊU CHÍ
| Tiêu chí | Kết quả | Trích CV |
|---|---|---|
| P1. Ít nhất 1 năm làm hành chính văn phòng | CHƯA THẤY | CV ghi "Lễ tân khách sạn" — không nói hành chính văn phòng |
| N1. Dùng được Google Sheets | CÓ | "lập bảng chấm công trên Google Sheets" |

PHẦN B — TÓM TẮT KINH NGHIỆM
- 06/2024 – nay · Lễ tân · Khách sạn Mẫu F — đón khách, lập bảng chấm công.

PHẦN C — ĐỀ XUẤT
Nhóm B — Cần hỏi thêm: P1 chưa thấy trong CV, không có tiêu chí phải có nào không đạt.

PHẦN D — CÂU CẦN XÁC MINH
1. (P1) Ở vị trí lễ tân, anh có làm việc hành chính văn phòng như văn thư, hồ sơ nhân sự không?

PHẦN E — CẦN HR XÁC NHẬN
E1. Phải xử lý trước khi dùng
Không có.
E2. Lưu ý (không chặn)
Không có.

~~~~

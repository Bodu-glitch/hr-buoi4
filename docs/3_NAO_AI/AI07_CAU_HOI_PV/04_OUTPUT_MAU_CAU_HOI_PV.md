# 04_OUTPUT_MAU_CAU_HOI_PV — kiến thức riêng nguyên văn

Trạng thái: **CHƯA DUYỆT**. Bản chuyển nguyên văn từ dữ liệu đã lưu; không phải SPEC hay bằng chứng đã chạy AI.

Nguồn HTML: S1: [GO4AI_Level2_HR_Buoi_1_Quy_trinh_Tuyen_dung_Hoi_nhap.html](../../../data/nguon/GO4AI_Level2_HR_Buoi_1_Quy_trinh_Tuyen_dung_Hoi_nhap.html) · S2: [GO4AI_Level2_HR_Buoi_2_AI_Project_Tuyen_dung_Hoi_nhap.html](../../../data/nguon/GO4AI_Level2_HR_Buoi_2_AI_Project_Tuyen_dung_Hoi_nhap.html) · phần JSON nhúng `worksheet-data`. Mỗi mục ghi khóa cụ thể. S1 và S2 có cùng dữ liệu; chỉ lưu một bản chuẩn.

<a id="nguon-346"></a>
## id

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/2/n3_files/3/id`.

<!-- NGUON_JSON: ["/b2/projects/2/n3_files/3/id"] -->
~~~~text
f4
~~~~

<a id="nguon-347"></a>
## name

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/2/n3_files/3/name`.

<!-- NGUON_JSON: ["/b2/projects/2/n3_files/3/name"] -->
~~~~text
04_OUTPUT_MAU_CAU_HOI_PV.md
~~~~

<a id="nguon-348"></a>
## role

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/2/n3_files/3/role`.

<!-- NGUON_JSON: ["/b2/projects/2/n3_files/3/role"] -->
~~~~text
template
~~~~

<a id="nguon-349"></a>
## desc

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/2/n3_files/3/desc`.

<!-- NGUON_JSON: ["/b2/projects/2/n3_files/3/desc"] -->
~~~~text
Khung A–C, quy ước câu hỏi, 1 ví dụ ứng viên khác (UV-DEMO-01).
~~~~

<a id="nguon-350"></a>
## content

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/2/n3_files/3/content`.

<!-- NGUON_JSON: ["/b2/projects/2/n3_files/3/content"] -->
~~~~text
# 04_OUTPUT_MAU_CAU_HOI_PV — Khung, quy ước, một ví dụ · Phiên bản 1.0

## 1. Khung
Trình bày đúng và chỉ các phần dưới đây, theo đúng thứ tự.
```
BỘ CÂU HỎI GỢI Ý — CHỜ TRƯỞNG BỘ PHẬN CHỌN
[dòng 2 chỉ khi cần, tối đa một dòng:
  ⛔ CHƯA ĐỦ ĐIỀU KIỆN DÙNG: <lý do>
  ⛔ CÓ MÂU THUẪN — KHÔNG DÙNG KHI CHƯA XỬ LÝ: <lý do>
  ⛔ CHƯA ĐỦ ĐIỀU KIỆN DÙNG VÀ CÓ MÂU THUẪN: <lý do 1>; <lý do 2>]
Mã UV · Họ tên · Vị trí · Thời gian phỏng vấn · Người phỏng vấn

PHẦN A — CÂU HỎI GỢI Ý (6–8 câu)
 | # | Câu hỏi | Kiểm gì | Dấu hiệu trả lời tốt | Hỏi tiếp nếu trả lời chung chung |
PHẦN B — NHẮC NGƯỜI PHỎNG VẤN (theo 03 mục 1 và mục 7)
PHẦN C — CẦN HR XÁC NHẬN
 C1. Phải xử lý trước khi dùng — <số>. <Nội dung> — <vấn đề> — Ai xác nhận: <người>
 C2. Lưu ý (không chặn) — <số>. <Nội dung> — <lưu ý>
```

## 2. Quy ước
- Cột "Kiểm gì" ghi mã tiêu chí (P1, N2…), "Điểm 1, 2…" (điểm cần xác minh) hoặc "Ghi chú TBP".
- Mỗi câu hỏi không quá 30 chữ, xưng "anh/chị" theo danh xưng chung, một câu một ý.
- Dấu hiệu trả lời tốt viết thành điều nghe được (có con số, có ví dụ cụ thể, nêu được bước làm).
- Ngày viết dạng Thứ Năm, 01/10/2026, 9:30.
- C1/C2 không có gì thì ghi "Không có."
- Không thêm phần tự rà, lời bình, dự đoán kết quả.

## 3. Ví dụ (ứng viên khác — UV-DEMO-01, KHÔNG lấy dữ kiện từ đây)
BỘ CÂU HỎI GỢI Ý — CHỜ TRƯỞNG BỘ PHẬN CHỌN
UV-DEMO-01 · Phan Gia Bảo · Nhân viên Hành chính (YC-DEMO-01) · Thứ Ba, 24/11/2026, 14:00 · Trưởng bộ phận Hành chính; Chuyên viên tuyển dụng

PHẦN A — CÂU HỎI GỢI Ý
| # | Câu hỏi | Kiểm gì | Dấu hiệu trả lời tốt | Hỏi tiếp nếu trả lời chung chung |
|---|---|---|---|---|
| 1 | Kể lại một việc giấy tờ anh tự xử lý từ đầu đến cuối. | P1 | Nêu được loại giấy tờ, các bước, thời hạn | "Nếu sai một chỗ, anh phát hiện thế nào?" |
| … | … | … | … | … |

PHẦN B — NHẮC NGƯỜI PHỎNG VẤN
- Không hỏi tuổi, hôn nhân, con cái, kế hoạch gia đình, quê quán, ngoại hình, tôn giáo, sức khỏe ngoài yêu cầu công việc.
- Không hứa mức lương, không báo kết quả tại buổi; kết quả báo trong 5 ngày làm việc.

PHẦN C — CẦN HR XÁC NHẬN
C1. Phải xử lý trước khi dùng
Không có.
C2. Lưu ý (không chặn)
Không có.

~~~~

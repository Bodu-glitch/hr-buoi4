# 02_QUY_TRINH_CAU_HOI_PV — kiến thức riêng nguyên văn

Trạng thái: **CHƯA DUYỆT**. Bản chuyển nguyên văn từ dữ liệu đã lưu; không phải SPEC hay bằng chứng đã chạy AI.

Nguồn HTML: S1: [GO4AI_Level2_HR_Buoi_1_Quy_trinh_Tuyen_dung_Hoi_nhap.html](../../../data/nguon/GO4AI_Level2_HR_Buoi_1_Quy_trinh_Tuyen_dung_Hoi_nhap.html) · S2: [GO4AI_Level2_HR_Buoi_2_AI_Project_Tuyen_dung_Hoi_nhap.html](../../../data/nguon/GO4AI_Level2_HR_Buoi_2_AI_Project_Tuyen_dung_Hoi_nhap.html) · phần JSON nhúng `worksheet-data`. Mỗi mục ghi khóa cụ thể. S1 và S2 có cùng dữ liệu; chỉ lưu một bản chuẩn.

<a id="nguon-341"></a>
## id

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/2/n3_files/1/id`.

<!-- NGUON_JSON: ["/b2/projects/2/n3_files/1/id"] -->
~~~~text
f2
~~~~

<a id="nguon-342"></a>
## name

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/2/n3_files/1/name`.

<!-- NGUON_JSON: ["/b2/projects/2/n3_files/1/name"] -->
~~~~text
02_QUY_TRINH_CAU_HOI_PV.md
~~~~

<a id="nguon-343"></a>
## role

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/2/n3_files/1/role`.

<!-- NGUON_JSON: ["/b2/projects/2/n3_files/1/role"] -->
~~~~text
process
~~~~

<a id="nguon-344"></a>
## desc

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/2/n3_files/1/desc`.

<!-- NGUON_JSON: ["/b2/projects/2/n3_files/1/desc"] -->
~~~~text
Bước 06–09: vị trí, trường bắt buộc của phiếu chuẩn bị phỏng vấn, điều kiện đi tiếp.
~~~~

<a id="nguon-345"></a>
## content

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/2/n3_files/1/content`.

<!-- NGUON_JSON: ["/b2/projects/2/n3_files/1/content"] -->
~~~~text
# 02_QUY_TRINH_CAU_HOI_PV — Bước 06–09 · Phiên bản 1.0
> Chỉ ghi các bước, ai làm, trường bắt buộc, điều kiện đi tiếp. Quy định phỏng vấn: xem 03 mục 7.

## 1. Vị trí
06 HR và trưởng bộ phận chọn người mời, HR hẹn lịch → **07 AI gợi ý câu hỏi** → 08 phỏng vấn, mỗi người phỏng vấn tự ghi phiếu đánh giá → 09 chốt người nhận việc.

## 2. Trường của phiếu chuẩn bị phỏng vấn
| Trường | Bắt buộc? |
|---|---|
| Mã UV, Họ tên, Vị trí (kèm mã phiếu YC) | Có |
| Tiêu chí phải có | Có |
| Tiêu chí nên có | Không |
| Bản tóm tắt CV — phải ghi "HR đã kiểm" | Có |
| Điểm cần xác minh | Có |
| Vòng, Thời gian phỏng vấn ("Thứ X, dd/mm/yyyy, giờ"), Người phỏng vấn | Không — trống thì nhắc HR |
| Ghi chú của trưởng bộ phận | Không |
**Thiếu** = để trống, "chưa chốt", hoặc bản tóm tắt ghi "chưa kiểm".

## 3. Điều kiện đi tiếp sang bước 08
Không còn ⛔; trưởng bộ phận đã chọn câu hỏi cuối; HR đã xác nhận lịch với ứng viên và người phỏng vấn.

~~~~

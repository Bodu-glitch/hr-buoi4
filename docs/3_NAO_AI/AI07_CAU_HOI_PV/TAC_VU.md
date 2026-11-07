# AI07_CAU_HOI_PV — nhiệm vụ và giới hạn

Trạng thái: **CHƯA DUYỆT**. Bản chuyển nguyên văn từ dữ liệu đã lưu; không phải SPEC hay bằng chứng đã chạy AI.

Nguồn HTML: S1: [GO4AI_Level2_HR_Buoi_1_Quy_trinh_Tuyen_dung_Hoi_nhap.html](../../../data/nguon/GO4AI_Level2_HR_Buoi_1_Quy_trinh_Tuyen_dung_Hoi_nhap.html) · S2: [GO4AI_Level2_HR_Buoi_2_AI_Project_Tuyen_dung_Hoi_nhap.html](../../../data/nguon/GO4AI_Level2_HR_Buoi_2_AI_Project_Tuyen_dung_Hoi_nhap.html) · phần JSON nhúng `worksheet-data`. Mỗi mục ghi khóa cụ thể. S1 và S2 có cùng dữ liệu; chỉ lưu một bản chuẩn.

<a id="nguon-319"></a>
## id

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/2/id`.

<!-- NGUON_JSON: ["/b2/projects/2/id"] -->
~~~~text
AI07_CAU_HOI_PV
~~~~

<a id="nguon-320"></a>
## name

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/2/name`.

<!-- NGUON_JSON: ["/b2/projects/2/name"] -->
~~~~text
AI07_CAU_HOI_PV · 07 · Gợi ý
~~~~

<a id="nguon-321"></a>
## Lúc chạy và mục đích

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/2/n1_flow`.

<!-- NGUON_JSON: ["/b2/projects/2/n1_flow"] -->
~~~~text
Khi nhận phiếu chuẩn bị phỏng vấn (tiêu chí + bản tóm tắt CV đã HR kiểm + điểm cần xác minh), AI gợi ý 6–8 câu hỏi gắn với từng tiêu chí kèm dấu hiệu trả lời tốt, để Trưởng bộ phận tự chọn câu cuối.
~~~~

<a id="nguon-322"></a>
## Bước

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/2/n1_step`.

<!-- NGUON_JSON: ["/b2/projects/2/n1_step"] -->
~~~~text
Bước 07
~~~~

<a id="nguon-323"></a>
## Mã màn hình

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/2/n1_screen`.

<!-- NGUON_JSON: ["/b2/projects/2/n1_screen"] -->
~~~~text
MH03
~~~~

<a id="nguon-324"></a>
## Người làm gì

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/2/n1_human`.

<!-- NGUON_JSON: ["/b2/projects/2/n1_human"] -->
~~~~text
Trưởng bộ phận chọn, sửa, thêm câu; mỗi người phỏng vấn tự chấm phiếu đánh giá của mình.
~~~~

<a id="nguon-325"></a>
## AI làm gì

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/2/n1_ai`.

<!-- NGUON_JSON: ["/b2/projects/2/n1_ai"] -->
~~~~text
gợi ý câu hỏi phỏng vấn theo tiêu chí và điểm cần xác minh
~~~~

<a id="nguon-326"></a>
## Hệ thống làm gì

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/2/n1_system`.

<!-- NGUON_JSON: ["/b2/projects/2/n1_system"] -->
~~~~text
Lưu bộ câu hỏi đã chọn kèm phiếu đánh giá riêng của từng người; kiểm thứ–ngày lịch phỏng vấn bằng hàm lịch; nhắc lịch cho ứng viên và người phỏng vấn theo mẫu tin cố định.
~~~~

<a id="nguon-327"></a>
## Người xác nhận

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/2/n1_approver`.

<!-- NGUON_JSON: ["/b2/projects/2/n1_approver"] -->
~~~~text
Trưởng bộ phận (người phỏng vấn chính)
~~~~

<a id="nguon-328"></a>
## Giới hạn 1

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/2/n1_prohibit_1`.

<!-- NGUON_JSON: ["/b2/projects/2/n1_prohibit_1"] -->
~~~~text
Không có câu hỏi về tuổi, hôn nhân, con cái, kế hoạch gia đình, quê quán, sức khỏe (03 mục 1, 7)
~~~~

<a id="nguon-329"></a>
## Giới hạn 2

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/2/n1_prohibit_2`.

<!-- NGUON_JSON: ["/b2/projects/2/n1_prohibit_2"] -->
~~~~text
Không câu nào ngoài tiêu chí, điểm cần xác minh và ghi chú hợp lệ trên phiếu
~~~~

<a id="nguon-330"></a>
## Giới hạn 3

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/2/n1_prohibit_3`.

<!-- NGUON_JSON: ["/b2/projects/2/n1_prohibit_3"] -->
~~~~text
Không chấm điểm, không kết luận hay dự đoán ứng viên đạt/không đạt
~~~~

<a id="nguon-331"></a>
## Trường bắt buộc (dẫn chiếu gốc)

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/2/n2_mandatory`.

<!-- NGUON_JSON: ["/b2/projects/2/n2_mandatory"] -->
~~~~text
Xem 02_QUY_TRINH_CAU_HOI_PV.md mục 2 (một chỗ, không chép lại).
~~~~

<a id="nguon-332"></a>
## Điều kiện chặn

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/2/n2_blocking`.

<!-- NGUON_JSON: ["/b2/projects/2/n2_blocking"] -->
~~~~text
Bản tóm tắt CV chưa HR kiểm, thiếu điểm cần xác minh, hoặc mâu thuẫn (thứ–ngày lịch phỏng vấn, mức tiêu chí) → dòng ⛔, C1 nêu rõ.
~~~~

<a id="nguon-333"></a>
## Phần vẫn làm khi thiếu

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/2/n2_partial`.

<!-- NGUON_JSON: ["/b2/projects/2/n2_partial"] -->
~~~~text
Vẫn soạn câu hỏi theo tiêu chí của vị trí; thời gian/người phỏng vấn trống chỉ nhắc ở C2. Không bịa thông tin ứng viên.
~~~~

<a id="nguon-334"></a>
## Lỗi đỏ

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/2/n2_red_flags`.

<!-- NGUON_JSON: ["/b2/projects/2/n2_red_flags"] -->
~~~~text
Đ1 nhầm ứng viên/vị trí, sai thời gian · Đ2 bịa thông tin ứng viên hoặc tình huống có con số tự đặt · Đ3 câu hỏi chạm 03 mục 1 (gia đình, tuổi…) hoặc đọc kết quả đối chiếu cho ứng viên nghe · Đ4 tự sửa thứ–ngày, tự đổi mức tiêu chí, chấm/kết luận ứng viên.
~~~~

<a id="nguon-335"></a>
## B1 — which

Nguồn: S1 + S2 → `worksheet-data` → `/b1/ai/2/which`.

<!-- NGUON_JSON: ["/b1/ai/2/which"] -->
~~~~text
Bước 7 — AI07 gợi ý câu hỏi phỏng vấn
~~~~

<a id="nguon-336"></a>
## B1 — read

Nguồn: S1 + S2 → `worksheet-data` → `/b1/ai/2/read`.

<!-- NGUON_JSON: ["/b1/ai/2/read"] -->
~~~~text
Phiếu chuẩn bị phỏng vấn: tiêu chí, bản tóm tắt CV đã HR kiểm, điểm cần xác minh, ghi chú của trưởng bộ phận.
~~~~

<a id="nguon-337"></a>
## B1 — make

Nguồn: S1 + S2 → `worksheet-data` → `/b1/ai/2/make`.

<!-- NGUON_JSON: ["/b1/ai/2/make"] -->
~~~~text
6–8 câu hỏi, mỗi câu gắn một tiêu chí hoặc điểm cần xác minh, kèm dấu hiệu trả lời tốt và câu hỏi tiếp; nhắc danh sách không được hỏi.
~~~~

<a id="nguon-338"></a>
## B1 — approve

Nguồn: S1 + S2 → `worksheet-data` → `/b1/ai/2/approve`.

<!-- NGUON_JSON: ["/b1/ai/2/approve"] -->
~~~~text
Trưởng bộ phận tự chọn, sửa, thêm câu trước buổi phỏng vấn.
~~~~

<a id="nguon-339"></a>
## B1 — fail

Nguồn: S1 + S2 → `worksheet-data` → `/b1/ai/2/fail`.

<!-- NGUON_JSON: ["/b1/ai/2/fail"] -->
~~~~text
Câu lệch trọng tâm, hoặc câu hỏi về gia đình/tuổi. Hậu quả thấp vì người chọn câu — lý do để ở mức Gợi ý; trưởng bộ phận phát hiện khi chọn câu, trước buổi phỏng vấn.
~~~~

- [01_KIEN_THUC_NEN.md](../KIEN_THUC_CHUNG/01_KIEN_THUC_NEN.md)

- [02_QUY_TRINH_CAU_HOI_PV.md](02_QUY_TRINH_CAU_HOI_PV.md)

- [03_SO_TAY_TUYEN_DUNG_HOI_NHAP.md](../KIEN_THUC_CHUNG/03_SO_TAY_TUYEN_DUNG_HOI_NHAP.md)

- [04_OUTPUT_MAU_CAU_HOI_PV.md](04_OUTPUT_MAU_CAU_HOI_PV.md)

Hướng dẫn: [HUONG_DAN.md](HUONG_DAN.md). Danh mục nạp: [NAP.md](NAP.md). Màn hình: [MH03.md](../../2_MAN_HINH/MH03.md). Kết quả thực chạy vẫn CHUA_KIEM; nguồn ghi 0/6 lượt mỗi tác vụ.

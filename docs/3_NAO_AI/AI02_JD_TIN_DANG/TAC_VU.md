# AI02_JD_TIN_DANG — nhiệm vụ và giới hạn

Trạng thái: **CHƯA DUYỆT**. Bản chuyển nguyên văn từ dữ liệu đã lưu; không phải SPEC hay bằng chứng đã chạy AI.

Nguồn HTML: S1: [GO4AI_Level2_HR_Buoi_1_Quy_trinh_Tuyen_dung_Hoi_nhap.html](../../../data/nguon/GO4AI_Level2_HR_Buoi_1_Quy_trinh_Tuyen_dung_Hoi_nhap.html) · S2: [GO4AI_Level2_HR_Buoi_2_AI_Project_Tuyen_dung_Hoi_nhap.html](../../../data/nguon/GO4AI_Level2_HR_Buoi_2_AI_Project_Tuyen_dung_Hoi_nhap.html) · phần JSON nhúng `worksheet-data`. Mỗi mục ghi khóa cụ thể. S1 và S2 có cùng dữ liệu; chỉ lưu một bản chuẩn.

<a id="nguon-203"></a>
## id

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/0/id`.

<!-- NGUON_JSON: ["/b2/projects/0/id"] -->
~~~~text
AI02_JD_TIN_DANG
~~~~

<a id="nguon-204"></a>
## name

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/0/name`.

<!-- NGUON_JSON: ["/b2/projects/0/name"] -->
~~~~text
AI02_JD_TIN_DANG · 02 · Soạn nháp
~~~~

<a id="nguon-205"></a>
## Lúc chạy và mục đích

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/0/n1_flow`.

<!-- NGUON_JSON: ["/b2/projects/0/n1_flow"] -->
~~~~text
Khi nhận phiếu yêu cầu tuyển đã được Giám đốc duyệt, AI soạn JD nội bộ, tin đăng và tiêu chí sàng lọc, để Trưởng bộ phận đọc và HR chốt trước khi tự đăng.
~~~~

<a id="nguon-206"></a>
## Bước

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/0/n1_step`.

<!-- NGUON_JSON: ["/b2/projects/0/n1_step"] -->
~~~~text
Bước 02
~~~~

<a id="nguon-207"></a>
## Mã màn hình

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/0/n1_screen`.

<!-- NGUON_JSON: ["/b2/projects/0/n1_screen"] -->
~~~~text
MH01
~~~~

<a id="nguon-208"></a>
## Người làm gì

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/0/n1_human`.

<!-- NGUON_JSON: ["/b2/projects/0/n1_human"] -->
~~~~text
Trưởng bộ phận đọc đúng việc và tiêu chí; HR kiểm lương, quyền lợi, câu chữ rồi tự đăng lên kênh đang dùng.
~~~~

<a id="nguon-209"></a>
## AI làm gì

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/0/n1_ai`.

<!-- NGUON_JSON: ["/b2/projects/0/n1_ai"] -->
~~~~text
soạn JD nội bộ, tin đăng và tiêu chí sàng lọc từ phiếu yêu cầu đã duyệt
~~~~

<a id="nguon-210"></a>
## Hệ thống làm gì

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/0/n1_system`.

<!-- NGUON_JSON: ["/b2/projects/0/n1_system"] -->
~~~~text
Lưu phiếu và các phiên bản bản nháp; khóa nút "Chốt tin" khi phiếu chưa duyệt, còn ⛔ / [CẦN …], lương trên tin khác phiếu, hoặc tin chứa từ khóa tiêu chí cấm (tuổi, giới tính, hôn nhân…). Lưu Phần C làm tiêu chí của vị trí.
~~~~

<a id="nguon-211"></a>
## Người xác nhận

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/0/n1_approver`.

<!-- NGUON_JSON: ["/b2/projects/0/n1_approver"] -->
~~~~text
HR (Chuyên viên tuyển dụng) chốt tin
~~~~

<a id="nguon-212"></a>
## Giới hạn 1

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/0/n1_prohibit_1`.

<!-- NGUON_JSON: ["/b2/projects/0/n1_prohibit_1"] -->
~~~~text
Tin đăng không có tiêu chí tuổi, giới tính, hôn nhân, ngoại hình, quê quán (03 mục 1)
~~~~

<a id="nguon-213"></a>
## Giới hạn 2

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/0/n1_prohibit_2`.

<!-- NGUON_JSON: ["/b2/projects/0/n1_prohibit_2"] -->
~~~~text
Tin đăng không có lương khác phiếu và không có thưởng, tháng 13, phụ cấp (03 mục 3–4)
~~~~

<a id="nguon-214"></a>
## Giới hạn 3

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/0/n1_prohibit_3`.

<!-- NGUON_JSON: ["/b2/projects/0/n1_prohibit_3"] -->
~~~~text
Tin đăng không có ghi chú nội bộ: lý do tuyển thay, lương đơn vị khác (03 mục 14)
~~~~

<a id="nguon-215"></a>
## Trường bắt buộc (dẫn chiếu gốc)

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/0/n2_mandatory`.

<!-- NGUON_JSON: ["/b2/projects/0/n2_mandatory"] -->
~~~~text
Xem 02_QUY_TRINH_JD_TIN_DANG.md mục 2 (một chỗ, không chép lại).
~~~~

<a id="nguon-216"></a>
## Điều kiện chặn

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/0/n2_blocking`.

<!-- NGUON_JSON: ["/b2/projects/0/n2_blocking"] -->
~~~~text
Phiếu chưa duyệt, thiếu trường bắt buộc, hoặc có mâu thuẫn (cấp bậc, thử việc không có ngoại lệ, tiêu chí cấm trong trường Tiêu chí) → dòng ⛔, nêu ở D1; HR không chốt tin.
~~~~

<a id="nguon-217"></a>
## Phần vẫn làm khi thiếu

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/0/n2_partial`.

<!-- NGUON_JSON: ["/b2/projects/0/n2_partial"] -->
~~~~text
Vẫn soạn JD, tin, tiêu chí phần có căn cứ; thiếu ghi [CẦN HR ĐIỀN: …], mâu thuẫn ghi [CẦN HR XÁC NHẬN: …]. Không thay lương thiếu bằng "Thỏa thuận".
~~~~

<a id="nguon-218"></a>
## Lỗi đỏ

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/0/n2_red_flags`.

<!-- NGUON_JSON: ["/b2/projects/0/n2_red_flags"] -->
~~~~text
Đ1 sai khung lương, vị trí, nơi làm, số lượng · Đ2 thêm quyền lợi CHƯA CÓ (thưởng, tháng 13, phụ cấp) hoặc yêu cầu không có trên phiếu · Đ3 đưa ghi chú nội bộ, lương đơn vị khác hoặc tiêu chí tuổi/giới tính lên tin · Đ4 đoán lương, tự chọn thử việc/cấp bậc, thiếu dòng ⛔.
~~~~

<a id="nguon-219"></a>
## B1 — which

Nguồn: S1 + S2 → `worksheet-data` → `/b1/ai/0/which`.

<!-- NGUON_JSON: ["/b1/ai/0/which"] -->
~~~~text
Bước 2 — AI02 soạn JD, tin đăng, tiêu chí sàng lọc
~~~~

<a id="nguon-220"></a>
## B1 — read

Nguồn: S1 + S2 → `worksheet-data` → `/b1/ai/0/read`.

<!-- NGUON_JSON: ["/b1/ai/0/read"] -->
~~~~text
Phiếu yêu cầu tuyển đã Giám đốc duyệt + Sổ tay (lương, quyền lợi được phép ghi, tiêu chí cấm). Không đọc gì khác.
~~~~

<a id="nguon-221"></a>
## B1 — make

Nguồn: S1 + S2 → `worksheet-data` → `/b1/ai/0/make`.

<!-- NGUON_JSON: ["/b1/ai/0/make"] -->
~~~~text
JD nội bộ, tin đăng ≤250 chữ, tiêu chí P/N viết thành điều kiểm được bằng CV; chỗ thiếu ghi [CẦN HR ĐIỀN], mâu thuẫn ghi [CẦN HR XÁC NHẬN].
~~~~

<a id="nguon-222"></a>
## B1 — approve

Nguồn: S1 + S2 → `worksheet-data` → `/b1/ai/0/approve`.

<!-- NGUON_JSON: ["/b1/ai/0/approve"] -->
~~~~text
Trưởng bộ phận đọc đúng việc và tiêu chí; HR kiểm khung lương, quyền lợi, câu chữ rồi tự đăng.
~~~~

<a id="nguon-223"></a>
## B1 — fail

Nguồn: S1 + S2 → `worksheet-data` → `/b1/ai/0/fail`.

<!-- NGUON_JSON: ["/b1/ai/0/fail"] -->
~~~~text
Sai lương, hứa thưởng/phụ cấp chưa có, hoặc tiêu chí tuổi/giới tính lọt lên tin → cam kết sai ra ngoài. HR phát hiện ở MH01 trước khi đăng; code chặn khung lương khác phiếu và từ khóa tiêu chí cấm.
~~~~

- [01_KIEN_THUC_NEN.md](../KIEN_THUC_CHUNG/01_KIEN_THUC_NEN.md)

- [02_QUY_TRINH_JD_TIN_DANG.md](02_QUY_TRINH_JD_TIN_DANG.md)

- [03_SO_TAY_TUYEN_DUNG_HOI_NHAP.md](../KIEN_THUC_CHUNG/03_SO_TAY_TUYEN_DUNG_HOI_NHAP.md)

- [04_OUTPUT_MAU_JD_TIN_DANG.md](04_OUTPUT_MAU_JD_TIN_DANG.md)

Hướng dẫn: [HUONG_DAN.md](HUONG_DAN.md). Danh mục nạp: [NAP.md](NAP.md). Màn hình: [MH01.md](../../2_MAN_HINH/MH01.md). Kết quả thực chạy vẫn CHUA_KIEM; nguồn ghi 0/6 lượt mỗi tác vụ.

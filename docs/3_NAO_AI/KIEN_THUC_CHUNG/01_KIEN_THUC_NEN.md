# 01_KIEN_THUC_NEN — bản chuẩn dùng chung

Trạng thái: **CHƯA DUYỆT**. Bản chuyển nguyên văn từ dữ liệu đã lưu; không phải SPEC hay bằng chứng đã chạy AI.

Nguồn HTML: S1: [GO4AI_Level2_HR_Buoi_1_Quy_trinh_Tuyen_dung_Hoi_nhap.html](../../../data/nguon/GO4AI_Level2_HR_Buoi_1_Quy_trinh_Tuyen_dung_Hoi_nhap.html) · S2: [GO4AI_Level2_HR_Buoi_2_AI_Project_Tuyen_dung_Hoi_nhap.html](../../../data/nguon/GO4AI_Level2_HR_Buoi_2_AI_Project_Tuyen_dung_Hoi_nhap.html) · phần JSON nhúng `worksheet-data`. Mỗi mục ghi khóa cụ thể. S1 và S2 có cùng dữ liệu; chỉ lưu một bản chuẩn.

<a id="nguon-193"></a>
## id

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/0/n3_files/0/id`, `/b2/projects/1/n3_files/0/id`, `/b2/projects/2/n3_files/0/id`, `/b2/projects/3/n3_files/0/id`, `/b2/projects/4/n3_files/0/id`.

<!-- NGUON_JSON: ["/b2/projects/0/n3_files/0/id", "/b2/projects/1/n3_files/0/id", "/b2/projects/2/n3_files/0/id", "/b2/projects/3/n3_files/0/id", "/b2/projects/4/n3_files/0/id"] -->
~~~~text
f1
~~~~

<a id="nguon-194"></a>
## name

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/0/n3_files/0/name`, `/b2/projects/1/n3_files/0/name`, `/b2/projects/2/n3_files/0/name`, `/b2/projects/3/n3_files/0/name`, `/b2/projects/4/n3_files/0/name`.

<!-- NGUON_JSON: ["/b2/projects/0/n3_files/0/name", "/b2/projects/1/n3_files/0/name", "/b2/projects/2/n3_files/0/name", "/b2/projects/3/n3_files/0/name", "/b2/projects/4/n3_files/0/name"] -->
~~~~text
01_KIEN_THUC_NEN.md
~~~~

<a id="nguon-195"></a>
## role

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/0/n3_files/0/role`, `/b2/projects/1/n3_files/0/role`, `/b2/projects/2/n3_files/0/role`, `/b2/projects/3/n3_files/0/role`, `/b2/projects/4/n3_files/0/role`.

<!-- NGUON_JSON: ["/b2/projects/0/n3_files/0/role", "/b2/projects/1/n3_files/0/role", "/b2/projects/2/n3_files/0/role", "/b2/projects/3/n3_files/0/role", "/b2/projects/4/n3_files/0/role"] -->
~~~~text
company
~~~~

<a id="nguon-196"></a>
## desc

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/0/n3_files/0/desc`, `/b2/projects/1/n3_files/0/desc`, `/b2/projects/2/n3_files/0/desc`, `/b2/projects/3/n3_files/0/desc`, `/b2/projects/4/n3_files/0/desc`.

<!-- NGUON_JSON: ["/b2/projects/0/n3_files/0/desc", "/b2/projects/1/n3_files/0/desc", "/b2/projects/2/n3_files/0/desc", "/b2/projects/3/n3_files/0/desc", "/b2/projects/4/n3_files/0/desc"] -->
~~~~text
Dùng chung 5 Project: công ty, nơi làm việc, người phụ trách, vai, kênh, mã, thuật ngữ, lịch tra cứu.
~~~~

<a id="nguon-197"></a>
## content

Nguồn: S1 + S2 → `worksheet-data` → `/b2/projects/0/n3_files/0/content`, `/b2/projects/1/n3_files/0/content`, `/b2/projects/2/n3_files/0/content`, `/b2/projects/3/n3_files/0/content`, `/b2/projects/4/n3_files/0/content`.

<!-- NGUON_JSON: ["/b2/projects/0/n3_files/0/content", "/b2/projects/1/n3_files/0/content", "/b2/projects/2/n3_files/0/content", "/b2/projects/3/n3_files/0/content", "/b2/projects/4/n3_files/0/content"] -->
~~~~text
# 01_KIEN_THUC_NEN — Kiến thức nền · Phiên bản 1.0
Hiệu lực từ: 01/09/2026 · Người chốt: Giám đốc Nhân sự · DỮ LIỆU GIẢ LẬP dùng cho bài tập
> Nạp vào **cả 5 Project**. Chỉ chứa: công ty, nơi làm việc, người phụ trách, vai, kênh, mã hồ sơ, thuật ngữ, lịch. Không chứa con số chính sách (ở 03) hay dữ kiện của một hồ sơ (ở đầu vào).
> Áp dụng cho công ty khác: chỉ thay nội dung file này và file 03. Cấu trúc Hướng dẫn, 02, 04 giữ nguyên.

## 1. Công ty
Công ty Demo HR1 — kinh doanh vật liệu xây dựng cho nhà thầu và chủ đầu tư dự án. Doanh nghiệp giả lập, không đại diện công ty thật; mọi ứng viên là hư cấu.

## 2. Nơi làm việc
| Nơi làm việc | Địa chỉ | Quầy lễ tân |
|---|---|---|
| Văn phòng TP.HCM | Tầng 3, Tòa nhà Mẫu, số 00 Đường Demo, Phường Mẫu, TP.HCM | Tầng 3 |
| Kho Tân Mẫu | Lô K1, Khu công nghiệp Mẫu, Phường Tân Mẫu, TP.HCM | Nhà điều hành, tầng trệt |

## 3. Phòng ban và người phụ trách
| Phòng | Người phụ trách |
|---|---|
| Ban Giám đốc | Giám đốc |
| Nhân sự | Hồ Thị Mai — Giám đốc Nhân sự · Nguyễn Thu Trang — Chuyên viên tuyển dụng |
| Kinh doanh Dự án | Phạm Quốc Minh — Trưởng phòng |
| Tài chính – Kế toán | Ngô Thị Lan — Kế toán trưởng |
| Kho vận | Lý Thanh Sơn — Trưởng kho |
| IT | Bộ phận hỗ trợ |
| Hành chính | Bộ phận hỗ trợ |

## 4. Vai trong tuyển dụng và hội nhập
| Vai | Làm gì |
|---|---|
| Trưởng bộ phận | Lập phiếu yêu cầu tuyển, chốt tiêu chí, phỏng vấn, đề xuất người nhận việc; thường là quản lý trực tiếp |
| Giám đốc | Duyệt phiếu yêu cầu tuyển (khung lương) và phiếu chốt nhận việc |
| HR (Phòng Nhân sự) | Đăng tin, liên hệ ứng viên, kiểm bản nháp của AI, gửi thư, theo dõi trạng thái |
| Người phỏng vấn | Phỏng vấn và tự ghi phiếu đánh giá của mình |
| Người kèm cặp | Do quản lý trực tiếp chọn; kèm người mới trong 30 ngày đầu |
| IT, Hành chính | Làm việc chuẩn bị trước ngày đầu |

AI chỉ đọc, soạn nháp, gợi ý. **AI không đăng tin, không gửi thư hay tin nhắn, không chọn hoặc loại ứng viên, không duyệt, không đổi trạng thái hồ sơ.**

## 5. Kênh và liên hệ
- Đăng tin: TopCV, trang tuyển dụng trên website công ty, nhóm Facebook/Zalo tuyển dụng, giới thiệu nội bộ.
- Nhận CV: link nộp hồ sơ trên website (hệ thống cấp mã). CV nhận qua Zalo hoặc email được HR nhập vào cùng link.
- Liên hệ ứng viên: email Phòng Nhân sự tuyendung@demo-hr1.local · điện thoại 028 0000 0000. Hẹn lịch, nhắc lịch qua điện thoại/Zalo.

## 6. Mã hồ sơ
- Phiếu yêu cầu tuyển: YC-YYYY-NNN
- Ứng viên: UV-YYMM-NNN
- Người nhận việc: NV-YYYY-NNN

## 7. Thuật ngữ
- **Phiếu yêu cầu tuyển:** trưởng bộ phận lập khi cần người; Giám đốc duyệt khung lương.
- **JD:** mô tả công việc nội bộ. **Tin đăng:** phần đưa ra ngoài để thu hút ứng viên.
- **Tiêu chí phải có / nên có:** điều kiện kiểm được bằng CV hoặc phỏng vấn; mã P1, P2… (phải có) và N1, N2… (nên có).
- **Phiếu sàng lọc:** CV của một ứng viên kèm tiêu chí đã chốt của vị trí (hệ thống gắn).
- **Phiếu chuẩn bị phỏng vấn:** tiêu chí, bản tóm tắt CV đã HR kiểm, điểm cần xác minh, lịch phỏng vấn.
- **Phiếu chốt nhận việc:** trưởng bộ phận lập sau khi chọn được người; Giám đốc duyệt.
- **Phiếu hội nhập:** thông tin người mới, người kèm cặp, mốc do hệ thống tính, chỉ tiêu 30 ngày.
- **Ngày làm việc:** Thứ Hai đến Thứ Sáu, trừ ngày nghỉ lễ ở mục 8. Thứ Bảy, Chủ nhật không tính.

## 8. Lịch tra cứu (14/09/2026 – 31/01/2027)
Dùng để biết thứ của một ngày và đếm ngày làm việc. **Không tự nhẩm.** Ngày nghỉ lễ trong khoảng này: Thứ Sáu, 01/01/2027 (Tết Dương lịch).

| Tuần | Thứ Hai | Thứ Ba | Thứ Tư | Thứ Năm | Thứ Sáu | Thứ Bảy | Chủ nhật |
|---|---|---|---|---|---|---|---|
| 1 | 14/09/2026 | 15/09/2026 | 16/09/2026 | 17/09/2026 | 18/09/2026 | 19/09/2026 | 20/09/2026 |
| 2 | 21/09/2026 | 22/09/2026 | 23/09/2026 | 24/09/2026 | 25/09/2026 | 26/09/2026 | 27/09/2026 |
| 3 | 28/09/2026 | 29/09/2026 | 30/09/2026 | 01/10/2026 | 02/10/2026 | 03/10/2026 | 04/10/2026 |
| 4 | 05/10/2026 | 06/10/2026 | 07/10/2026 | 08/10/2026 | 09/10/2026 | 10/10/2026 | 11/10/2026 |
| 5 | 12/10/2026 | 13/10/2026 | 14/10/2026 | 15/10/2026 | 16/10/2026 | 17/10/2026 | 18/10/2026 |
| 6 | 19/10/2026 | 20/10/2026 | 21/10/2026 | 22/10/2026 | 23/10/2026 | 24/10/2026 | 25/10/2026 |
| 7 | 26/10/2026 | 27/10/2026 | 28/10/2026 | 29/10/2026 | 30/10/2026 | 31/10/2026 | 01/11/2026 |
| 8 | 02/11/2026 | 03/11/2026 | 04/11/2026 | 05/11/2026 | 06/11/2026 | 07/11/2026 | 08/11/2026 |
| 9 | 09/11/2026 | 10/11/2026 | 11/11/2026 | 12/11/2026 | 13/11/2026 | 14/11/2026 | 15/11/2026 |
| 10 | 16/11/2026 | 17/11/2026 | 18/11/2026 | 19/11/2026 | 20/11/2026 | 21/11/2026 | 22/11/2026 |
| 11 | 23/11/2026 | 24/11/2026 | 25/11/2026 | 26/11/2026 | 27/11/2026 | 28/11/2026 | 29/11/2026 |
| 12 | 30/11/2026 | 01/12/2026 | 02/12/2026 | 03/12/2026 | 04/12/2026 | 05/12/2026 | 06/12/2026 |
| 13 | 07/12/2026 | 08/12/2026 | 09/12/2026 | 10/12/2026 | 11/12/2026 | 12/12/2026 | 13/12/2026 |
| 14 | 14/12/2026 | 15/12/2026 | 16/12/2026 | 17/12/2026 | 18/12/2026 | 19/12/2026 | 20/12/2026 |
| 15 | 21/12/2026 | 22/12/2026 | 23/12/2026 | 24/12/2026 | 25/12/2026 | 26/12/2026 | 27/12/2026 |
| 16 | 28/12/2026 | 29/12/2026 | 30/12/2026 | 31/12/2026 | 01/01/2027 (nghỉ lễ) | 02/01/2027 | 03/01/2027 |
| 17 | 04/01/2027 | 05/01/2027 | 06/01/2027 | 07/01/2027 | 08/01/2027 | 09/01/2027 | 10/01/2027 |
| 18 | 11/01/2027 | 12/01/2027 | 13/01/2027 | 14/01/2027 | 15/01/2027 | 16/01/2027 | 17/01/2027 |
| 19 | 18/01/2027 | 19/01/2027 | 20/01/2027 | 21/01/2027 | 22/01/2027 | 23/01/2027 | 24/01/2027 |
| 20 | 25/01/2027 | 26/01/2027 | 27/01/2027 | 28/01/2027 | 29/01/2027 | 30/01/2027 | 31/01/2027 |

~~~~

# AI05_SANG_LOC_CV — danh mục nạp dự kiến, CHUA_XAC_NHAN

Trạng thái: **CHƯA DUYỆT**. Bản chuyển nguyên văn từ dữ liệu đã lưu; không phải SPEC hay bằng chứng đã chạy AI.

Nguồn HTML: S1: [GO4AI_Level2_HR_Buoi_1_Quy_trinh_Tuyen_dung_Hoi_nhap.html](../../../data/nguon/GO4AI_Level2_HR_Buoi_1_Quy_trinh_Tuyen_dung_Hoi_nhap.html) · S2: [GO4AI_Level2_HR_Buoi_2_AI_Project_Tuyen_dung_Hoi_nhap.html](../../../data/nguon/GO4AI_Level2_HR_Buoi_2_AI_Project_Tuyen_dung_Hoi_nhap.html) · phần JSON nhúng `worksheet-data`. Mỗi mục ghi khóa cụ thể. S1 và S2 có cùng dữ liệu; chỉ lưu một bản chuẩn.

Nguồn tổ chức: S1 + S2 → `worksheet-data` → `b2.projects[1].n3_instructions` mục 2, `n3_files`, `n6_fields`; giới hạn từ AGENTS.md. Danh mục này được áp dụng cho phạm vi bản thử người học đã giao: chọn tác vụ có nguồn, dùng dữ liệu giả và người học tự bấm chạy. HD01 chọn Gemini `gemini-3.5-flash-lite`; không coi đây là duyệt toàn bộ tài liệu nghiệp vụ hoặc cho phép dữ liệu thật. Chưa có lượt API thật trong kiểm chuẩn bị.

| Tài liệu dự kiến dùng | Mục theo hướng dẫn gốc |
|---|---|
| [HUONG_DAN.md](HUONG_DAN.md) | Hướng dẫn tác vụ; nội dung trường n3_instructions |
| [01_KIEN_THUC_NEN.md](../KIEN_THUC_CHUNG/01_KIEN_THUC_NEN.md) | §6,7,8 |
| [02_QUY_TRINH_SANG_LOC_CV.md](02_QUY_TRINH_SANG_LOC_CV.md) | §1–3: bước, trường bắt buộc, điều kiện đi tiếp |
| [03_SO_TAY_TUYEN_DUNG_HOI_NHAP.md](../KIEN_THUC_CHUNG/03_SO_TAY_TUYEN_DUNG_HOI_NHAP.md) | §1,6,15 |
| [04_OUTPUT_MAU_SANG_LOC_CV.md](04_OUTPUT_MAU_SANG_LOC_CV.md) | Khung, quy ước và ví dụ khác hồ sơ; không lấy dữ kiện ví dụ |

## Dữ liệu động và giới hạn gửi ngoài

Dữ liệu động dự kiến: xem [MH02.md](../../2_MAN_HINH/MH02.md) mục “Đầu vào và đầu ra”; chỉ phần Vào, không nạp phần Ra/đáp án. Nguồn phiếu và trường chưa rõ được ghi CHUA_XAC_NHAN tại [HOI_DAP.md](../../HOI_DAP.md). Hiện tại chỉ có dữ liệu giả lập trong HTML, không có quyền gửi dữ liệu thật.

Các phần nội bộ, thông tin phải bỏ qua và phần không được đưa vào kết quả được giữ nguyên trong [HUONG_DAN.md](HUONG_DAN.md) mục 4 và [03_SO_TAY_TUYEN_DUNG_HOI_NHAP.md](../KIEN_THUC_CHUNG/03_SO_TAY_TUYEN_DUNG_HOI_NHAP.md) mục 1,14. “Không xuất ra kết quả” chưa đồng nghĩa với “đã che trước khi gửi provider”; với dữ liệu thật, cơ chế che, danh sách trường được gửi, lưu/xóa dữ liệu bên ngoài đều CHUA_XAC_NHAN. Bản thử chỉ nhận phiếu giả do người học nhập và xác nhận; gửi đúng phần phiếu đó và các nguồn ở bảng trên tới Google Gemini khi bấm chạy. Máy chủ không lưu phiếu/kết quả, không gửi khóa trong prompt và không tự gọi API lúc mở trang.

## Loại trừ

Không nạp `tests/` hoặc nguyên file I1/I2/I3/O1, kỳ vọng và phiếu chấm. Riêng dữ liệu động kiểm B2: người học có thể tự chép phần PHIẾU GIẢ I1/I2/I3 vào ô nhập, không chép đáp án O1 hoặc kỳ vọng; app không đọc tests. Không nạp không nạp hỏi–đáp, nhật ký, SPEC, phê duyệt, bản trích JSON đầy đủ, data/nguon, toàn bộ docs, .env/khóa/token. Chỉ trích phần nội dung gốc của tài liệu kiến thức cần thiết; bỏ siêu dữ liệu đối chiếu chuyển đổi. Danh mục và TAC_VU là hồ sơ mô tả, không là nguồn nạp thêm.

## Phạm vi lời giao và model

Lệnh giao người học: “Chọn một tác vụ trong docs/3_NAO_AI có nguồn, ít phụ thuộc, dễ kiểm”; “Dữ liệu giả”; “tôi bấm chạy và thấy phản hồi API thật, rồi đối chiếu nội dung với kỳ vọng B2”. Model nguyên văn HD01: “gemini-3.5-flash-lite”. Chỉ thực hiện phần nạp cho bản thử AI05; không ghi người học đã nghiệm thu nghiệp vụ/SPEC.


## Phạm vi app Phase 1 — HD15/HD16, 24/10/2026

Danh mục tài liệu/mục giữ như bảng trên. Phiếu HR nhập gồm mã UV/YC, họ tên, vị trí, ngày/nguồn CV, tiêu chí đã chốt và CV văn bản được gửi nguyên nội dung tới Gemini khi HR xác nhận mỗi lượt, không ẩn danh. Không quét thư mục hoặc tự nhập dữ liệu. Chỉ lấy khối nội dung nguồn, không nạp metadata/hỏi đáp/duyệt/SPEC/tests. Ghi chú phạm vi giả của bản thử vẫn áp dụng riêng thu_nghiem; app P1 theo HD16. Khóa chỉ máy chủ; provider/model Gemini đang có, giới hạn cổng 60 giây/4096 token, không retry.


## Hiện hành khi triển khai toàn bộ — HD17 (26/10/2026)

Bảng nguồn/mục giữ nguyên. Cổng src/app/nguon_ai.mjs chỉ đọc những khối nội dung đã liệt kê và khối HUONG_DAN_AP_DUNG nếu có; không đọc metadata, hỏi đáp, SPEC, phê duyệt, đáp án hoặc tests.

Quyền dùng thật không ẩn danh theo HD16 áp dụng khi người dùng có đúng vai chủ động xem trước phiếu và đồng ý gửi tác vụ trong toàn bộ app theo HD17. Dữ liệu động được máy chủ xây từ phiếu bước tương ứng; AI07 dùng bản CV HR đã kiểm, AI10 chỉ dùng điều kiện nhận việc đã duyệt/mốc chuẩn, AI13 không nhận lương hoặc lịch sử thương lượng. Không quét hồ sơ ngoài phiếu.

API trả JSON theo schema src/app/ai_du_lieu.mjs: trường text giữ đầy đủ khung 04, các trường cấu trúc trích phần tương ứng để code kiểm/lưu, không tạo thêm kiến thức nghiệp vụ. Giới hạn 8192 token, 60 giây, một lượt đồng thời, không retry/đổi model. Xem trước hiển thị phiếu/nguồn gửi; cấu hình/key chỉ máy chủ. Các câu “chưa quyền dùng thật” ở phần mô tả lúc chuyển là lịch sử trước HD16/17.

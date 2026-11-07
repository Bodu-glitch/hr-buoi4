# DU AN CUA TOI B4 HR

1. Giải nén ZIP vào một thư mục riêng. Máy cần Node.js 22 trở lên.
2. Nhấp BUOI_4_TRAI_NGHIEM.bat, mở http://127.0.0.1:3096/.
3. Chọn tài khoản mẫu trên màn hình login rồi bấm Đăng nhập.

Tài khoản: mai (GĐNS), hr01 (HR), minh/nam (TBP), quanly (QL), phongvan (PV), it01 (IT), hanhchinh (HC), ai01 (quản lý AI), admin (quản trị).
Mật khẩu mẫu chung: MauB4@2026!123

Kho mới tự tạo 3 yêu cầu/10 hồ sơ hư cấu. Không có kết quả AI nạp sẵn.
AI thật: tự sao chép .env.example thành .env và điền khóa trên máy chủ, rồi chạy lại. Không nhập khóa vào giao diện/chat. Không có khóa trong ZIP.

Dừng: BUOI_4_DUNG.bat hoặc Ctrl+C. Sao lưu: dừng app rồi BUOI_4_SAO_LUU.bat.
Phục hồi vào kho mới: node src/cong_cu/b4_sao_luu.mjs --phuc-hoi "đường_dẫn_bản_sao"
Công cụ in lệnh chạy kho phục hồi; không ghi đè kho cũ. Bản sao cùng ổ không thay sao lưu chống mất máy.
Quay lại: giữ thư mục cũ, giải nén ZIP vào thư mục mới; dữ liệu phát sinh không nằm trong ZIP.

Chỉ chạy local 127.0.0.1. Đây là dữ liệu mẫu và mật khẩu dùng thử. Chưa kiểm AI provider thật/online/nghiệm thu người dùng. Không tự gửi email hoặc quyết tuyển.
Bản nguồn: 4f95145. Bộ tự kiểm nguồn: 72/72 đạt; ZIP được kiểm riêng trước bàn giao.

# Project-PitGo 🏎️

**Project-PitGo** là một nền tảng website (hoặc ứng dụng) được thiết kế nhằm mục đích quản lý và trưng bày thông tin về các dòng siêu xe (supercars). Dự án tập trung vào trải nghiệm người dùng mượt mà, giao diện hiện đại và hệ thống quản trị dữ liệu mạnh mẽ.

## 🚀 Tính năng nổi bật

- **Trang chủ (Dashboard):** Hiển thị tổng quan về các dòng xe mới nhất, thông số kỹ thuật nổi bật.
- **Quản lý siêu xe (Supercar Management):** Cho phép xem chi tiết, tìm kiếm và lọc xe theo thương hiệu, động cơ, giá thành.
- **Bảng điều khiển Admin (Admin Panel):** Hệ thống quản trị cho phép Thêm, Sửa, Xóa (CRUD) thông tin xe và quản lý người dùng.
- **Xác thực người dùng:** Đăng ký, đăng nhập và phân quyền bảo mật (JWT).

## 🛠️ Công nghệ sử dụng

Dự án được xây dựng dựa trên các công nghệ hiện đại:

- **Frontend:** React.js, Tailwind CSS (hoặc Bootstrap), Redux Toolkit.
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB (MERN Stack).
- **Công cụ hỗ trợ:** VS Code, Git.

### 📂 Cấu trúc thư mục (Sửa lại)

```text
Project-PitGo/
├── admin_frontend/       # Mã nguồn quản trị (React)
│   └── src/
│       ├── components/   # Các thành phần giao diện tái sử dụng
│       ├── pages/        # Các trang chính (Home, Details)
│       ├── assets/       # Icons và hình ảnh
│       └── api/          # Gọi API và xử lý logic
├── server/               # Mã nguồn Backend (Node.js)
│   ├── models/           # Schema database (MongoDB)
│   ├── controllers/      # Xử lý các luồng API & logic nghiệp vụ
│   ├── middleware/       # Logic upload hình ảnh sản phẩm
│   ├── routes/           # Định tuyến API
│   └── config/           # Cấu hình logic upload dữ liệu chính
├── user_frontend/        # Mã nguồn cho người dùng (React/Node)
│   ├── components/       # Các thành phần giao diện tái sử dụng
│   └── pages/            # Trang giao diện người dùng
└── README.md

```

### ⚙️ Cài đặt và Chạy dự án

Để chạy dự án này trên máy cục bộ, bạn hãy thực hiện theo các lệnh riêng biệt sau:

**1. Clone dự án:**

```bash
git clone https://github.com/LCT-12/Project-PitGo.git
cd Project-PitGo

```

**2. Cài đặt và chạy Backend:**

```bash
cd server
npm install
npm start

```

**3. Cài đặt và chạy Frontend (Admin):**

```bash
cd admin_frontend
npm install
npm start

```


### 📈 Kế hoạch phát triển (Roadmap)
[x] Thiết kế Database Schema cho siêu xe.

[x] Xây dựng giao diện Admin Panel cơ bản.

[ ] Tích hợp thanh toán hoặc đặt lịch xem xe.

[ ] Triển khai lên Heroku/Vercel.

### 🤝 Đóng góp
Nếu bạn muốn đóng góp cho dự án, vui lòng tạo Pull Request hoặc mở Issue để thảo luận.

Author: LCT-12

University: Van Lang University

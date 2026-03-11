# Backend - Node.js + Express API

API Server cho Project Mini Demo với MySQL database.

## Cài đặt

```bash
npm install
```

## Cấu hình

Tạo file `.env` và cập nhật thông tin database:
```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=projectmini_db
DB_PORT=3306
```

## Chạy Database Schema

```bash
# Sử dụng SSMS hoặc:
sqlcmd -S localhost -U sa -P your_password -i database/schema.sql
```

## Chạy Server

```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

### Users
- GET `/api/users` - Lấy danh sách users
- GET `/api/users/:id` - Lấy user theo ID
- POST `/api/users` - Tạo user mới
- PUT `/api/users/:id` - Cập nhật user
- DELETE `/api/users/:id` - Xóa user

### Products
- GET `/api/products` - Lấy danh sách products
- GET `/api/products/:id` - Lấy product theo ID
- POST `/api/products` - Tạo product mới
- PUT `/api/products/:id` - Cập nhật product
- DELETE `/api/products/:id` - Xóa product

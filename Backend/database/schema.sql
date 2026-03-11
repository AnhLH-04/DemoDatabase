-- Tạo database
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'projectmini_db')
BEGIN
    CREATE DATABASE projectmini_db;
END
GO

USE projectmini_db;
GO

-- Bảng users
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='users' and xtype='U')
BEGIN
    CREATE TABLE users (
        id INT IDENTITY(1,1) PRIMARY KEY,
        name NVARCHAR(100) NOT NULL,
        email NVARCHAR(100) UNIQUE NOT NULL,
        phone NVARCHAR(20),
        created_at DATETIME2 DEFAULT GETDATE(),
        updated_at DATETIME2 DEFAULT GETDATE()
    );
END
GO

-- Bảng products
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='products' and xtype='U')
BEGIN
    CREATE TABLE products (
        id INT IDENTITY(1,1) PRIMARY KEY,
        name NVARCHAR(200) NOT NULL,
        description NVARCHAR(MAX),
        price DECIMAL(10, 2) NOT NULL,
        stock INT DEFAULT 0,
        created_at DATETIME2 DEFAULT GETDATE(),
        updated_at DATETIME2 DEFAULT GETDATE()
    );
END
GO

-- Trigger để tự động cập nhật updated_at cho users
IF EXISTS (SELECT * FROM sys.triggers WHERE name = 'trg_users_updated_at')
    DROP TRIGGER trg_users_updated_at;
GO

CREATE TRIGGER trg_users_updated_at
ON users
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE users
    SET updated_at = GETDATE()
    FROM users u
    INNER JOIN inserted i ON u.id = i.id;
END
GO

-- Trigger để tự động cập nhật updated_at cho products
IF EXISTS (SELECT * FROM sys.triggers WHERE name = 'trg_products_updated_at')
    DROP TRIGGER trg_products_updated_at;
GO

CREATE TRIGGER trg_products_updated_at
ON products
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE products
    SET updated_at = GETDATE()
    FROM products p
    INNER JOIN inserted i ON p.id = i.id;
END
GO

-- Thêm dữ liệu mẫu cho users (nếu chưa có)
IF NOT EXISTS (SELECT * FROM users)
BEGIN
    INSERT INTO users (name, email, phone) VALUES
    (N'Nguyễn Văn A', 'nguyenvana@email.com', '0901234567'),
    (N'Trần Thị B', 'tranthib@email.com', '0912345678'),
    (N'Lê Văn C', 'levanc@email.com', '0923456789');
END
GO

-- Thêm dữ liệu mẫu cho products (nếu chưa có)
IF NOT EXISTS (SELECT * FROM products)
BEGIN
    INSERT INTO products (name, description, price, stock) VALUES
    (N'Laptop Dell XPS 13', N'Laptop cao cấp, màn hình 13 inch', 25000000, 10),
    (N'iPhone 15 Pro', N'Điện thoại Apple mới nhất', 30000000, 15),
    (N'Samsung Galaxy S24', N'Flagship Android 2024', 22000000, 20),
    (N'iPad Air', N'Máy tính bảng Apple', 18000000, 12);
END
GO

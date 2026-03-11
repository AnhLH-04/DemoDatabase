const { sql, poolPromise } = require('../config/database');

// Lấy tất cả products
exports.getAllProducts = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM products');
    
    res.json({
      success: true,
      data: result.recordset
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy danh sách products',
      error: error.message
    });
  }
};

// Lấy product theo ID
exports.getProductById = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, req.params.id)
      .query('SELECT * FROM products WHERE id = @id');
    
    if (result.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy product'
      });
    }
    
    res.json({
      success: true,
      data: result.recordset[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy thông tin product',
      error: error.message
    });
  }
};

// Tạo product mới
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;
    
    const pool = await poolPromise;
    const result = await pool.request()
      .input('name', sql.NVarChar, name)
      .input('description', sql.NVarChar, description)
      .input('price', sql.Decimal(10, 2), price)
      .input('stock', sql.Int, stock)
      .query('INSERT INTO products (name, description, price, stock) OUTPUT INSERTED.id VALUES (@name, @description, @price, @stock)');
    
    res.status(201).json({
      success: true,
      message: 'Tạo product thành công',
      data: {
        id: result.recordset[0].id,
        name,
        description,
        price,
        stock
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi tạo product',
      error: error.message
    });
  }
};

// Cập nhật product
exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;
    const { id } = req.params;
    
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, id)
      .input('name', sql.NVarChar, name)
      .input('description', sql.NVarChar, description)
      .input('price', sql.Decimal(10, 2), price)
      .input('stock', sql.Int, stock)
      .query('UPDATE products SET name = @name, description = @description, price = @price, stock = @stock WHERE id = @id');
    
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy product'
      });
    }
    
    res.json({
      success: true,
      message: 'Cập nhật product thành công'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi cập nhật product',
      error: error.message
    });
  }
};

// Xóa product
exports.deleteProduct = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, req.params.id)
      .query('DELETE FROM products WHERE id = @id');
    
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy product'
      });
    }
    
    res.json({
      success: true,
      message: 'Xóa product thành công'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi xóa product',
      error: error.message
    });
  }
};

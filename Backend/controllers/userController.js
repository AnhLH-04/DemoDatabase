const { sql, poolPromise } = require('../config/database');

// Lấy tất cả users
exports.getAllUsers = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM users');
    
    res.json({
      success: true,
      data: result.recordset
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy danh sách users',
      error: error.message
    });
  }
};

// Lấy user theo ID
exports.getUserById = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, req.params.id)
      .query('SELECT * FROM users WHERE id = @id');
    
    if (result.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy user'
      });
    }
    
    res.json({
      success: true,
      data: result.recordset[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy thông tin user',
      error: error.message
    });
  }
};

// Tạo user mới
exports.createUser = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    
    const pool = await poolPromise;
    const result = await pool.request()
      .input('name', sql.NVarChar, name)
      .input('email', sql.NVarChar, email)
      .input('phone', sql.NVarChar, phone)
      .query('INSERT INTO users (name, email, phone) OUTPUT INSERTED.id VALUES (@name, @email, @phone)');
    
    res.status(201).json({
      success: true,
      message: 'Tạo user thành công',
      data: {
        id: result.recordset[0].id,
        name,
        email,
        phone
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi tạo user',
      error: error.message
    });
  }
};

// Cập nhật user
exports.updateUser = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const { id } = req.params;
    
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, id)
      .input('name', sql.NVarChar, name)
      .input('email', sql.NVarChar, email)
      .input('phone', sql.NVarChar, phone)
      .query('UPDATE users SET name = @name, email = @email, phone = @phone WHERE id = @id');
    
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy user'
      });
    }
    
    res.json({
      success: true,
      message: 'Cập nhật user thành công'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi cập nhật user',
      error: error.message
    });
  }
};

// Xóa user
exports.deleteUser = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, req.params.id)
      .query('DELETE FROM users WHERE id = @id');
    
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy user'
      });
    }
    
    res.json({
      success: true,
      message: 'Xóa user thành công'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi xóa user',
      error: error.message
    });
  }
};

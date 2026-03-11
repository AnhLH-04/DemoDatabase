const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET tất cả users
router.get('/', userController.getAllUsers);

// GET user theo ID
router.get('/:id', userController.getUserById);

// POST tạo user mới
router.post('/', userController.createUser);

// PUT cập nhật user
router.put('/:id', userController.updateUser);

// DELETE xóa user
router.delete('/:id', userController.deleteUser);

module.exports = router;

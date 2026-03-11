const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// GET tất cả products
router.get('/', productController.getAllProducts);

// GET product theo ID
router.get('/:id', productController.getProductById);

// POST tạo product mới
router.post('/', productController.createProduct);

// PUT cập nhật product
router.put('/:id', productController.updateProduct);

// DELETE xóa product
router.delete('/:id', productController.deleteProduct);

module.exports = router;

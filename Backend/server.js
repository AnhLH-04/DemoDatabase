const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import routes
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

// Sử dụng routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// Route mặc định
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Project Mini API',
    endpoints: {
      users: '/api/users',
      products: '/api/products'
    }
  });
});

// Xử lý 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route không tồn tại' });
});

// Khởi động server
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});

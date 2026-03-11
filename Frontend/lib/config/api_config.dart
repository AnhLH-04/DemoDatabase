class ApiConfig {
  // Thay đổi IP này theo địa chỉ máy của bạn
  // Nếu dùng emulator Android: 10.0.2.2
  // Nếu dùng máy thật: IP máy tính (vd: 192.168.1.x)
  static const String baseUrl = 'http://10.0.2.2:3000/api';
  
  // Endpoints
  static const String usersEndpoint = '$baseUrl/users';
  static const String productsEndpoint = '$baseUrl/products';
}

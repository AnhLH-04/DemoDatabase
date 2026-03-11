import 'dart:convert';
import 'package:http/http.dart' as http;
import '../config/api_config.dart';
import '../models/user_model.dart';

class UserService {
  // Lấy tất cả users
  Future<List<User>> getAllUsers() async {
    try {
      final response = await http.get(Uri.parse(ApiConfig.usersEndpoint));
      
      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        List<User> users = (data['data'] as List)
            .map((user) => User.fromJson(user))
            .toList();
        return users;
      } else {
        throw Exception('Failed to load users');
      }
    } catch (e) {
      throw Exception('Error: $e');
    }
  }

  // Lấy user theo ID
  Future<User> getUserById(int id) async {
    try {
      final response = await http.get(
        Uri.parse('${ApiConfig.usersEndpoint}/$id')
      );
      
      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        return User.fromJson(data['data']);
      } else {
        throw Exception('Failed to load user');
      }
    } catch (e) {
      throw Exception('Error: $e');
    }
  }

  // Tạo user mới
  Future<User> createUser(User user) async {
    try {
      final response = await http.post(
        Uri.parse(ApiConfig.usersEndpoint),
        headers: {'Content-Type': 'application/json'},
        body: json.encode(user.toJson()),
      );
      
      if (response.statusCode == 201) {
        final data = json.decode(response.body);
        return User.fromJson(data['data']);
      } else {
        throw Exception('Failed to create user');
      }
    } catch (e) {
      throw Exception('Error: $e');
    }
  }

  // Cập nhật user
  Future<void> updateUser(int id, User user) async {
    try {
      final response = await http.put(
        Uri.parse('${ApiConfig.usersEndpoint}/$id'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode(user.toJson()),
      );
      
      if (response.statusCode != 200) {
        throw Exception('Failed to update user');
      }
    } catch (e) {
      throw Exception('Error: $e');
    }
  }

  // Xóa user
  Future<void> deleteUser(int id) async {
    try {
      final response = await http.delete(
        Uri.parse('${ApiConfig.usersEndpoint}/$id')
      );
      
      if (response.statusCode != 200) {
        throw Exception('Failed to delete user');
      }
    } catch (e) {
      throw Exception('Error: $e');
    }
  }
}

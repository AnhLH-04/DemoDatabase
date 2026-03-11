import 'dart:convert';
import 'package:http/http.dart' as http;
import '../config/api_config.dart';
import '../models/product_model.dart';

class ProductService {
  // Lấy tất cả products
  Future<List<Product>> getAllProducts() async {
    try {
      final response = await http.get(Uri.parse(ApiConfig.productsEndpoint));
      
      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        List<Product> products = (data['data'] as List)
            .map((product) => Product.fromJson(product))
            .toList();
        return products;
      } else {
        throw Exception('Failed to load products');
      }
    } catch (e) {
      throw Exception('Error: $e');
    }
  }

  // Lấy product theo ID
  Future<Product> getProductById(int id) async {
    try {
      final response = await http.get(
        Uri.parse('${ApiConfig.productsEndpoint}/$id')
      );
      
      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        return Product.fromJson(data['data']);
      } else {
        throw Exception('Failed to load product');
      }
    } catch (e) {
      throw Exception('Error: $e');
    }
  }

  // Tạo product mới
  Future<Product> createProduct(Product product) async {
    try {
      final response = await http.post(
        Uri.parse(ApiConfig.productsEndpoint),
        headers: {'Content-Type': 'application/json'},
        body: json.encode(product.toJson()),
      );
      
      if (response.statusCode == 201) {
        final data = json.decode(response.body);
        return Product.fromJson(data['data']);
      } else {
        throw Exception('Failed to create product');
      }
    } catch (e) {
      throw Exception('Error: $e');
    }
  }

  // Cập nhật product
  Future<void> updateProduct(int id, Product product) async {
    try {
      final response = await http.put(
        Uri.parse('${ApiConfig.productsEndpoint}/$id'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode(product.toJson()),
      );
      
      if (response.statusCode != 200) {
        throw Exception('Failed to update product');
      }
    } catch (e) {
      throw Exception('Error: $e');
    }
  }

  // Xóa product
  Future<void> deleteProduct(int id) async {
    try {
      final response = await http.delete(
        Uri.parse('${ApiConfig.productsEndpoint}/$id')
      );
      
      if (response.statusCode != 200) {
        throw Exception('Failed to delete product');
      }
    } catch (e) {
      throw Exception('Error: $e');
    }
  }
}

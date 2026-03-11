# Frontend - Flutter Mobile App

Mobile app cho Project Mini Demo.

## Cài đặt

```bash
flutter pub get
```

## Cấu hình API

Mở `lib/config/api_config.dart` và cập nhật:

**Android Emulator:**
```dart
static const String baseUrl = 'http://10.0.2.2:3000/api';
```

**iOS Simulator:**
```dart
static const String baseUrl = 'http://localhost:3000/api';
```

**Thiết bị thật:**
```dart
static const String baseUrl = 'http://YOUR_IP:3000/api';
```

## Chạy App

```bash
flutter run
```

## Tính năng

- Quản lý Users (CRUD)
- Quản lý Products (CRUD)
- State management với Provider
- API integration với Backend

## Cấu trúc

- `config/` - Cấu hình API
- `models/` - Data models
- `services/` - API services
- `providers/` - State management
- `screens/` - UI screens

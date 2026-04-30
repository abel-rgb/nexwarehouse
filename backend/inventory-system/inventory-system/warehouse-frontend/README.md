# 🏭 NexWarehouse — Smart Warehouse & Inventory Management System

A full-stack warehouse management system built with **Spring Boot** (backend) and **Angular** (frontend).

## 🚀 Features

- 🔐 JWT-based Authentication & Role-Based Access Control
- 👥 Three user roles: **Admin**, **Staff**, **Supplier**
- 📦 Real-time Inventory Management (Add, Edit, Delete items)
- 🔄 Stock Movement Tracking (IN/OUT with history)
- 🏢 Supplier Management with Indian phone validation
- 📋 Order Management with auto stock update on delivery
- 📊 Supply Chain Information dashboard
- 👤 User Management (Create/Delete users)
- 🔔 Live notifications for low stock alerts
- 🌙 Professional dark theme UI (Zoho-inspired)

## 🛠️ Tech Stack

### Backend
- Java 17
- Spring Boot 3.2.5
- Spring Security + JWT
- Spring Data JPA + Hibernate
- MySQL Database
- Maven

### Frontend
- Angular 20
- TypeScript
- CSS3 with animations

## 👤 Default Login Credentials

| Username | Password | Role |
|---|---|---|
| admin1 | 12345 | ADMIN |
| staff1 | 12345 | STAFF |
| supplier1 | 12345 | SUPPLIER |

## 📁 Project Structure
nexwarehouse/
├── backend/
│   └── inventory-system/
│       └── src/main/java/com/warehouse/inventory_system/
│           ├── config/
│           ├── controller/
│           ├── entity/
│           ├── jwt/
│           ├── repository/
│           └── service/
└── warehouse-frontend/
└── src/app/
├── login/
├── registration/
├── inventory/
├── stock/
├── orders/
├── supplier/
├── users/
└── information/
## ⚙️ Setup Instructions

### Backend
```bash
cd backend/inventory-system/inventory-system
./mvnw spring-boot:run
```

### Frontend
```bash
cd warehouse-frontend
npm install
ng serve
```

### Database
Create MySQL database:
```sql
CREATE DATABASE warehousedb;
```

## 🌐 API Endpoints

| Method | Endpoint | Role | Description |
|---|---|---|---|
| POST | /api/auth/register | Public | Register user |
| POST | /api/auth/login | Public | Login & get JWT |
| GET | /api/admin/items | ADMIN | Get all items |
| POST | /api/admin/item | ADMIN | Add item |
| PUT | /api/admin/item/{id} | ADMIN | Update item |
| DELETE | /api/admin/item/{id} | ADMIN | Delete item |
| GET | /api/admin/suppliers | ADMIN | Get suppliers |
| POST | /api/admin/supplier | ADMIN | Add supplier |
| GET | /api/admin/orders | ADMIN | Get all orders |
| POST | /api/admin/order | ADMIN | Create order |
| GET | /api/staff/items | STAFF | View items |
| POST | /api/staff/stock | STAFF | Update stock |
| GET | /api/staff/stock | STAFF | Stock history |
| GET | /api/supplier/orders | SUPPLIER | View orders |
| PUT | /api/supplier/order/update/{id} | SUPPLIER | Update order status |

## 📸 Screenshots

> Login Page, Inventory Dashboard, Stock Management, Order Management, Information Page

## 📄 License

This project is for educational purposes.
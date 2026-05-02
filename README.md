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
> <img width="1892" height="990" alt="image" src="https://github.com/user-attachments/assets/7fa9b2f8-a81c-4b42-8eb1-e191c2efe12e" />
<img width="1888" height="989" alt="image" src="https://github.com/user-attachments/assets/c893f590-df8c-4f67-be05-41593c7e189b" />
<img width="1884" height="984" alt="image" src="https://github.com/user-attachments/assets/ab64e24b-490e-42e5-b761-546bc0306cbc" />
<img width="1880" height="991" alt="image" src="https://github.com/user-attachments/assets/9b579d32-a5d9-45fa-9e7e-24c344e3a1e6" />
<img width="1889" height="993" alt="image" src="https://github.com/user-attachments/assets/297be1e0-de81-4c48-b70b-1a353c01e2a4" />
<img width="1894" height="972" alt="image" src="https://github.com/user-attachments/assets/9bef3fdd-e12f-4dc0-bef5-5730e2896220" />
<img width="1864" height="983" alt="image" src="https://github.com/user-attachments/assets/4eea610b-6351-4b9b-97b5-c9053a5f1591" />
<img width="1867" height="821" alt="image" src="https://github.com/user-attachments/assets/7c38ea5b-dc20-48fa-a9f7-f7d2338ef6da" />
<img width="594" height="503" alt="image" src="https://github.com/user-attachments/assets/e552a96a-7010-4c19-af77-d73b82b40a8f" />
<img width="390" height="430" alt="image" src="https://github.com/user-attachments/assets/691aeee7-41df-47b5-8142-983dcc438a0f" />





## 📄 License

This project is for educational purposes.

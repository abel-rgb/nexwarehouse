import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  // Auth
  register(user: any) {
    return this.http.post(`${this.apiUrl}/api/auth/register`, user);
  }

  login(user: any) {
    return this.http.post<any>(`${this.apiUrl}/api/auth/login`, user);
  }

  // Items
  getItems() {
    return this.http.get<any[]>(`${this.apiUrl}/api/admin/items`,
      { headers: this.getHeaders() });
  }

  addItem(item: any) {
    return this.http.post(`${this.apiUrl}/api/admin/item`, item,
      { headers: this.getHeaders() });
  }

  updateItem(id: number, item: any) {
    return this.http.put(`${this.apiUrl}/api/admin/item/${id}`, item,
      { headers: this.getHeaders() });
  }

  deleteItem(id: number) {
    return this.http.delete(`${this.apiUrl}/api/admin/item/${id}`,
      { headers: this.getHeaders() });
  }

  // Suppliers
  addSupplier(supplier: any) {
    return this.http.post(`${this.apiUrl}/api/admin/supplier`, supplier,
      { headers: this.getHeaders() });
  }

  // Orders
  createOrder(supplierId: number, order: any) {
    return this.http.post(`${this.apiUrl}/api/admin/order?supplierId=${supplierId}`, order,
      { headers: this.getHeaders() });
  }

  getAllOrders() {
    return this.http.get<any[]>(`${this.apiUrl}/api/supplier/orders`,
      { headers: this.getHeaders() });
  }

  updateOrderStatus(orderId: number, status: string) {
    return this.http.put(`${this.apiUrl}/api/supplier/order/update/${orderId}?status=${status}`, {},
      { headers: this.getHeaders() });
  }

  // Stock
  getStaffItems() {
    return this.http.get<any[]>(`${this.apiUrl}/api/staff/items`,
      { headers: this.getHeaders() });
  }

  updateStock(itemId: number, type: string, quantity: number) {
    return this.http.post(`${this.apiUrl}/api/staff/stock?itemId=${itemId}&type=${type}`,
      { quantity }, { headers: this.getHeaders() });
  }

  getStockMovements() {
    return this.http.get<any[]>(`${this.apiUrl}/api/staff/stock`,
      { headers: this.getHeaders() });
  }
}
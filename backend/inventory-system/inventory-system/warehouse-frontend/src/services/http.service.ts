import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class HttpService {
  private baseUrl = 'https://nexwarehouse.up.railway.app';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}`
    });
  }

  getUsers() {
    return this.http.get<any[]>(`${this.baseUrl}/api/admin/users`, { headers: this.getHeaders() });
  }

  registerUser(user: any) {
    return this.http.post(`${this.baseUrl}/api/auth/register`, user);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.baseUrl}/api/admin/user/${id}`, { headers: this.getHeaders() });
  }

  getItems() {
    return this.http.get<any[]>(`${this.baseUrl}/api/admin/items`, { headers: this.getHeaders() });
  }

  addItem(item: any) {
    return this.http.post(`${this.baseUrl}/api/admin/item`, item, { headers: this.getHeaders() });
  }

  updateItem(itemId: number, item: any) {
    return this.http.put(`${this.baseUrl}/api/admin/item/${itemId}`, item, { headers: this.getHeaders() });
  }

  deleteItem(itemId: number) {
    return this.http.delete(`${this.baseUrl}/api/admin/item/${itemId}`, { headers: this.getHeaders() });
  }

  getStaffItems() {
    return this.http.get<any[]>(`${this.baseUrl}/api/staff/items`, { headers: this.getHeaders() });
  }

  updateStock(itemId: number, type: string, quantity: number) {
    return this.http.post(`${this.baseUrl}/api/staff/stock?itemId=${itemId}&type=${type}`,
      { quantity }, { headers: this.getHeaders() });
  }

  getStockMovements() {
    return this.http.get<any[]>(`${this.baseUrl}/api/staff/stock`, { headers: this.getHeaders() });
  }

  getSuppliers() {
    return this.http.get<any[]>(`${this.baseUrl}/api/admin/suppliers`, { headers: this.getHeaders() });
  }

  addSupplier(supplier: any) {
    return this.http.post(`${this.baseUrl}/api/admin/supplier`, supplier, { headers: this.getHeaders() });
  }

  deleteSupplier(id: number) {
    return this.http.delete(`${this.baseUrl}/api/admin/supplier/${id}`,
      { headers: this.getHeaders() });
}

  createOrder(supplierId: number, itemId: number | null, order: any) {
    const itemParam = itemId ? `&itemId=${itemId}` : '';
    return this.http.post(
      `${this.baseUrl}/api/admin/order?supplierId=${supplierId}${itemParam}`, order,
      { headers: this.getHeaders() });
  }

  getOrders(role: string) {
    const url = role === 'ADMIN'
      ? `${this.baseUrl}/api/admin/orders`
      : `${this.baseUrl}/api/supplier/orders`;
    return this.http.get<any[]>(url, { headers: this.getHeaders() });
  }

  updateOrderStatus(orderId: number, status: string) {
    return this.http.put(
      `${this.baseUrl}/api/supplier/order/update/${orderId}?status=${status}`,
      {}, { headers: this.getHeaders() });
  }
}
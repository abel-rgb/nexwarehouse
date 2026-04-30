import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  items: any[] = [];
  suppliers: any[] = [];
  newOrder = { supplierId: 0, itemId: null as number | null, orderDate: '', quantity: 0 };
  message = ''; error = '';
  role = '';
  searchTerm = '';

  constructor(private http: HttpService, private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.role = this.auth.getRole() || '';
    if (!this.role) { this.router.navigate(['/login']); return; }
    this.loadOrders();
    if (this.role === 'ADMIN') {
      this.loadItems();
      this.loadSuppliers();
    }
  }

  loadOrders() { this.http.getOrders(this.role).subscribe({ next: d => this.orders = d }); }
  loadItems() { this.http.getItems().subscribe({ next: d => this.items = d }); }
  loadSuppliers() { this.http.getSuppliers().subscribe({ next: d => this.suppliers = d }); }

  filteredOrders() {
    if (!this.searchTerm) return this.orders;
    return this.orders.filter(o =>
      (o.supplier?.name || '').toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      o.status.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      (o.item?.name || '').toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  createOrder() {
    if (!this.newOrder.supplierId || !this.newOrder.orderDate || !this.newOrder.quantity) {
      this.error = 'Please fill all fields.'; return;
    }
    const order = { orderDate: this.newOrder.orderDate, status: 'PENDING', quantity: this.newOrder.quantity };
    this.http.createOrder(this.newOrder.supplierId, this.newOrder.itemId, order).subscribe({
      next: () => {
        this.message = 'Order created! Stock will update automatically when delivered.';
        this.error = '';
        this.newOrder = { supplierId: 0, itemId: null, orderDate: '', quantity: 0 };
        this.loadOrders();
        setTimeout(() => this.message = '', 4000);
      },
      error: () => { this.error = 'Failed to create order.'; this.message = ''; }
    });
  }

  markDelivered(id: number) {
    this.http.updateOrderStatus(id, 'DELIVERED').subscribe({
      next: () => {
        this.message = '✅ Order delivered! Item stock updated automatically.';
        this.loadOrders();
        setTimeout(() => this.message = '', 4000);
      }
    });
  }

  getPending() { return this.orders.filter(o => o.status === 'PENDING').length; }
  getDelivered() { return this.orders.filter(o => o.status === 'DELIVERED').length; }
  getRate() { return this.orders.length ? Math.round((this.getDelivered() / this.orders.length) * 100) : 0; }
  logout() { this.auth.logout(); }
}
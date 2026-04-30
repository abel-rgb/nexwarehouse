import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html'
})
export class DashboardComponent implements OnInit {
  role = '';
  items: any[] = [];
  stockMovements: any[] = [];
  orders: any[] = [];

  newItem = { name: '', quantity: 0, description: '' };
  newSupplier = { name: '', contactInfo: '', email: '' };
  newOrder = { orderDate: '', quantity: 0, supplierId: 0 };
  stockUpdate = { itemId: 0, type: 'IN', quantity: 0 };

  message = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.role = localStorage.getItem('role') || '';
    if (!this.role) { this.router.navigate(['/login']); return; }

    if (this.role === 'ADMIN' || this.role === 'STAFF') this.loadItems();
    if (this.role === 'STAFF') this.loadStockMovements();
    if (this.role === 'SUPPLIER') this.loadOrders();
  }

  loadItems() {
    this.userService.getItems().subscribe({ next: (data) => this.items = data });
  }

  loadStockMovements() {
    this.userService.getStockMovements().subscribe({ next: (data) => this.stockMovements = data });
  }

  loadOrders() {
    this.userService.getAllOrders().subscribe({ next: (data) => this.orders = data });
  }

  addItem() {
    this.userService.addItem(this.newItem).subscribe({
      next: () => { this.message = 'Item added!'; this.loadItems(); this.newItem = { name: '', quantity: 0, description: '' }; },
      error: () => this.message = 'Failed to add item.'
    });
  }

  deleteItem(id: number) {
    this.userService.deleteItem(id).subscribe({ next: () => this.loadItems() });
  }

  addSupplier() {
    this.userService.addSupplier(this.newSupplier).subscribe({
      next: () => { this.message = 'Supplier added!'; this.newSupplier = { name: '', contactInfo: '', email: '' }; },
      error: () => this.message = 'Failed to add supplier.'
    });
  }

  createOrder() {
    const order = { orderDate: this.newOrder.orderDate, status: 'PENDING', quantity: this.newOrder.quantity };
    this.userService.createOrder(this.newOrder.supplierId, order).subscribe({
      next: () => { this.message = 'Order created!'; this.loadOrders(); },
      error: () => this.message = 'Failed to create order.'
    });
  }

  updateStock() {
    this.userService.updateStock(this.stockUpdate.itemId, this.stockUpdate.type, this.stockUpdate.quantity).subscribe({
      next: () => { this.message = 'Stock updated!'; this.loadItems(); this.loadStockMovements(); },
      error: () => this.message = 'Failed to update stock.'
    });
  }

  updateOrderStatus(orderId: number, status: string) {
    this.userService.updateOrderStatus(orderId, status).subscribe({
      next: () => { this.message = 'Order updated!'; this.loadOrders(); }
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}

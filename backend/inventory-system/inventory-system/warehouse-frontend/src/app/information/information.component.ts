import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {
  orders: any[] = [];
  items: any[] = [];
  suppliers: any[] = [];
  role = '';
  username = '';
  searchTerm = '';

  constructor(private http: HttpService, private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.role = this.auth.getRole() || '';
    this.username = this.auth.getUsername() || 'Admin';
    if (this.role !== 'ADMIN') { this.router.navigate(['/login']); return; }
    this.loadData();
  }

  loadData() {
    this.http.getOrders('ADMIN').subscribe({ next: d => this.orders = d });
    this.http.getItems().subscribe({ next: d => this.items = d });
    this.http.getSuppliers().subscribe({ next: d => this.suppliers = d });
  }

  getSupplierOrders(supplierId: number) {
    return this.orders.filter(o => o.supplier?.id === supplierId);
  }

  getSupplierItems(supplierId: number) {
    const orders = this.getSupplierOrders(supplierId);
    const itemMap = new Map();
    orders.forEach(o => {
      if (o.item) {
        if (!itemMap.has(o.item.id)) {
          itemMap.set(o.item.id, {
            item: o.item,
            totalOrdered: 0,
            delivered: 0,
            pending: 0
          });
        }
        const entry = itemMap.get(o.item.id);
        entry.totalOrdered += o.quantity;
        if (o.status === 'DELIVERED') entry.delivered += o.quantity;
        else entry.pending += o.quantity;
      }
    });
    return Array.from(itemMap.values());
  }

  getSupplierDelivered(supplierId: number) {
    return this.getSupplierOrders(supplierId).filter(o => o.status === 'DELIVERED').length;
  }

  getSupplierPending(supplierId: number) {
    return this.getSupplierOrders(supplierId).filter(o => o.status === 'PENDING').length;
  }

  getTotalSupplied(supplierId: number) {
    return this.getSupplierOrders(supplierId)
      .filter(o => o.status === 'DELIVERED')
      .reduce((s, o) => s + o.quantity, 0);
  }

  filteredSuppliers() {
    if (!this.searchTerm) return this.suppliers;
    return this.suppliers.filter(s =>
      s.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  getLowStockItems() {
    return this.items.filter(i => i.quantity <= 10 && i.quantity > 0);
  }

  getOutOfStockItems() {
    return this.items.filter(i => i.quantity === 0);
  }

  logout() { this.auth.logout(); }
}
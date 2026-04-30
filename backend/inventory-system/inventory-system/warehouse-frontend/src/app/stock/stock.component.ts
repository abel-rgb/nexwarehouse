import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  items: any[] = [];
  movements: any[] = [];
  stockUpdate = { itemId: 0, type: 'IN', quantity: 0 };
  message = ''; error = '';
  searchTerm = '';

  constructor(private http: HttpService, private auth: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.auth.getRole() !== 'STAFF') { this.router.navigate(['/login']); return; }
    this.loadItems(); this.loadMovements();
  }

  loadItems() { this.http.getStaffItems().subscribe({ next: d => this.items = d }); }
  loadMovements() { this.http.getStockMovements().subscribe({ next: d => this.movements = d }); }

  filteredItems() {
    if (!this.searchTerm) return this.items;
    return this.items.filter(i => i.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }

  updateStock() {
    this.http.updateStock(this.stockUpdate.itemId, this.stockUpdate.type, this.stockUpdate.quantity).subscribe({
      next: () => {
        this.message = `Stock ${this.stockUpdate.type} updated successfully!`;
        this.error = '';
        this.stockUpdate = { itemId: 0, type: 'IN', quantity: 0 };
        this.loadItems(); this.loadMovements();
        setTimeout(() => this.message = '', 3000);
      },
      error: () => { this.error = 'Failed — check item ID or insufficient stock.'; this.message = ''; }
    });
  }

  getTotalUnits() { return this.items.reduce((s, i) => s + i.quantity, 0); }
  getLowStock() { return this.items.filter(i => i.quantity <= 10).length; }
  logout() { this.auth.logout(); }
}
import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  items: any[] = [];
  newItem = { name: '', quantity: 0, description: '' };
  editingItem: any = null;
  message = ''; error = '';
  searchTerm = '';
  role = '';
  username = '';
  showNotif = false;
  showProfile = false;
  showPasswordModal = false;
  newPassword = '';

  constructor(private http: HttpService, private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.role = this.auth.getRole() || '';
    this.username = this.auth.getUsername() || 'Admin';
    if (this.role !== 'ADMIN') { this.router.navigate(['/login']); return; }
    this.loadItems();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: any) {
    if (!event.target.closest('.notif-wrap')) this.showNotif = false;
    if (!event.target.closest('.profile-wrap')) this.showProfile = false;
  }

  loadItems() { this.http.getItems().subscribe({ next: d => this.items = d }); }

  filteredItems() {
    if (!this.searchTerm) return this.items;
    return this.items.filter(i =>
      i.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      (i.description || '').toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  addItem() {
    this.http.addItem(this.newItem).subscribe({
      next: () => { this.message = 'Item added!'; this.error = ''; this.newItem = { name: '', quantity: 0, description: '' }; this.loadItems(); setTimeout(() => this.message = '', 3000); },
      error: () => { this.error = 'Failed to add item.'; this.message = ''; }
    });
  }

  startEdit(item: any) { this.editingItem = { ...item }; }
  cancelEdit() { this.editingItem = null; }

  saveEdit() {
    this.http.updateItem(this.editingItem.id, this.editingItem).subscribe({
      next: () => { this.message = 'Item updated!'; this.editingItem = null; this.loadItems(); setTimeout(() => this.message = '', 3000); }
    });
  }

  deleteItem(id: number) {
    if (confirm('Delete this item?')) {
      this.http.deleteItem(id).subscribe({ next: () => this.loadItems() });
    }
  }

  getTotalUnits() { return this.items.reduce((s, i) => s + i.quantity, 0); }
  getLowStock() { return this.items.filter(i => i.quantity <= 10 && i.quantity > 0).length; }
  getInStock() { return this.items.filter(i => i.quantity > 10).length; }

  toggleNotif() { this.showNotif = !this.showNotif; this.showProfile = false; }
  toggleProfile() { this.showProfile = !this.showProfile; this.showNotif = false; }

  getNotifCount() { return this.getNotifications().length; }

  getNotifications() {
    const notifs: any[] = [];
    this.items.filter(i => i.quantity <= 10 && i.quantity > 0).forEach(i => {
      notifs.push({ icon: '⚠️', title: 'Low Stock Alert', desc: `${i.name} has only ${i.quantity} units left` });
    });
    this.items.filter(i => i.quantity === 0).forEach(i => {
      notifs.push({ icon: '🔴', title: 'Out of Stock', desc: `${i.name} is completely out of stock` });
    });
    return notifs;
  }

  changePassword() {
    if (!this.newPassword) return;
    this.message = 'Password updated successfully!';
    this.showPasswordModal = false;
    this.newPassword = '';
    setTimeout(() => this.message = '', 3000);
  }

  goToUsers() { this.router.navigate(['/users']); }
  goToSettings() { this.message = 'Settings coming soon!'; setTimeout(() => this.message = '', 2000); }
  logout() { this.auth.logout(); }
}
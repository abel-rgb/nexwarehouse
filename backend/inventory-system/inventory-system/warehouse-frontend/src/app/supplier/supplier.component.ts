import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-supplier',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {
  suppliers: any[] = [];
  newSupplier = { name: '', contactInfo: '', email: '' };
  message = ''; error = '';
  searchTerm = '';

  constructor(private http: HttpService, private auth: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.auth.getRole() !== 'ADMIN') { this.router.navigate(['/login']); return; }
    this.loadSuppliers();
  }

  loadSuppliers() {
    this.http.getSuppliers().subscribe({ next: d => this.suppliers = d });
  }

  filteredSuppliers() {
    if (!this.searchTerm) return this.suppliers;
    return this.suppliers.filter(s =>
      s.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      (s.contactInfo || '').includes(this.searchTerm)
    );
  }

  stripContact() {
    this.newSupplier.contactInfo = this.newSupplier.contactInfo.replace(/[^0-9]/g, '');
  }

  isValidIndianPhone(phone: string): boolean {
    const cleaned = phone.replace(/[\s\-\+]/g, '');
    return /^(?:\+?91)?[6-9]\d{9}$/.test(cleaned);
  }

  validateSupplier(): string | null {
    if (!this.newSupplier.name || this.newSupplier.name.trim().length < 2)
      return 'Supplier name must be at least 2 characters.';
    if (!this.newSupplier.email || !this.newSupplier.email.includes('@') || !this.newSupplier.email.includes('.'))
      return 'Please enter a valid email address.';
    if (!this.newSupplier.contactInfo)
      return 'Contact number is required.';
    if (!this.isValidIndianPhone(this.newSupplier.contactInfo))
      return 'Contact must be a valid 10-digit Indian number starting with 6, 7, 8, or 9.';
    const emailExists = this.suppliers.find(s => s.email.toLowerCase() === this.newSupplier.email.toLowerCase());
    if (emailExists) return `Email "${this.newSupplier.email}" is already registered.`;
    return null;
  }

  addSupplier() {
    const validationError = this.validateSupplier();
    if (validationError) {
      this.error = validationError;
      this.message = '';
      return;
    }
    this.http.addSupplier(this.newSupplier).subscribe({
      next: () => {
        this.message = `Supplier "${this.newSupplier.name}" added successfully!`;
        this.error = '';
        this.newSupplier = { name: '', contactInfo: '', email: '' };
        this.loadSuppliers();
        setTimeout(() => this.message = '', 3000);
      },
      error: () => { this.error = 'Failed to add supplier.'; this.message = ''; }
    });
  }

  deleteSupplier(id: number, name: string) {
    if (confirm(`Delete supplier "${name}"? This cannot be undone.`)) {
      this.http.deleteSupplier(id).subscribe({
        next: () => {
          this.message = `Supplier "${name}" deleted.`;
          this.loadSuppliers();
          setTimeout(() => this.message = '', 3000);
        },
        error: () => { this.error = 'Cannot delete — supplier may have linked orders.'; }
      });
    }
  }

  logout() { this.auth.logout(); }
}
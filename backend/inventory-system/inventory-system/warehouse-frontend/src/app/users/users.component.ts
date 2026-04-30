import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  newUser = { username: '', password: '', email: '', phone: '', role: 'STAFF' };
  message = ''; error = '';
  searchTerm = '';
  role = '';
  username = '';
  showNotif = false;
  showProfile = false;

  constructor(private http: HttpService, private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.role = this.auth.getRole() || '';
    this.username = this.auth.getUsername() || 'Admin';
    if (this.role !== 'ADMIN') { this.router.navigate(['/login']); return; }
    this.loadUsers();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: any) {
    if (!event.target.closest('.notif-wrap')) this.showNotif = false;
    if (!event.target.closest('.profile-wrap')) this.showProfile = false;
  }

  loadUsers() {
    this.http.getUsers().subscribe({ next: d => this.users = d });
  }

  filteredUsers() {
    if (!this.searchTerm) return this.users;
    return this.users.filter(u =>
      u.username.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      u.role.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  getAdminCount() { return this.users.filter(u => u.role === 'ADMIN').length; }
  getStaffCount() { return this.users.filter(u => u.role === 'STAFF').length; }
  getSupplierCount() { return this.users.filter(u => u.role === 'SUPPLIER').length; }

  stripPhone() {
    this.newUser.phone = this.newUser.phone.replace(/[^0-9]/g, '');
  }

  isValidIndianPhone(phone: string): boolean {
    const cleaned = phone.replace(/[\s\-\+]/g, '');
    return /^(?:\+?91)?[6-9]\d{9}$/.test(cleaned);
  }

  validateUser(): string | null {
    if (!this.newUser.username || this.newUser.username.trim().length < 3)
      return 'Username must be at least 3 characters.';
    if (!this.newUser.password || this.newUser.password.length < 4)
      return 'Password must be at least 4 characters.';
    if (!this.newUser.email || !this.newUser.email.includes('@') || !this.newUser.email.includes('.'))
      return 'Please enter a valid email address.';
    if (this.newUser.phone && !this.isValidIndianPhone(this.newUser.phone))
      return 'Phone must be a valid 10-digit Indian number starting with 6, 7, 8, or 9.';
    const emailExists = this.users.find(u => u.email.toLowerCase() === this.newUser.email.toLowerCase());
    if (emailExists) return `Email "${this.newUser.email}" is already registered.`;
    const usernameExists = this.users.find(u => u.username.toLowerCase() === this.newUser.username.toLowerCase());
    if (usernameExists) return `Username "${this.newUser.username}" is already taken.`;
    return null;
  }

  addUser() {
    const validationError = this.validateUser();
    if (validationError) {
      this.error = validationError;
      this.message = '';
      return;
    }
    this.http.registerUser(this.newUser).subscribe({
      next: () => {
        this.message = `✅ User "${this.newUser.username}" created as ${this.newUser.role}!`;
        this.error = '';
        this.newUser = { username: '', password: '', email: '', phone: '', role: 'STAFF' };
        this.loadUsers();
        setTimeout(() => this.message = '', 4000);
      },
      error: (err: any) => {
        const msg = err?.error?.message || '';
        if (msg.includes('username') || msg.includes('Username'))
          this.error = `Username "${this.newUser.username}" is already taken.`;
        else if (msg.includes('email') || msg.includes('Email'))
          this.error = `Email "${this.newUser.email}" is already registered.`;
        else
          this.error = 'Failed to create user. Please check your inputs.';
        this.message = '';
      }
    });
  }

  deleteUser(id: number) {
    const user = this.users.find(u => u.id === id);
    if (confirm(`Delete user "${user?.username}"?`)) {
      this.http.deleteUser(id).subscribe({
        next: () => {
          this.message = 'User deleted successfully.';
          this.loadUsers();
          setTimeout(() => this.message = '', 3000);
        }
      });
    }
  }

  getRoleBadge(role: string) {
    if (role === 'ADMIN') return 'badge badge-blue';
    if (role === 'STAFF') return 'badge badge-green';
    return 'badge badge-amber';
  }

  toggleNotif() { this.showNotif = !this.showNotif; this.showProfile = false; }
  toggleProfile() { this.showProfile = !this.showProfile; this.showNotif = false; }
  logout() { this.auth.logout(); }
}
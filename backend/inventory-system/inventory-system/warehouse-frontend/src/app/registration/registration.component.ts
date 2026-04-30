import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  user = { username: '', password: '', email: '', phone: '', role: 'STAFF' };
  message = ''; error = '';

  constructor(private authService: AuthService, private router: Router) {}

  stripPhone() {
    this.user.phone = this.user.phone.replace(/[^0-9]/g, '');
  }

  isValidIndianPhone(phone: string): boolean {
    const cleaned = phone.replace(/[\s\-\+]/g, '');
    return /^(?:\+?91)?[6-9]\d{9}$/.test(cleaned);
  }

  validate(): string | null {
    if (!this.user.username || this.user.username.trim().length < 3)
      return 'Username must be at least 3 characters.';
    if (!this.user.password || this.user.password.length < 4)
      return 'Password must be at least 4 characters.';
    if (!this.user.email || !this.user.email.includes('@') || !this.user.email.includes('.'))
      return 'Please enter a valid email address.';
    if (this.user.phone && !this.isValidIndianPhone(this.user.phone))
      return 'Phone must be a valid 10-digit Indian number starting with 6, 7, 8, or 9.';
    return null;
  }

  register() {
    const validationError = this.validate();
    if (validationError) {
      this.error = validationError;
      this.message = '';
      return;
    }
    this.authService.register(this.user).subscribe({
      next: () => {
        this.message = 'Account created successfully! Redirecting to login...';
        this.error = '';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: () => {
        this.error = 'Registration failed. Username or email may already exist.';
        this.message = '';
      }
    });
  }
}
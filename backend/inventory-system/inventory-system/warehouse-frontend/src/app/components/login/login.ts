import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html'
})
export class LoginComponent {
  credentials = { username: '', password: '' };
  error = '';

  constructor(private userService: UserService, private router: Router) {}

  login() {
    this.userService.login(this.credentials).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.role);
        this.router.navigate(['/dashboard']);
      },
      error: () => { this.error = 'Invalid username or password'; }
    });
  }
}
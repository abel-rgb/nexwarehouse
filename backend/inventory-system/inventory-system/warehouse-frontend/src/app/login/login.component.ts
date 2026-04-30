import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = { username: '', password: '' };
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.credentials).subscribe({
      next: (res: any) => {
        this.authService.saveToken(res.token, res.role, this.credentials.username);
        if (res.role === 'ADMIN') this.router.navigate(['/inventory']);
        else if (res.role === 'STAFF') this.router.navigate(['/stock']);
        else this.router.navigate(['/orders']);
      },
      error: () => { this.error = 'Invalid username or password'; }
    });
  }
}
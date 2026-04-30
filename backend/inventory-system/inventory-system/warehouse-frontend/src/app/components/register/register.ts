import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html'
})
export class RegisterComponent {
  user = { username: '', password: '', email: '', role: 'STAFF' };
  message = '';

  constructor(private userService: UserService, private router: Router) {}

  register() {
    this.userService.register(this.user).subscribe({
      next: () => {
        this.message = 'Registered successfully!';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: () => { this.message = 'Registration failed.'; }
    });
  }
}

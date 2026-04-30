import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'https://nexwarehouse.up.railway.app/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  register(user: any) {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(credentials: any) {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }

  saveToken(token: string, role: string, username: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('username', username);
  }

  getToken(): string | null { return localStorage.getItem('token'); }
  getRole(): string | null { return localStorage.getItem('role'); }
  getUsername(): string | null { return localStorage.getItem('username'); }

  isLoggedIn(): boolean { return !!localStorage.getItem('token'); }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
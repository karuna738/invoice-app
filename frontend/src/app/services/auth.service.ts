import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  // forgotPassword(email: string): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  // }

  // resetPassword(token: string, newPassword: string): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/reset-password/${token}`, { newPassword });
  // }

  // getProfile(): Observable<any> {
  //   const token = localStorage.getItem('token');
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   return this.http.get(`${this.apiUrl}/me`, { headers });
  // }

  logout(): void {
    localStorage.removeItem('token');
  }
}
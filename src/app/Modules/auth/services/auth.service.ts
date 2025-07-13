import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASIC_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  // Register User
  register(data: any): Observable<any> {
    return this.http.post(BASIC_URL + 'api/auth/sign-up', data);
  }

  // Login User
  login(loginRequest: any): Observable<any> {
    return this.http.post(BASIC_URL + 'api/auth/login', loginRequest);
  }

  // ✅ Get all departments for dropdown
  getDepartments(): Observable<any[]> {
    return this.http.get<any[]>(BASIC_URL + 'api/departments');
  }

  
}

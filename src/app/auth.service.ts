import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth/auth-data.model';
@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}
  isAuth = false;
  createUser(userdata: AuthData) {
    this.isAuth = true;
    return this.http.post('http://localhost:3000/api/signup', userdata);
  }
  authenticateUser(userdata: AuthData) {
    return this.http.post('http://localhost:3000/api/login', userdata);
    this.isAuth = true;
  }
}

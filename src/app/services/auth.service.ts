import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/user';

const AuthUrl = 'https://ruvents-api20191022110832.azurewebsites.net/api/auth';
// const AuthUrl = 'https://localhost:44356/api/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) { }

  register(user: User): Observable<any> {
    const url = `${AuthUrl}/register`;

    return this.http.post<any>(url, user);
  }

  login(user: User): Observable<any> {
    const url = `${AuthUrl}/login`;

    return this.http.post<any>(url, user);
  }

  getUser(): Observable<User> {
    return this.http.get<User>(AuthUrl);
  }

  loggedIn() {
    const token = localStorage.getItem('Token');
    if (token) {
      return !this.jwtHelperService.isTokenExpired(token);
    } else {
      return false;
    }
  }
}

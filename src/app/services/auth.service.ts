import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/user';

// const RuventsUrl = 'https://ruvents-api20191022110832.azurewebsites.net/api/auth/';
const RuventsUrl = 'https://localhost:44356/api/auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) { }

  register(user: User): Observable<any> {
    return this.http.post<any>(RuventsUrl + 'register', user);
  }

  login(user: User): Observable<any> {
    return this.http.post<any>(RuventsUrl + 'login', user);
  }

  getUser(): Observable<User> {
    return this.http.get<User>(RuventsUrl);
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

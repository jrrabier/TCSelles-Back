import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from '../models/user';
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: any;
  user: any;

  headers: HttpHeaders;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) {
  }

  registerUser(user) {
    // Set headers
    this.headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this.http.post<any>(environment.url + 'users/register', user, {headers: this.headers});
  }

  authenticateUser(user) {
    // Set headers
    this.headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this.http.post<any>(environment.url + 'users/authenticate', user, {headers: this.headers});
  }

  getProfile() {
    this.loadToken();
    this.headers = new HttpHeaders({'Authorization': this.authToken});
    this.headers = this.headers.append('Content-Type', 'application/json');

    return this.http.get<User>(environment.url + 'users/profile', {headers: this.headers});
  }

  storeUserData(token, user) {
    sessionStorage.setItem('id_token',token);
    sessionStorage.setItem('user',JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = sessionStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    const token = sessionStorage.getItem('id_token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  logout() {
    this.authToken = null;
    this.user = null;
    sessionStorage.clear();
  }
}

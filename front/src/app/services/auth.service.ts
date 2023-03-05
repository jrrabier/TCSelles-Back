import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from '../models/user';
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from 'src/environments/environment';
import { FormGroup } from '@angular/forms';
import { PostResponse } from '../interfaces/post-response';
import { AuthResponse } from '../interfaces/auth-response';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: any;
  headers: HttpHeaders;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private sessionService: SessionService
  ) {
    this.headers = new HttpHeaders({'Content-Type': 'application/json'});
  }

  registerUser(user: User) {

    return this.http.post<PostResponse>(environment.url + 'users/register', user, {headers: this.headers});
  }

  authenticateUser(user: FormGroup) {

    return this.http.post<AuthResponse>(environment.url + 'users/authenticate', user, {headers: this.headers});
  }

  forgotPassword(email: FormGroup) {

    return this.http.post<PostResponse>(environment.url + 'users/forgot-password', email, {headers: this.headers});
  }

  resetPassword(valueForm: any, token: string) {
    const body = JSON.stringify({
      newPsw: valueForm.new_password,
      newPswConfirm: valueForm.confirm_new_password
    });

    this.headers = this.headers.append('Authorization', token);

    return this.http.post<PostResponse>(environment.url + 'users/reset-password', body, {headers: this.headers});
  }

  getProfile() {
    return this.http.get<User>(environment.url + 'users/profile', {headers: this.headers});
  }

  storeUserData(token, user) {
    sessionStorage.setItem('id_token',token);
    sessionStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.headers = this.headers.append('Authorization', token);
  }

  loadToken() {
    const token = sessionStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn(): boolean {
    return !this.jwtHelper.isTokenExpired() && this.sessionService.getCurrentUser() != null;
  }

  logout() {
    this.authToken = null;
    sessionStorage.clear();
  }

//   get currentUser() {
//     this.user$ = new SessionUser(this.user$.mail,this.user$.lastname,this.user$.firstname,this.user$.avatar,this.user$.role,this.user$.sex_id)
//     return this.user$;
//   }

  /**
   * Identify if the token is linked to the user
   * @param token token sent by the forgot password email link
   */
  isResetPasswordAuth(token: string): boolean {
    return !this.jwtHelper.isTokenExpired(token);
  }
}

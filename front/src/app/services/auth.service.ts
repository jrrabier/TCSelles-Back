import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from '../models/user';
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from 'src/environments/environment';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { PostResponse } from '../interfaces/post-response';
import { AuthResponse } from '../interfaces/auth-response';
import { ActivatedRoute } from '@angular/router';
import { SessionUser } from '../models/sessionUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: any;
  user: User;

  user$ = JSON.parse(sessionStorage.getItem('user'));

  headers: HttpHeaders;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private route: ActivatedRoute
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
    this.user = user;
    this.headers = this.headers.append('Authorization', token);
  }

  loadToken() {
    const token = sessionStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn(): boolean {
    console.log(this.user);
    
    return !this.jwtHelper.isTokenExpired() && this.user$ != undefined;
  }

  logout() {
    this.authToken = null;
    this.user = null;
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

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GetLevelsResponse } from '../interfaces/get-levels-response';
import { PostResponse } from '../interfaces/post-response';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  headers: HttpHeaders

  constructor(
    private http: HttpClient
  ) { 
    this.headers = new HttpHeaders({'Content-Type': 'application/json'});
  }

  registerUser(user: User) {
    return this.http.post<PostResponse>(`${environment.url}users/register`, user, {headers: this.headers});
  }

  getLevels() {
    return this.http.get<GetLevelsResponse>(`${environment.url}users/register`, {headers: this.headers});
  }
}

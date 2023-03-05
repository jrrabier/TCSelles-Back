import { Injectable } from '@angular/core';
import { SessionUser } from '../models/sessionUser';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  /**
   * Get current connected user
   * @returns current user
   */
  getCurrentUser(): SessionUser {
    return JSON.parse(sessionStorage.getItem("user")) as SessionUser;
  }
}

import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
    const isUserLoggedIn: boolean = this.authService.loggedIn();
    switch (state.url) {
        case "/login":
            if (isUserLoggedIn) {
                this.router.navigate(['/home']);
                return false;
            } else {
                return true;
            }
    
        default:
            if (isUserLoggedIn) {
                return true;
            } else {
                this.router.navigate(['/login']);
                return false;
            }
    }
  }
}

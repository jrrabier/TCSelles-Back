import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ResetPasswordGuard implements CanActivate {

  token: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    console.log(this.activeRoute);
  }

  canActivate() {
    if (this.authService.isResetPasswordAuth(this.token)) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}

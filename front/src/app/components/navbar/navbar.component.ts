import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { SessionUser } from 'src/app/models/sessionUser';
import { SessionService } from 'src/app/services/session.service';
import { GlobalConstants } from 'src/app/common/global-constants';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterContentChecked {

    sessionUser: SessionUser;
    DEFAULT_AVATAR: string;

    constructor(
        public authService: AuthService,
        private router: Router,
        private notifService: NotificationService,
        private sessionService: SessionService,
        public CONSTANTS: GlobalConstants
    ) {}

    ngOnInit() {
        this.DEFAULT_AVATAR = this.CONSTANTS.DEFAULT_AVATAR;
    }

    ngAfterContentChecked(): void {
        this.sessionUser = this.sessionService.getCurrentUser();
    }

    logout() {
        this.authService.logout();
        this.notifService.showWarning('Vous êtes déconnecté !')

        this.router.navigate(['login']);
        return false;
    }
}

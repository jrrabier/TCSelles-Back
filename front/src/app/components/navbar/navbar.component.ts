import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { SessionUser } from 'src/app/models/sessionUser';
import { SessionService } from 'src/app/services/session.service';
import { GlobalConstants } from 'src/app/common/global-constants';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    // @Input() sessionUser: SessionUser;
    sessionUser: SessionUser = this.sessionService.getCurrentUser();
    DEFAULT_AVATAR: string;

    constructor(
        public authService: AuthService,
        private router: Router,
        private flashMessages: FlashMessagesService,
        private sessionService: SessionService,
        public CONSTANTS: GlobalConstants
    ) {}

    ngOnInit() {
        this.DEFAULT_AVATAR = this.CONSTANTS.DEFAULT_AVATAR;
    }

    logout() {
        this.authService.logout();
        this.flashMessages.show('Vous êtes déconnecté !', {cssClass: 'alert-warning', timeout: 3000});

        this.router.navigate(['login']);
        return false;
    }
}

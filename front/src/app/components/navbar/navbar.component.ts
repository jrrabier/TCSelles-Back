import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { SessionUser } from 'src/app/models/sessionUser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    // @Input() sessionUser: SessionUser;
    sessionUser = this.authService.user$;

  constructor(
    public authService: AuthService,
    private router: Router,
    private flashMessages: FlashMessagesService
  ) {}

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    this.flashMessages.show('Vous êtes déconnecté !', {cssClass: 'alert-warning', timeout: 3000});

    this.router.navigate(['login']);
    return false;
  }
}

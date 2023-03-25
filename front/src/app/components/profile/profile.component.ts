import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { SessionUser } from 'src/app/models/sessionUser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: SessionUser;

  constructor(
    private sessionService: SessionService
  ) { }

  ngOnInit() {
    this.user = this.sessionService.getCurrentUser();
  }

}

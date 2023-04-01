import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { SessionUser } from 'src/app/models/sessionUser';
import { faGithub } from "@fortawesome/free-brands-svg-icons";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: SessionUser;
  faGithub = faGithub;

  constructor(
    private sessionService: SessionService
  ) { }

  ngOnInit() {
    this.user = this.sessionService.getCurrentUser();
  }

}

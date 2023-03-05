import { Component, OnInit } from '@angular/core';
import { SessionUser } from './models/sessionUser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    public sessionUser: SessionUser;

    constructor () {}

    ngOnInit(){
    }

    onActivate($event) {
        $event.user = this.sessionUser;
    }

    onDeactivate($event) {
        this.sessionUser = $event.user;
    }
}

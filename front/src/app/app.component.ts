import { Component, OnInit } from '@angular/core';
import { NotificationsContainer } from "./shared/components/notification/notifications-container.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor (
        public notifications: NotificationsContainer
    ) {}

    ngOnInit(){
    }
}

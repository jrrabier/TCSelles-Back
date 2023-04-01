import { Component, OnDestroy } from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { NotificationService } from '../../services/notification.service';
import { NotificationsContainer } from './notifications-container.component';

@Component({
	selector: 'notification',
	standalone: true,
	imports: [NgbTooltipModule, NotificationsContainer],
	templateUrl: './notification.component.html',
})
export class NotificationComponent implements OnDestroy {
	constructor(public notificationService: NotificationService) {}

	ngOnDestroy(): void {
		this.notificationService.clear();
	}
}
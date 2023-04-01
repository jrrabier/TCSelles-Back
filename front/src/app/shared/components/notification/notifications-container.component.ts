import { Component, TemplateRef } from '@angular/core';

import { NotificationService } from '../../services/notification.service';
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'notifications',
	standalone: true,
	imports: [NgbToastModule, NgIf, NgTemplateOutlet, NgFor],
	template: `
		<ngb-toast
			*ngFor="let toast of notificationService.toasts"
			[class]="toast.classname"
			[autohide]="true"
			[delay]="toast.delay || 5000"
			(hidden)="notificationService.remove(toast)"
		>
			<ng-template [ngIf]="isTemplate(toast)" [ngIfElse]="text">
				<ng-template [ngTemplateOutlet]="toast.textOrTpl"></ng-template>
			</ng-template>

			<ng-template #text>{{ toast.textOrTpl }}</ng-template>
		</ngb-toast>
	`,
	host: { class: 'toast-container position-fixed bottom-0 end-0 p-3', style: 'z-index: 1200' },
})
export class NotificationsContainer {
	constructor(public notificationService: NotificationService) {}

	isTemplate(toast) {
		return toast.textOrTpl instanceof TemplateRef;
	}
}
import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    success = {classname: 'bg-success text-light'};
    warning = {classname: 'bg-warning'};
    danger = {classname: 'bg-danger text-light'};

    constructor() { }

        toasts: any[] = [];

        showSuccess(textOrTpl: string | TemplateRef<any>, options: any = {}) {
            options = this.success;
            this.toasts.push({ textOrTpl, ...options });
        }

        showDanger(textOrTpl: string | TemplateRef<any>, options: any = {}) {
            options = this.danger;
            this.toasts.push({ textOrTpl, ...options });
        }

        showWarning(textOrTpl: string | TemplateRef<any>, options: any = {}) {
            options = this.warning;
            this.toasts.push({ textOrTpl, ...options });
        }

        show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
            this.toasts.push({ textOrTpl, ...options });
        }

        remove(toast) {
            this.toasts = this.toasts.filter((t) => t !== toast);
        }

        clear() {
            this.toasts.splice(0, this.toasts.length);
        }
}
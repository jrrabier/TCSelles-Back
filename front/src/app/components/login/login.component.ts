import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from '@angular/router';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { emailValidator } from 'src/app/shared/custom-validators.directive';
import { Subscription } from 'rxjs';
import resources from "../../../assets/resources.json";
import { SessionUser } from 'src/app/models/sessionUser';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

    user: SessionUser

    authenticateUser$: Subscription;
    forgotPassword$: Subscription;
    isRequesting: boolean = false;
    loginForm: UntypedFormGroup;
    forgotPasswordForm: UntypedFormGroup;

    isForgotPassword: boolean = false;
    showPassword: boolean = false;

    rsc: any;

    constructor(
        private authService: AuthService,
        private router: Router,
        private notifService: NotificationService,
        private fb: UntypedFormBuilder
    ) { }

    ngOnInit() {
        this.createLoginForm();
        this.createForgotPasswordForm();
        this.rsc = resources;
    }

    ngOnDestroy() {
        this.authenticateUser$?.unsubscribe();
        this.forgotPassword$?.unsubscribe();
    }

    onLoginSubmit() {

        this.authenticateUser$ = this.authService.authenticateUser(this.loginForm.value)
        .subscribe(res => {
        if (res.success) {
            this.user = res.user;
            this.authService.storeUserData(res.token, res.user);
            this.notifService.showSuccess('Vous êtes connecté. Bienvenue !')
            this.router.navigate(['/home']);
        } else {
            this.notifService.showDanger(res.msg)
            this.router.navigate(['/login']);
        }
        });
    }

    onForgotPasswordSubmit() {

        this.isRequesting = true;

        this.forgotPassword$ = this.authService.forgotPassword(this.forgotPasswordForm.value)
        .subscribe(res => {
        if (res.success) {
            this.notifService.showSuccess(res.msg)
            this.router.navigate(['/login']);
            this.isRequesting = false;
        } else {
            this.notifService.showDanger(res.msg)
            this.isRequesting = false;
            return false;
        }
        });
    }

    createLoginForm() {
        this.loginForm = this.fb.group({
        email: [null, [Validators.required, emailValidator()]],
        password: [null, Validators.required]
        });
    }

    createForgotPasswordForm() {
        this.forgotPasswordForm = this.fb.group({
        email: [null, [Validators.required, emailValidator()]],
        });
    }
}

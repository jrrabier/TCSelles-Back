import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { emailValidator } from 'src/app/shared/custom-validators.directive';
import { Subscription } from 'rxjs';
import resources from "../../../assets/resources.json";
import { SessionUser } from 'src/app/models/sessionUser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

    user: SessionUser

    authenticateUser$: Subscription;
    forgotPassword$: Subscription;
    isRequesting: boolean = false;
    loginForm: FormGroup;
    forgotPasswordForm: FormGroup;

    isForgotPassword: boolean = false;
    showPassword: boolean = false;

    rsc: any;

    constructor(
        private authService: AuthService,
        private router: Router,
        private flashMessages: FlashMessagesService,
        private fb: FormBuilder
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
            this.flashMessages.show('Vous êtes connecté. Bienvenue !', {cssClass: ' alert alert-dismissible alert-success', timeout: 5000});
            this.router.navigate(['/home']);
        } else {
            this.flashMessages.show(res.msg, {cssClass: 'alert-danger', timeout: 5000});
            this.router.navigate(['/login']);
        }
        });
    }

    onForgotPasswordSubmit() {

        this.isRequesting = true;

        this.forgotPassword$ = this.authService.forgotPassword(this.forgotPasswordForm.value)
        .subscribe(res => {
        if (res.success) {
            this.flashMessages.show(res.msg, {cssClass: 'alert-success', timeout: 5000});
            this.router.navigate(['/login']);
            this.isRequesting = false;
        } else {
            this.flashMessages.show(res.msg, {cssClass: 'alert-danger', timeout: 5000});
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

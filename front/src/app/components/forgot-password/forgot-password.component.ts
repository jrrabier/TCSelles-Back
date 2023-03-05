import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { passwordValidator } from 'src/app/shared/custom-validators.directive';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

  queryParams$: Subscription;
  forgotPasswordForm: FormGroup;
  token: string;
  showNewPassword: boolean = false;
  showConfirmNewPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private flashMessages: FlashMessagesService
  ) { }

  ngOnInit() {
    this.queryParams$ = this.route.queryParams.subscribe((params) => {
      this.token = params.token;

    });
    this.createForm();
  }

  ngOnDestroy() {
    this.queryParams$.unsubscribe();
  }

  createForm() {
    this.forgotPasswordForm = this.fb.group({
      new_password: [null, [Validators.required, passwordValidator()]],
      confirm_new_password: [null, [Validators.required, passwordValidator()]]
    });
  }

  onFormSubmit() {
    this.authService.resetPassword(this.forgotPasswordForm.value, this.token).subscribe((result) => {
      if (result.success) {
        this.flashMessages.show(result.msg, {cssClass: 'alert-success', timeout: 5000});
        this.router.navigate(['/login']);
      } else {
        this.flashMessages.show(result.msg, {cssClass: 'alert-danger', timeout: 5000});
      }

    },
    () => {
      this.flashMessages.show(`Votre lien a expiré`, {cssClass: 'alert-danger', timeout: 5000});
    });
  }

  checkIfSamePasswords() {
    console.log(this.forgotPasswordForm.getError('password'));
    console.log(this.forgotPasswordForm.errors);
    console.log(this.forgotPasswordForm.get('new_password').value);
    console.log(this.forgotPasswordForm.get('confirm_new_password').value);

    if (this.forgotPasswordForm.getError('password') == null || this.forgotPasswordForm.getError('password') == undefined) {
      if (this.forgotPasswordForm.get('new_password').value !== this.forgotPasswordForm.get('confirm_new_password').value) {
        this.forgotPasswordForm.setErrors({'notSamePassword': true});
      }
    }
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { passwordValidator } from 'src/app/shared/custom-validators.directive';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

  queryParams$: Subscription;
  forgotPasswordForm: UntypedFormGroup;
  token: string;
  showNewPassword: boolean = false;
  showConfirmNewPassword: boolean = false;

  constructor(
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private notifService: NotificationService
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
        this.notifService.showSuccess(result.msg)
        this.router.navigate(['/login']);
      } else {
        this.notifService.showDanger(result.msg)
      }

    },
    () => {
        this.notifService.showDanger(`Votre lien a expiré`)
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

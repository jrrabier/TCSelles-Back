import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { ValidateService } from 'src/app/services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  first_name: String;
  last_name: String;
  email: String;
  password: String;
  avatar: String;
  rank: String;
  address: String;
  postal_code: String;
  city: String;
  birth_date: Date;
  mobile: String;
  sex: String;

  constructor(
    private validateService: ValidateService,
    private flashMessages: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      password: this.password,
      avatar: this.avatar,
      rank: this.rank,
      address: this.address,
      postal_code: this.postal_code,
      city: this.city,
      birth_date: this.birth_date,
      mobile: this.mobile,
      sex: this.sex
    }
    console.log(user);

    // Required fields
    if (!this.validateService.validateRegister(user)) {
      this.flashMessages.show('Veuillez renseigner tous les champs obligatoires !', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Validate email
    if(!this.validateService.ValidateEmail(user.email)) {
      this.flashMessages.show('Veuillez renseigner un email valide !', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Register user
    this.authService.registerUser(user)
    .subscribe(data => {
      if (data.success) {
        this.flashMessages.show('Votre compte est bien crée !', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/login']);
      } else {
        this.flashMessages.show('Votre compte est bien crée !', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);
      }
    });

  }

}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateRegister(user) {
    if (
      user.last_name == undefined ||
      user.first_name == undefined ||
      user.email == undefined ||
      user.password == undefined ||
      user.rank == undefined ||
      user.birth_date == undefined ||
      user.sex == undefined
      ) {
      return false;
    } else {
      return true;
    }
  }

   ValidateEmail(mail) {
    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail));
   }
}

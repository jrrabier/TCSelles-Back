import { ValidatorFn, AbstractControl } from '@angular/forms';

const emailRe: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*\.\w{2,4}$/;
const passwordRe: RegExp = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const valid = passwordRe.test(control.value);
    return valid ? null : {'password': {value: control.value}};
  };
}

export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const valid = emailRe.test(control.value);
    return valid ? null : {'email': {value: control.value}};
  };
}

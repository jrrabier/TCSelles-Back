import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MasksService {

  private mobile = [/0/,/(6|7)/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/];
  private licence_nb = [/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\w/];

  constructor() { }

  public get GetMobile() : RegExp[] {
      return this.mobile;
  }
  
  public get GetLicenceNb() : RegExp[] {
      return this.licence_nb;
  }
  
}

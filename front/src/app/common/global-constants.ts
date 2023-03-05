import { Injectable } from "@angular/core";
@Injectable()
export class GlobalConstants {

  public get DEFAULT_AVATAR() : string {
    return '/assets/avatars/default-avatar.png';
  }

}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OutilsService {

    constructor() { }

    getMySqlDate(date: Date): string {
        const DD: number = date.getDate();
        const MM: number = date.getMonth() + 1;
        const YYYY: number = date.getUTCFullYear();

        return `${YYYY}-${MM}-${DD}`;
    }

    isLocalhost(): boolean {
        return window.location.hostname === 'localhost';
    }
}

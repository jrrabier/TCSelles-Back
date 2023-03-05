import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'truncateFirstName'
})
export class TruncateFirstNamePipe implements PipeTransform {

    transform(value: string): string {
        if (value.includes('-')) {
            let tab: string[] = value.split('-');
            value = tab[0].substring(0,1) + '-' + tab[1].substring(0,1) + '.';
        } else {
            value = value.substring(0,1) + '.';
        }
        return value;
    }

}

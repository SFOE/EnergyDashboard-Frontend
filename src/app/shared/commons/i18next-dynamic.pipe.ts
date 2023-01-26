import { Pipe, PipeTransform } from '@angular/core';
import { I18NextPipe } from 'angular-i18next';

@Pipe({ name: 'i18nextDynamic', pure: false })
export class I18nextDynamicPipe implements PipeTransform {
    constructor(private i18nextPipe: I18NextPipe) {}

    transform(key: string): string {
        return this.i18nextPipe.transform(key);
    }
}

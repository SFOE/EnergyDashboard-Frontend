import { Pipe, PipeTransform } from '@angular/core';
import { replaceHyphenWithEnDash } from '../static-utils/replace-hyphen-with-en-dash.functions';

@Pipe({ name: 'replaceHyphenWithEnDash', pure: true })
export class ReplaceHyphenWithEnDashPipe implements PipeTransform {
    transform(value: string, replaceSpaces?: boolean): string {
        return replaceHyphenWithEnDash(value, replaceSpaces);
    }
}

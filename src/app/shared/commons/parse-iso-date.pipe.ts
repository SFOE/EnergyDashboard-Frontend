import { Pipe, PipeTransform } from '@angular/core';
// import { parseIsoDate } from '../../static-utils/date-utils'
import { parseIsoDate } from '../static-utils/date-utils';

@Pipe({ name: 'parseIsoDate', pure: true })
export class ParseIsoDatePipe implements PipeTransform {
    transform(isoDateString: string): Date {
        return parseIsoDate(isoDateString);
    }
}

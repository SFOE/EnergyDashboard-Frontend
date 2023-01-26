import { Pipe, PipeTransform } from '@angular/core';
// import { formatUtcDate } from '../../static-utils/date-utils'
import { formatUtcDate } from '../static-utils/date-utils';

@Pipe({ name: 'fmtDate' })
export class FmtDatePipe implements PipeTransform {
    transform(value: Date, fmt?: string): string {
        return formatUtcDate(value, fmt);
    }
}

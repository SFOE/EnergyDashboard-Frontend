import { Pipe, PipeTransform } from '@angular/core';
import { getISOWeek } from 'date-fns';

@Pipe({ name: 'fmtIsoWeek' })
export class FmtIsoWeekPipePipe implements PipeTransform {
    transform(value: Date): number {
        return getISOWeek(value);
    }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'toDate', pure: true })
export class ToDatePipe implements PipeTransform {
    /**
     * transform string to date
     * @param dateString ISO-8601
     */
    transform(dateString: string): Date {
        return new Date(dateString); // ISO-8601 contains Timezone
    }
}

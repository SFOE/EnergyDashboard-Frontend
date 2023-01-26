import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'percentDisplay'
})
export class PercentDisplayPipe implements PipeTransform {
    transform(value: number | undefined | null): string {
        if (value === 0 || !!value) {
            return `${value}%`;
        }

        return '';
    }
}

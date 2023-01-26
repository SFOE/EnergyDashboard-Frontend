import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'roundNumber', pure: true })
export class RoundNumberPipe implements PipeTransform {
    transform(value: number): number | null {
        if (value == null) {
            return null;
        }

        return Math.round(value);
    }
}

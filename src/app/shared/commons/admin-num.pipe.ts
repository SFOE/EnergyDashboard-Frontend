import { Pipe, PipeTransform } from '@angular/core';
import { adminFormatNum } from '../static-utils/admin-format-num.function';

@Pipe({ name: 'adminNum', pure: true })
export class AdminNumPipe implements PipeTransform {
    transform(
        value: number | null | undefined,
        suffix?: string | undefined
    ): string;
    transform(
        value: number | null | undefined,
        toFixed?: number,
        suffix?: string
    ): string;
    transform(
        value: number | null | undefined,
        toFixedOrSuffix?: number | string | undefined,
        optSuffix?: string
    ): string {
        const toFixed =
            typeof toFixedOrSuffix === 'number' ? toFixedOrSuffix : undefined;
        const suffix =
            typeof toFixedOrSuffix === 'string' ? toFixedOrSuffix : optSuffix;
        return adminFormatNum(value, toFixed, suffix);
    }
}

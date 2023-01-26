import { formatDate } from '@angular/common';

import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';

export function parseIsoDate(dateStr: string): Date {
    return zonedTimeToUtc(dateStr, 'Europe/Zurich');
}

/**
 *
 * @param utcDate the correct utc Date object
 * @param fmt format string according to https://angular.io/api/common/DatePipe#pre-defined-format-options
 * @param locale default de-CH - only necessary to provide when formatting Months/Days non-numeric
 */
export function formatUtcDate(
    utcDate: Date,
    fmt: string = 'dd.MM.yyyy'
    //locale = 'de-CH'
): string {
    return formatDate(utcToZonedTime(utcDate, 'Europe/Zurich'), fmt, 'en-US');
}

export const oneWeekInMilliseconds = 6.048e8;

export const isInLastWeekOfTheYear = (date: Date): boolean => {
    const isInDecember = date.getMonth() === 11;
    return isInDecember && 31 - date.getDate() < 7;
};

export const convertToDate = (dateString: string): Date => {
    return new Date(dateString);
};

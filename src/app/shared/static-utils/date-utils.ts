import { formatDate } from '@angular/common';
import { setHours, startOfDay, subYears } from 'date-fns';

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

export const dateWithoutTime = (dateString: string): Date => {
    const date = new Date(dateString);
    date.setHours(0, 0, 0, 0);
    return date;
};

const weekdayLongMapping = [
    'commons.day.long.mondays',
    'commons.day.long.tuesdays',
    'commons.day.long.wednesdays',
    'commons.day.long.thursdays',
    'commons.day.long.fridays'
];

const weekdayShortMapping = [
    'commons.day.short.mondays',
    'commons.day.short.tuesdays',
    'commons.day.short.wednesdays',
    'commons.day.short.thursdays',
    'commons.day.short.fridays'
];

const monthMapping = [
    'commons.month.january',
    'commons.month.february',
    'commons.month.march',
    'commons.month.april',
    'commons.month.may',
    'commons.month.june',
    'commons.month.july',
    'commons.month.august',
    'commons.month.september',
    'commons.month.october',
    'commons.month.november',
    'commons.month.december'
];

/**
 * Get the translation key for a weekday number. Only monday (0) to friday (4) is currently mapped.
 * @param weekday weekday number
 * @param useLongName weather or not to use the long name for the weekday or the short name
 * @returns weekday translation key
 */
export const weekdayToTranslationKey = (
    weekday: number | undefined,
    useLongName: boolean
): string => {
    if (
        weekday !== undefined &&
        weekday >= 0 &&
        weekday < weekdayLongMapping.length
    ) {
        return useLongName
            ? weekdayLongMapping[weekday]
            : weekdayShortMapping[weekday];
    }
    return 'commons.not-available';
};

export const monthToTranslationKey = (monthIndex: number): string => {
    if (monthIndex >= 0 && monthIndex < monthMapping.length) {
        return monthMapping[monthIndex];
    }
    return 'commons.not-available';
};

export const middleOfDay = (date: Date): Date => {
    return setHours(startOfDay(date), 12);
};

export const getYesterday = (): Date => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    return yesterday;
};

export const getYearsAgo = (n: number): Date => {
    return subYears(new Date(), n);
};

export const isOneMonthAfter = (date1: Date, date2: Date): boolean => {
    let date1Month: number = date1.getMonth();
    let date1Year: number = date1.getFullYear();
    let date2Month: number = date2.getMonth();
    let date2Year: number = date2.getFullYear();

    if (date1.getDate() !== date2.getDate()) {
        return false;
    }

    if (date1Year === date2Year) {
        return date2Month - date1Month === 1;
    } else if (date2Year - date1Year === 1) {
        return date1Month === 11 && date2Month === 0;
    } else {
        return false;
    }
};

export const getYesterdayDate = (): Date => {
    const today: Date = new Date();
    const yesterday: Date = new Date(today);

    yesterday.setDate(today.getDate() - 1);

    return yesterday;
};

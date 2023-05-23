import { isInLastWeekOfTheYear } from '../static-utils/date-utils';
import { HistogramEntry, LabelFilter } from './histogram/base-histogram.model';

const isFirstOrLastIndex = (data: HistogramEntry[], date: Date): boolean => {
    const labelIndex = data.findIndex((entry) => entry.date === date);
    return labelIndex === 0 || labelIndex === data.length - 1;
};

// ***** Formatters ******

const firstLastAndJanuaryFormatter =
    (data: HistogramEntry[], language: string) => (date: Date) => {
        const isJanuary = date.getMonth() === 0;
        if (isJanuary || isFirstOrLastIndex(data, date)) {
            return date.toLocaleString(language, {
                year: 'numeric'
            });
        }
        return '   ';
    };

const firstLastJanuaryAndDecemberFormatter =
    (data: HistogramEntry[], language: string) => (date: Date) => {
        const isJanuary = date.getMonth() === 0;
        const isDecember = date.getMonth() === 11;
        if (isJanuary || isDecember || isFirstOrLastIndex(data, date)) {
            return date.toLocaleString(language, {
                year: 'numeric'
            });
        }
        return '   ';
    };

const firstOfMonthOnlyFormatter =
    (data: HistogramEntry[], language: string) => (date: Date) => {
        if (date.getDate() === 1 || isFirstOrLastIndex(data, date)) {
            return date.toLocaleString(language, {
                month: 'short'
            });
        }
        return '   ';
    };

const firstWeekOfMonthOnlyFormatter = (language: string) => (date: Date) => {
    if (date.getDate() <= 7 || isInLastWeekOfTheYear(date)) {
        return date.toLocaleString(language, {
            month: 'short'
        });
    }
    return '   ';
};

const dailyFormatter = (language: string) => (date: Date) => {
    return date.toLocaleDateString(language, {
        day: '2-digit',
        month: '2-digit'
    });
};

const yearFullFormatter = (language: string) => (date: Date) => {
    return date.toLocaleString(language, {
        year: 'numeric'
    });
};

const monthShortFormatter = (language: string) => (date: Date) => {
    return date.toLocaleString(language, {
        month: 'short'
    });
};

const dateShortFormatter = (language: string) => (date: Date) => {
    return date.toLocaleString(language, {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit'
    });
};

const monthAndDayFormatter = (language: string) => (date: Date) => {
    return date.toLocaleString(language, {
        month: '2-digit',
        day: '2-digit'
    });
};

const dayFormatter = () => (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // add 1 to month since it's zero-based
    const year = date.getFullYear().toString();

    return `${day}.${month}.${year}`;
};

const emptyFormatter = (date: Date) => '';

export const LabelFormatters = {
    firstLastAndJanuary: firstLastAndJanuaryFormatter,
    firstLastJanuaryAndDecember: firstLastJanuaryAndDecemberFormatter,
    firstOfMonthOnly: firstOfMonthOnlyFormatter,
    firstWeekOfMonthOnly: firstWeekOfMonthOnlyFormatter,
    monthShort: monthShortFormatter,
    yearFull: yearFullFormatter,
    dailyFormatter: dailyFormatter,
    dateShort: dateShortFormatter,
    monthAndDay: monthAndDayFormatter,
    empty: emptyFormatter,
    day: dayFormatter
};

// ***** Filters ******

interface FilterOptions {
    excludeFirst?: boolean;
    excludeLast?: boolean;
}

const defaultFilterOptions = {
    excludeFirst: false,
    excludeLast: false
};

const includeFirstLastCheck = (
    passesChecks: boolean,
    index: number,
    arrayLength: number,
    options: FilterOptions
) => {
    const isFirst = index === 0;
    const isLast = index === arrayLength - 1;
    const shouldNotDisplay =
        (options.excludeFirst && isFirst) || (options.excludeLast && isLast);
    if (shouldNotDisplay) {
        return false;
    }
    return passesChecks || isFirst || isLast;
};

const firstOfMonthOnlyFilter =
    (options: FilterOptions = defaultFilterOptions): LabelFilter =>
    <T extends HistogramEntry>(
        value: T,
        index: number,
        arrayLength: number
    ): boolean => {
        const isFirstOfMonth = value.date.getDate() === 1;
        return includeFirstLastCheck(
            isFirstOfMonth,
            index,
            arrayLength,
            options
        );
    };

const firstWeekOfMonthFilter =
    (options: FilterOptions = defaultFilterOptions): LabelFilter =>
    <T extends HistogramEntry>(
        value: T,
        index: number,
        arrayLength: number
    ): boolean => {
        const isInFirstWeekk = value.date.getDate() <= 7;
        return includeFirstLastCheck(
            isInFirstWeekk,
            index,
            arrayLength,
            options
        );
    };

const firstDayOfWeekFilter =
    (options: FilterOptions = defaultFilterOptions): LabelFilter =>
    <T extends HistogramEntry>(
        value: T,
        index: number,
        arrayLength: number
    ): boolean => {
        const isFirstDayOfWeek = value.date.getDay() === 0;
        return includeFirstLastCheck(
            isFirstDayOfWeek,
            index,
            arrayLength,
            options
        );
    };

const januaryAndDecemberFilter =
    (options: FilterOptions = defaultFilterOptions): LabelFilter =>
    <T extends HistogramEntry>(
        value: T,
        index: number,
        arrayLength: number
    ): boolean => {
        const isJanuary = value.date.getMonth() === 0;
        const isDecember = value.date.getMonth() === 11;
        return includeFirstLastCheck(
            isJanuary || isDecember,
            index,
            arrayLength,
            options
        );
    };

const everyNthFilter =
    (nth: number, options: FilterOptions = defaultFilterOptions): LabelFilter =>
    <T extends HistogramEntry>(
        _value: T,
        index: number,
        arrayLength: number
    ): boolean => {
        const isNth = index % nth === 0;
        return includeFirstLastCheck(isNth, index, arrayLength, options);
    };

const noLabelFiler = (): LabelFilter => () => true; // method call to keep all filters uniform

export const LabelFilters = {
    firstOfMonthOnly: firstOfMonthOnlyFilter,
    firstWeekOfMonth: firstWeekOfMonthFilter,
    firstDayOfWeek: firstDayOfWeekFilter,
    januaryAndDecember: januaryAndDecemberFilter,
    everyNth: everyNthFilter,
    none: noLabelFiler
};

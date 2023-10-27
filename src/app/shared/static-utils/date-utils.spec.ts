import { expect } from '@jest/globals';
import { dateWithoutTime, weekdayToTranslationKey } from './date-utils';

describe('dateWithoutTime', () => {
    it('should create date without timestamp in wintertime', () => {
        const dateString = '2023-01-01T09:35:31.820Z';
        const result = dateWithoutTime(dateString);

        expect(result.getHours()).toEqual(0);
        expect(result.getMinutes()).toEqual(0);
        expect(result.getSeconds()).toEqual(0);
        expect(result.getMilliseconds()).toEqual(0);

        expect(result.getFullYear()).toBe(2023);
        expect(result.getMonth()).toBe(0);
        expect(result.getDate()).toBe(1);
    });

    it('should create date without timestamp in summertime', () => {
        const dateString = '2023-04-01T09:35:31.820Z';
        const result = dateWithoutTime(dateString);

        expect(result.getHours()).toEqual(0);
        expect(result.getMinutes()).toEqual(0);
        expect(result.getSeconds()).toEqual(0);
        expect(result.getMilliseconds()).toEqual(0);

        expect(result.getFullYear()).toBe(2023);
        expect(result.getMonth()).toBe(3);
        expect(result.getDate()).toBe(1);
    });
});

describe('weekdayToTranslationKey', () => {
    const expectedWeekdayMapping = [
        'commons.day.long.mondays',
        'commons.day.long.tuesdays',
        'commons.day.long.wednesdays',
        'commons.day.long.thursdays',
        'commons.day.long.fridays'
    ];

    it('should map all mapped keys correctly', () => {
        expectedWeekdayMapping.forEach((expected, index, useLongName) => {
            const result = weekdayToTranslationKey(index, true);

            expect(result).toBe(expected);
        });
    });

    it('should map unmapped weekdays to N/A', () => {
        const expected = 'commons.not-available';

        let result = weekdayToTranslationKey(6, true);
        expect(result).toBe(expected);

        result = weekdayToTranslationKey(undefined, true);
        expect(result).toBe(expected);

        result = weekdayToTranslationKey(-1, true);
        expect(result).toBe(expected);
    });
});

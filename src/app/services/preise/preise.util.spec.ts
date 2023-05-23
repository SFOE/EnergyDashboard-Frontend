import { PreiseFuturesDto } from '../../core/models/preise-futures.model';
import { mapPreiseFuturesDtoToLineEntries } from './preise.util';

describe('mapPreiseFuturesDtoToLineEntries', () => {
    it('should map values correctly', () => {
        const dto: PreiseFuturesDto = {
            date: '2023-01-01',
            monthPlusOne: 1,
            monthPlusTwo: 2,
            quaterPlusOne: 3,
            quaterPlusTwo: 4,
            yearPlusOne: 5,
            yearPlusTwo: 6
        };
        const expected = [1, 2, 3, 4, 5, 6];

        const result = mapPreiseFuturesDtoToLineEntries([dto])[0];

        expect(result?.values).toStrictEqual(expected);
    });

    it('should map date correctly', () => {
        const dto: PreiseFuturesDto = {
            date: '2023-01-01',
            monthPlusOne: 1,
            monthPlusTwo: 2,
            quaterPlusOne: 3,
            quaterPlusTwo: 4,
            yearPlusOne: 5,
            yearPlusTwo: 6
        };

        const expected = new Date('2023-01-01');

        const result = mapPreiseFuturesDtoToLineEntries([dto])[0];

        expect(result?.date).toEqual(expected);
    });
});

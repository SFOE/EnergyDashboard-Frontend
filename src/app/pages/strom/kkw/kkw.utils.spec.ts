import { expect } from '@jest/globals';
import {
    StromKkwAusfall,
    StromKkwProductionEntry
} from '../../../services/strom/strom.model';
import { HistogramEntry } from '../../../shared/diagrams/histogram/base-histogram.model';
import { MockHistogramLineEntry } from '../../../test/histogram.fixture';
import {
    findKkwAusfallToHistogramEntry,
    findLatestProductionEntry
} from './kkw.utils';

describe('findKkwAusfallToHistogramEntry', () => {
    it('should map find correct ausfall', () => {
        const expected: StromKkwAusfall = {
            productionPlant: 'expected',
            startDate: new Date(2023, 0, 1),
            endDate: new Date(2023, 0, 2),
            wasPlanned: false,
            color: 'red'
        };

        const ausfaelle: StromKkwAusfall[] = [
            expected,
            {
                productionPlant: 'test',
                startDate: new Date(2023, 0, 3),
                endDate: new Date(2023, 0, 4),
                wasPlanned: true,
                color: 'red'
            },
            {
                productionPlant: 'test',
                startDate: new Date(2022, 11, 28),
                endDate: new Date(2022, 11, 31),
                wasPlanned: false,
                color: 'red'
            }
        ];

        // test start date is included
        let histogramEntry = <HistogramEntry>{
            date: new Date(2023, 0, 1)
        };
        let result = findKkwAusfallToHistogramEntry(histogramEntry, ausfaelle);
        expect(result).toEqual([expected]);

        // test end date is included
        histogramEntry = <HistogramEntry>{
            date: new Date(2023, 0, 2)
        };
        result = findKkwAusfallToHistogramEntry(histogramEntry, ausfaelle);
        expect(result).toEqual([expected]);
    });
});

describe('findLatestProductionEntry', () => {
    const latestEntry = <StromKkwProductionEntry>{
        date: new Date('2023-01-01'),
        values: [1, 2, 3]
    };

    it('should find latest entry', () => {
        const testEntries = [
            MockHistogramLineEntry({ dateOptions: { year: 2022 } }),
            MockHistogramLineEntry({ dateOptions: { year: 2022 } }),
            MockHistogramLineEntry({ dateOptions: { year: 2022 } }),
            latestEntry,
            <StromKkwProductionEntry>{
                date: new Date('2023-01-02'),
                values: [1, null]
            }
        ];

        const result = findLatestProductionEntry(testEntries);

        expect(result.date).toEqual(latestEntry.date);
        expect(result.values).toStrictEqual(latestEntry.values);
    });
});

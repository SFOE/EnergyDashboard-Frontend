import { expect } from '@jest/globals';
import { kkwColors } from '../../pages/strom/strom.consts';
import { dateWithoutTime } from '../../shared/static-utils/date-utils';
import {
    StromKkwAusfall,
    StromKkwAusfallDto,
    StromKkwProductionEntry,
    StromKkwProductionEntryDto,
    StromKkwVerfuegbarkeitEntry,
    StromKkwVerfuegbarkeitEntryDto
} from './strom.model';
import {
    mapStromKkwAusfaelle,
    mapStromKkwProductionDtoToEntry,
    mapStromKkwVerfuegbarkeitDtoToEntry
} from './strom.util';

describe('mapStromKkwProductionDtoToEntry', () => {
    it('should map dto correctly', () => {
        const expected = <StromKkwProductionEntry>{
            date: new Date('2023-01-01'),
            values: [15, 12],
            band: { lower: 10, upper: 20 },
            ausfaelle: []
        };

        const dto = <StromKkwProductionEntryDto>{
            date: '2023-01-01',
            currentProduction: 12,
            fiveYearMittelwert: 15,
            fiveYearMin: 10,
            fiveYearMax: 20
        };
        const result = mapStromKkwProductionDtoToEntry(dto);

        expect(result).toEqual(expected);
    });
});

describe('mapStromKkwVerfuegbarkeitDtoToEntry', () => {
    it('should map dto correctly', () => {
        const expected = <StromKkwVerfuegbarkeitEntry>{
            date: new Date('2023-01-01'),
            lineValues: [10],
            barValues: [20],
            ausfaelle: []
        };

        const dto = <StromKkwVerfuegbarkeitEntryDto>{
            date: '2023-01-01',
            currentVerfuegbarkeit: 20,
            fiveYearAverage: 10
        };
        const result = mapStromKkwVerfuegbarkeitDtoToEntry(dto);

        expect(result).toEqual(expected);
    });
});

describe('mapStromKkwAusfallToBlock', () => {
    it('should map planned ausfall correctly', () => {
        const expected = <StromKkwAusfall>{
            productionPlant: 'test',
            wasPlanned: true,
            startDate: dateWithoutTime('2023-01-01'),
            endDate: dateWithoutTime('2023-01-05'),
            color: kkwColors.COLOR_KKW_OUTAGE_PLANNED
        };

        const ausfaelle: StromKkwAusfallDto[] = [
            {
                productionPlant: 'test',
                startDate: '2023-01-01',
                endDate: '2023-01-05',
                wasPlanned: true
            }
        ];
        const result = mapStromKkwAusfaelle(ausfaelle)[0];

        expect(result).toEqual(expected);
    });

    it('should map unplanned ausfall correctly', () => {
        const expected = <StromKkwAusfall>{
            productionPlant: 'test',
            wasPlanned: false,
            startDate: dateWithoutTime('2023-01-01'),
            endDate: dateWithoutTime('2023-01-05'),
            color: kkwColors.COLOR_KKW_OUTAGE_UNPLANNED
        };

        const ausfaelle: StromKkwAusfallDto[] = [
            {
                productionPlant: 'test',
                startDate: '2023-01-01',
                endDate: '2023-01-05',
                wasPlanned: false
            }
        ];
        const result = mapStromKkwAusfaelle(ausfaelle)[0];

        expect(result).toEqual(expected);
    });

    it('should add one day to endDate if startDate equals endDate', () => {
        const expected = <StromKkwAusfall>{
            productionPlant: 'test',
            wasPlanned: false,
            startDate: dateWithoutTime('2023-01-01'),
            endDate: dateWithoutTime('2023-01-02'),
            color: kkwColors.COLOR_KKW_OUTAGE_UNPLANNED
        };

        const ausfaelle: StromKkwAusfallDto[] = [
            {
                productionPlant: 'test',
                startDate: '2023-01-01',
                endDate: '2023-01-01',
                wasPlanned: false
            }
        ];
        const result = mapStromKkwAusfaelle(ausfaelle)[0];

        expect(result).toEqual(expected);
    });
});

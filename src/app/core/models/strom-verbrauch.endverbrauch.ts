import { DateModel } from './base/date.model';
import { FiveYearWithDiffStatisticsModel } from './base/statisics.model';

export interface StromVerbrauchEndverbrauch
    extends DateModel,
        FiveYearWithDiffStatisticsModel {
    endverbrauch: number | null;
    prognoseMittelwert: number | null;
    prognoseMin: number | null;
    prognoseMax: number | null;
}

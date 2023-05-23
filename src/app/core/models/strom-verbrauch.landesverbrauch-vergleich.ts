import { DateModel } from './base/date.model';
import { FiveYearWithDiffStatisticsModel } from './base/statisics.model';

export interface StromVerbrauchLandesverbrauchVergleich
    extends DateModel,
        FiveYearWithDiffStatisticsModel {
    landesverbrauchSG: number | null;
    landesverbrauchBFE: number | null;
    landesverbrauchENTSOE: number | null;
}

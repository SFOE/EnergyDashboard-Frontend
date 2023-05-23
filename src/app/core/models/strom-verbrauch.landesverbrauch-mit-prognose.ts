import { DateModel } from './base/date.model';
import { FiveYearWithDiffStatisticsModel } from './base/statisics.model';
import { Trend, TrendRating } from './trend.enum';

export interface StromVerbrauchLandesverbrauchMitPrognoseApi {
    currentEntry: StromVerbrauchLandesverbrauchMitPrognoseCurrentEntryApi;
    entries: StromVerbrauchLandesverbrauchMitPrognoseEntryApi[];
}

export interface StromVerbrauchLandesverbrauchMitPrognoseCurrentEntryApi {
    landesverbrauchPrognose: number | null;
    landesverbrauchPrognoseInFiveDays: number | null;
    date: string;
    trend: Trend;
    trendRating: TrendRating;
}

export interface StromVerbrauchLandesverbrauchMitPrognoseEntryApi
    extends DateModel,
        FiveYearWithDiffStatisticsModel {
    landesverbrauch: number | null;
    landesverbrauchGeschaetzt: number | null;
    landesverbrauchPrognose: number | null;
}

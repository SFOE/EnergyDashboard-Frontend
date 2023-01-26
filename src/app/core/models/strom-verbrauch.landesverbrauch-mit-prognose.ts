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

export interface StromVerbrauchLandesverbrauchMitPrognoseEntryApi {
    landesverbrauch: number | null;
    landesverbrauchGeschaetzt: number | null;
    landesverbrauchPrognose: number | null;
    fiveYearMin: number;
    fiveYearMax: number;
    fiveYearMittelwert: number;
    date: string;
    differenzMittelwert: number | null;
    differenzMin: number | null;
    differenzMax: number | null;
}

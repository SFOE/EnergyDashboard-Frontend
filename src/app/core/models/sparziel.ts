import { Trend, TrendRating } from './trend.enum';

export interface SparzielZielDto {
    date: string;
    kumulierteMonatlicheEinsparungGWh: number;
    kumulierteEinsparungProzent: number;
    sparzielGWh: number;
    standSparzielProzent: number;
    standSparzielGeschaetztProzent: number;
    trend: Trend;
    trendRating: TrendRating;
}

export interface SparzielEntry {
    date: Date;
    kumulierteMonatlicheEinsparungGWh: number;
    kumulierteEinsparungProzent: number;
    sparzielGWh: number;
    standSparzielProzent: number;
    standSparzielGeschaetztProzent: number;
    trend: Trend;
    trendRating: TrendRating;
}

export interface SparzielAktuelleEinsparungDtoV2V3 {
    date: string;
    differenzMittelwertProzent: number;
    temperaturAbweichungNorm: number;
}

export interface SparzielAktuelleEinsparungEntryV2V3 {
    date: Date;
    differenzMittelwertProzent: number;
    temperaturAbweichungNorm: number;
}

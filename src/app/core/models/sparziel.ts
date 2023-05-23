import { DateModel } from './base/date.model';
import { Trend, TrendRating } from './trend.enum';

export interface SparzielZielDtoV4 {
    date: string;
    kumulierteMonatlicheEinsparungGWh: number;
    sparzielGWh: number;
    standSparzielProzent: number;
    standSparzielGemessenWitterungsbereinigtProzent: number;
    standSparzielGeschaetztProzent: number;
    trend: Trend;
    trendRating: TrendRating;
}

export interface SparzielEntry extends DateModel {
    kumulierteMonatlicheEinsparungGWh: number;
    sparzielGWh: number;
    standSparzielProzent: number;
    standSparzielGemessenWitterungsbereinigtProzent: number;
    standSparzielGeschaetztProzent: number;
    trend: Trend;
    trendRating: TrendRating;
}

export interface SparzielAktuelleEinsparungDtoV4 {
    date: string;
    differenzMittelwertProzent: number;
    isEstimation: boolean;
    temperaturAbweichungNorm: number;
    differenzMittelwertWitterungsbereinigtProzent: number;
}

export interface SparzielAktuelleEinsparungEntryV4 extends DateModel {
    differenzMittelwertProzent: number;
    isEstimation: boolean;
    temperaturAbweichungNorm: number;
    differenzMittelwertWitterungsbereinigtProzent: number;
}

export interface SparzielNachBereichProMonat extends DateModel {
    anteilPrivate: number;
    anteilKMU: number;
    anteilIndustrie: number;
    nationalSavingsPercent: number;
}

export interface SparzielNachBereichAktuellerMonat extends DateModel {
    anteilPrivate: number;
    anteilKMU: number;
    anteilIndustrie: number;
    nationalSavingsPercent: number;
    nationalSavingsMWh: number;
}

export interface SparzielZielNachBereichAktuellerMonat extends DateModel {
    anteilPrivate: number;
    anteilKMU: number;
    anteilIndustrie: number;
    nationalSavingsGWh: number;
}

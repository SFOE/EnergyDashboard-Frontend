import { DateModel } from './base/date.model';
import { Trend, TrendRating } from './trend.enum';


export interface SparzielZielDtoV5 {
    trend: Trend;
    date: string;
    trendRating: TrendRating;
    schaetzung: boolean;
    kumulierteEinsparungProzent: number;
    kumulierteEinsparungWitterungsbereinigtProzent: number;
    kumulierteEinsparungWitterungsbereinigtGwh: number;
    id: string;
    kumulierteMonatlicheEinsparungGWh: number;
}

export interface SparzielEntry extends DateModel {
    schaetzung: boolean;
    kumulierteEinsparungProzent: number;
    kumulierteEinsparungWitterungsbereinigtProzent: number;
    kumulierteEinsparungWitterungsbereinigtGwh: number;
    kumulierteMonatlicheEinsparungGWh: number;
    trend: Trend;
    trendRating: TrendRating;
}

export interface SparzielAktuelleEinsparungDtoV5 {
    date: string;
    differenzReferenzperiodeProzent: number;
    isEstimation: boolean;
    differenzReferenzperiodeWitterungsbereinigtProzent: number;
    differenzReferenzperiodeWitterungsbereingtProzentSchaetzung: boolean;
    differenzReferenzperiodeWitterungsbereingtLowerBound: number;
    differenzReferenzperiodeWitterungsbereingtUpperBound: number;
    temperaturAbweichungNorm: number;
}

export interface SparzielAktuelleEinsparungEntryV5 extends DateModel {
    differenzReferenzperiodeProzent: number;
    isEstimation: boolean;
    temperaturAbweichungNorm: number;
    differenzReferenzperiodeWitterungsbereinigtProzent: number;
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

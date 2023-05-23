import { Trend, TrendRating } from './trend.enum';

export interface DashboardEntryApi {
    value: number;
    trend: Trend;
    trendRating: TrendRating;
    date: string;
}

export interface DashboardEntryWithoutDateApi {
    value: number;
    trend: Trend;
    trendRating: TrendRating;
}

export interface DashboardEntryWithoutTrendApi {
    date: string;
    value: number;
}

export interface DashboardStrom {
    aktuellerVerbrauch: DashboardEntryApi;
    speicherfuellstand: DashboardEntryApi;
    gesamtProduktion: DashboardEntryApi;
    nettoImport: DashboardEntryApi;
    nettoExport: DashboardEntryApi;
}

export interface DashboardGas {
    aktuellerVerbrauch: DashboardEntryApi;
    fuellstandNachbarlaender: DashboardEntryApi;
    nettoImport: DashboardEntryApi;
    aktuelleGesamteinsparung: DashboardEntryApi;
}

type SortOrder = {
    [key: string]: number;
};

export const sortOrderDashboardGasData: SortOrder = {
    nettoImport: 1,
    aktuellerVerbrauch: 2,
    fuellstandNachbarlaender: 3,
    aktuelleGesamteinsparung: 4
};

export interface DashboardPriceDto {
    stromBoerse: DashboardEntryWithoutTrendApi;
    gasBoerse: DashboardEntryWithoutTrendApi;
    heizoelEntwicklung: DashboardEntryWithoutTrendApi;
    treibstoffBenzin: DashboardEntryWithoutTrendApi;
    treibstoffDiesel: DashboardEntryWithoutTrendApi;
    brennholzEndverbrauch: DashboardEntryWithoutTrendApi;
    fernwaermeEndverbrauch: DashboardEntryWithoutTrendApi;
}

export interface DashboardSpartipp {
    id: string;
    de: DashboardSpartippLangData;
    en: DashboardSpartippLangData;
    it: DashboardSpartippLangData;
    fr: DashboardSpartippLangData;
    image: string;
}

export interface DashboardSpartippLangData {
    title: string;
    text: string;
}

export interface DashboardSpartippDisplay extends DashboardSpartippLangData {
    imageUrl: string;
}

export interface DashboardWetterDto {
    aktuelleTemperatur: DashboardEntryWithoutTrendApi;
    prognoseTemperatur: DashboardEntryWithoutDateApi;
    niederschlaege: DashboardEntryApi;
    schneereserven: DashboardEntryApi;
}

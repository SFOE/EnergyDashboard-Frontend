import { Trend, TrendRating } from './trend.enum';

export interface DashboardKpiDto {
    value?: number;
    trend?: string;
    trendRating?: string;
    date: string;
}

export interface DashboardStromDto {
    aktuellerVerbrauch: DashboardKpiDto;
    speicherfuellstand: DashboardKpiDto;
    gesamtProduktion: DashboardKpiDto;
    nettoImport: DashboardKpiDto;
    nettoExport: DashboardKpiDto;
}

export interface DashboardKpiData {
    value?: number;
    trend?: string;
    trendRating?: string;
    date: Date;
}

export interface DashboardStromData {
    aktuellerVerbrauch: DashboardKpiDto;
    speicherfuellstand: DashboardKpiDto;
    gesamtProduktion: DashboardKpiData;
    nettoImport: DashboardKpiDto;
    nettoExport: DashboardKpiDto;
}

export interface DashboardGasDto {
    aktuellerVerbrauch: DashboardKpiDto;
    fuellstandNachbarlaender: DashboardKpiDto;
    nettoImport: DashboardKpiDto;
    aktuelleGesamteinsparung: DashboardKpiDto;
}

export interface DashboardGasData {
    aktuellerVerbrauch: DashboardKpiDto;
    fuellstandNachbarlaender: DashboardKpiDto;
    nettoImport: DashboardKpiDto;
    aktuelleGesamteinsparung: DashboardKpiDto;
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

export interface PriceDto {
    date: string;
    value: number;
}

export interface DashboardPriceDto {
    stromBoerse: PriceDto;
    gasBoerse: PriceDto;
    heizoelEntwicklung: PriceDto;
    treibstoffBenzin: PriceDto;
    treibstoffDiesel: PriceDto;
    brennholzEndverbrauch: PriceDto;
    fernwaermeEndverbrauch: PriceDto;
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
    aktuelleTemperatur: DashboardWetterTemperaturEntry;
    prognoseTemperatur: DashboardWetterTemperaturEntry;
    trend: DashboardWetterTrend;
}

export interface DashboardWetterTemperaturEntry {
    value: number;
    date: string;
}

export interface DashboardWetterTrend {
    trend: Trend;
    trendRating: TrendRating;
}

import { Trend, TrendRating } from './trend.enum';

export type FuellstandGasspeicherRegionCurrentEntry = {
    [key in FuellstandGasspeicherRegion]: FuellstandGasspeicherRegionCurrentEntryPerRegion;
};

type FuellstandGasspeicherRegionCurrentEntryPerRegion = {
    speicherstandProzent: number | null;
    speicherstandTwh: number | null;
    date: string;
    trend: Trend;
    trendRating: TrendRating;
};

export type FuellstandGasspeicherRegionWithChartEntries = {
    currentEntry: FuellstandGasspeicherRegionCurrentEntry;
    entries: FuellstandGasspeicherChartEntriesByRegion;
};

export interface FuellstandGasspeicherChartEntriesByRegion {
    [region: string]: FuellstandGasspeicher[];
}

export interface FuellstandGasspeicher {
    speicherstandProzent: number | null;
    speicherstandTWh: number | null;
    fiveYearMin: number;
    fiveYearMax: number;
    fiveYearMittelwert: number;
    date: Date;
    differenzMittelwert: number | null;
    differenzMin: number | null;
    differenzMax: number | null;
}

export enum FuellstandGasspeicherRegion {
    Austria = 'Austria',
    Germany = 'Germany',
    France = 'France',
    Italy = 'Italy',
    EU = 'EU'
}

import { DateModel } from '../base/date.model';
import { FiveYearWithDiffStatisticsModel } from '../base/statisics.model';
import { Trend, TrendRating } from '../trend.enum';

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

export interface FuellstandGasspeicher
    extends DateModel,
        FiveYearWithDiffStatisticsModel {
    speicherstandProzent: number | null;
    speicherstandTWh: number | null;
}

export enum FuellstandGasspeicherRegion {
    Austria = 'Austria',
    Germany = 'Germany',
    France = 'France',
    Italy = 'Italy',
    EU = 'EU'
}

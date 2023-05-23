import { Trend, TrendRating } from './trend.enum';

export interface WetterTemperaturTrend {
    trend: Trend;
    trendRating: TrendRating;
    values: {
        [station: string]: WetterTemperaturTrendEntry;
    };
}

export interface WetterTemperaturTrendEntry {
    lufttemperaturTagesmittel: number;
    date: string;
}

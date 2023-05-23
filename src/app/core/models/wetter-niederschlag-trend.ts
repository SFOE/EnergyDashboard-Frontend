import { Trend, TrendRating } from './trend.enum';

export interface WetterNiederschlagTrend {
    date: string;
    differenzZuNormProzent: number;
    trend: Trend;
    trendRating: TrendRating;
}

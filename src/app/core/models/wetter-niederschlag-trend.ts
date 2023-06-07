import { Trend, TrendRating } from './trend.enum';

export interface WetterNiederschlagTrend {
    date: string;
    niederschlagGemessen: number;
    trend: Trend;
    trendRating: TrendRating;
}

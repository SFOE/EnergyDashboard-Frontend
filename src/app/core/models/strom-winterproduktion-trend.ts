import { Trend, TrendRating } from './trend.enum';

export interface StromWinterproduktionTrend {
    importe: number;
    exporte: number;
    nettoimporte: number;
    trend: Trend;
    trendRating: TrendRating;
}

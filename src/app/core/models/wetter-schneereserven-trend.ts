import { DateModel } from './base/date.model';
import { Trend, TrendRating } from './trend.enum';

export interface WetterSchneereservenTrend extends DateModel {
    aktuellMm: number;
    trend: Trend;
    trendRating: TrendRating;
}

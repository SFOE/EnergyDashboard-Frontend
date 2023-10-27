import { DateModel } from './base/date.model';
import { Trend, TrendRating } from './trend.enum';

export interface WetterHeizgradtageTrend extends DateModel {
    messungPrognoseKumulativMittelwert: number;
    trend: Trend;
    trendRating: TrendRating;
}

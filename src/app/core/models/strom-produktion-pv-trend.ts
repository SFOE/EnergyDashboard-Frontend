import { Trend, TrendRating } from './trend.enum';
import { DateModel } from './base/date.model';

export interface StromProduktionPvTrend extends DateModel {
    stromProduktion: number;
    pvAnteil: number;
    trend: Trend;
    trendRating: TrendRating;
}

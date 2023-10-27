import { DateModel } from '../base/date.model';
import { Trend, TrendRating } from './../trend.enum';

export interface GasImportEuropaTrend extends DateModel {
    value: number;
    trend: Trend;
    rating: TrendRating;
}

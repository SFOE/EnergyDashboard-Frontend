import { Trend, TrendRating } from './trend.enum';

export interface PreiseStromEuropaTrend {
    id: string;
    date: string;
    value: number;
    trend: Trend;
    rating: TrendRating;
}

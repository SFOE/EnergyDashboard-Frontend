import { DateModel } from './base/date.model';
import { FiveYearWithDiffStatisticsModel } from './base/statisics.model';
import { HistogramAreaChartEntry } from './charts';
import { Trend, TrendRating } from './trend.enum';

export interface StromFuellstaendeSpeicherseenCurrentEntry {
    speicherstandProzent: number;
    trend: Trend;
    trendRating: TrendRating;
    date: string;
}

export interface StromFuellstaendeSpeicherseenEntry
    extends DateModel,
        FiveYearWithDiffStatisticsModel {
    speicherstandProzent: number;
    speicherstandGWh: number;
    speicherstandBei100ProzentInGWh: number;
    historicalMin: number | null;
    historicalMinWithReserves: number | null;
}

export interface StromFuellstaendeSpeicherseen {
    [region: string]: {
        currentEntry: StromFuellstaendeSpeicherseenCurrentEntry;
        entries: StromFuellstaendeSpeicherseenEntry[];
    };
}

export interface StromFuellstaendeChartEntriesByRegion {
    [region: string]: {
        latestEntry: StromFuellstaendeSpeicherseenCurrentEntry;
        entries: StromFuellstaendeChartHistogramAreaChartEntry[];
    };
}

export interface StromFuellstaendeChartHistogramAreaChartEntry
    extends HistogramAreaChartEntry {
    speicherstandBei100ProzentInGWh: number;
}

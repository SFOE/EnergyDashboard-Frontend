import { HistogramAreaChartEntry } from './charts';
import { Trend, TrendRating } from './trend.enum';

export interface StromFuellstaendeSpeicherseenCurrentEntry {
    speicherstandProzent: number;
    trend: Trend;
    trendRating: TrendRating;
    date: string;
}

export interface StromFuellstaendeSpeicherseenEntry {
    date: string;
    speicherstandProzent: number;
    speicherstandGWh: number;
    speicherstandBei100ProzentInGWh: number;
    fiveYearMax: number;
    fiveYearMin: number;
    fiveYearMittelwert: number;
    historicalMin: number | null;
    historicalMinWithReserves: number | null;
    differenzMittelwert: number;
    differenzMin: number;
    differenzMax: number;
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

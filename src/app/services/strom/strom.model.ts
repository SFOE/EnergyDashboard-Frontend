import { HistogramAreaChartEntry } from '../../core/models/charts';
import { Trend, TrendRating } from '../../core/models/trend.enum';

export interface StromProductionYearDto {
    kumuliertEigenproduktion: number;
    kumuliertKernkraft: number;
    kumuliertThermische: number;
    kumuliertFlusskraft: number;
    kumuliertSpeicherkraft: number;
    kumuliertWind: number;
    kumuliertPhotovoltaik: number;
    anteilKernkraft: number;
    anteilThermische: number;
    anteilFlusskraft: number;
    anteilSpeicherkraft: number;
    anteilWind: number;
    anteilPhotovoltaik: number;
}

export interface StromProductionDto {
    [yearOrDate: string]: StromProductionYearDto | string;
}

export interface StromProductionEntry extends StromProductionYearDto {
    year: number;
}

export interface StromProductionData {
    entries: StromProductionEntry[];
    lastUpdate?: Date;
}

export interface StromProductionImportVerbrauchEntry {
    datum: Date;
    stromverbrauch: number;
    kernkraft?: number;
    thermische?: number;
    flusskraft?: number;
    speicherkraft?: number;
    wind?: any;
    photovoltaik?: any;
    eigenproduktion: number;
    nettoimporte?: number;
}

export interface StromProductionImportVerbrauchTrend {
    datum: Date;
    eigenproduktion: number;
    trend: Trend;
    trendRating: TrendRating;
}

export interface StromProductionImportVerbrauchDto {
    currentEntry: {};
    entries: StromProductionImportVerbrauchEntry[];
}

export interface StromProductionImportVerbrauchData {
    trend: StromProductionImportVerbrauchTrend;
    chartAreaEntries: HistogramAreaChartEntry[];
    chartLineEntries: HistogramAreaChartEntry[];
}

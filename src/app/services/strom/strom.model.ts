import { DateModel } from '../../core/models/base/date.model';
import { FiveYearStatisticsModel } from '../../core/models/base/statisics.model';
import { HistogramAreaChartEntry } from '../../core/models/charts';
import { Trend, TrendRating } from '../../core/models/trend.enum';
import { Block } from '../../shared/diagrams/histogram/base-histogram.model';
import { HistogramDetailEntry } from '../../shared/diagrams/histogram/histogram-detail/histogram-detail.component';
import { HistogramLineEntry } from '../../shared/diagrams/histogram/histogram-line/histogram-line.component';

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

export interface StromProductionImportVerbrauchEntry extends DateModel {
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

export interface StromProductionImportVerbrauchTrend extends DateModel {
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

export interface StromKkwAusfallDto {
    productionPlant: string;
    startDate: string;
    endDate: string;
    wasPlanned: boolean;
}

export interface StromKkwAusfall extends Block {
    productionPlant?: string;
    count?: number;
    wasPlanned: boolean;
}

export interface StromKkwProductionEntryDto extends FiveYearStatisticsModel {
    date: string;
    currentProduction: number;
}

export interface StromKkwProductionDataDto {
    entries: StromKkwProductionEntryDto[];
    ausfaelle: StromKkwAusfallDto[];
}

export interface StromKkwProductionEntry extends HistogramLineEntry {
    ausfaelle?: StromKkwAusfall[];
}

export interface StromKkwProductionData {
    entries: StromKkwProductionEntry[];
    ausfaelle: StromKkwAusfall[];
}

export interface StromKkwVerfuegbarkeitDto {
    entries: StromKkwVerfuegbarkeitEntryDto[];
    ausfaelle: StromKkwAusfallDto[];
}

export interface StromKkwVerfuegbarkeitEntryDto {
    date: string;
    kkwInstallierteLeistung: number;
    ungeplanterAusfallMittelwert: number;
    geplanterAusfallMittelwert: number;
    kkwVerfuegbareLeistung: number;
}

export interface StromKkwVerfuegbarkeitData {
    entries: StromKkwVerfuegbarkeitEntry[];
    ausfaelle: StromKkwAusfall[];
}

export interface StromKkwVerfuegbarkeitEntry extends HistogramDetailEntry {
    ausfaelle: StromKkwAusfall[];
}

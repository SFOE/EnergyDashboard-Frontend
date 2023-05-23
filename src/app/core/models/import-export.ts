import { DateModel } from './base/date.model';
import { Trend, TrendRating } from './trend.enum';

export interface ImportExportEntry extends DateModel {
    import: ImportExportCountries;
    export: ImportExportCountries;
    nettoImportCH: number;
    trend: Trend;
    trendRating: TrendRating;
}

export interface ImportExportCountries {
    at: number;
    de: number;
    fr: number;
    it: number;
}

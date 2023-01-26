import { Trend, TrendRating } from './trend.enum';

export interface ImportExportEntry {
    datum: Date;
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

import { DateModel } from './base/date.model';
import { ImportExportEntry } from './import-export';

export interface StromImportExportNetto {
    currentEntry: ImportExportEntry;
    entries: StromImportExportNettoEntry[];
}

export interface StromImportExportNettoEntry extends DateModel {
    import: StromImportExportCountries;
    export: StromImportExportCountries;
}

export interface StromImportExportCountries {
    de: number;
    at: number;
    fr: number;
    it: number;
}

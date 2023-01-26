import { ImportExportEntry } from './import-export';

export interface StromImportExportNetto {
    currentEntry: ImportExportEntry;
    entries: StromImportExportNettoEntry[];
}

export interface StromImportExportNettoEntry {
    datum: Date;
    import: StromImportExportCountries;
    export: StromImportExportCountries;
}

export interface StromImportExportCountries {
    de: number;
    at: number;
    fr: number;
    it: number;
}

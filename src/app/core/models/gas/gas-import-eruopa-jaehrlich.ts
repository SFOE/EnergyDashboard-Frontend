interface GasImportEuropaJaehrlichValues {
    millM3: number;
    prozent: number;
    stand: string;
}

export interface GasImportEuropaJaehrlichAreas {
    Norway: GasImportEuropaJaehrlichValues;
    Algeria: GasImportEuropaJaehrlichValues;
    Russia: GasImportEuropaJaehrlichValues;
    Azerbaijan: GasImportEuropaJaehrlichValues;
    UK: GasImportEuropaJaehrlichValues;
    LNG: GasImportEuropaJaehrlichValues;
    Libya: GasImportEuropaJaehrlichValues;
}

export interface GasImportEuropaJaehrlichEntries {
    [yearOrDate: string]: GasImportEuropaJaehrlichAreas;
}

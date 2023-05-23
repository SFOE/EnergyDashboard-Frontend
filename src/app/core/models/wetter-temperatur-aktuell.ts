import { DateModel } from './base/date.model';

export interface WetterTemperaturAktuell {
    [station: string]: WetterTemperaturAktuellEntry[];
}

export interface WetterTemperaturAktuellEntry extends DateModel {
    lufttemperaturTagesmittel: number | null;
    lufttemperaturTagesmittelNorm: number;
    fiveYearMin: number;
    fiveYearMax: number;
    differenzNorm: number | null;
    differenzMin: number | null;
    differenzMax: number | null;
}

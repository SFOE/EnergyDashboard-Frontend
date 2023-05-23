import { DateModel } from './base/date.model';

export interface WetterTemperaturPrognose {
    [station: string]: WetterTemperaturPrognoseEntry[];
}

export interface WetterTemperaturPrognoseEntry extends DateModel {
    lufttemperaturPrognose: number | null;
    lufttemperaturTagesmittelNorm: number;
    fiveYearMin: number;
    fiveYearMax: number;
    differenzNorm: number | null;
    differenzMin: number | null;
    differenzMax: number | null;
}

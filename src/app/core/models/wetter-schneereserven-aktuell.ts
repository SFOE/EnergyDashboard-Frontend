import { DateModel } from './base/date.model';

export interface WetterSchneereservenAktuellEntry extends DateModel {
    fiveYearMin: number;
    fiveYearMittelwert: number;
    fiveYearMax: number;
    aktuellMm: number;
}

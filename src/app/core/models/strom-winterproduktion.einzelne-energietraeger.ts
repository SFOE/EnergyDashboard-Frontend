import { DateModel } from './base/date.model';

export interface StromWinterproduktionEinzelneEnergietraegerEntry
    extends DateModel {
    kernkraft: number;
    thermische: number;
    flusskraft: number | null;
    speicherkraft: number | null;
    wind: number | null;
    pv: number | null;
}

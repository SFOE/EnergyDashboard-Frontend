import { DateModel } from './base/date.model';

export interface WetterNiederschlagAktuell {
    entries: WetterNiederschlagAktuellEntry[];
}

export interface WetterNiederschlagAktuellEntry extends DateModel {
    niederschlagGemessen: number;
}

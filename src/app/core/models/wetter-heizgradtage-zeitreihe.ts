import { DateModel } from './base/date.model';

export interface WetterHeizgradtageZeitreiheEntry extends DateModel {
    normKumulativMin: number;
    normKumulativMittelwert: number;
    normKumulativMax: number;
    messungPrognoseKumulativMin: number;
    messungPrognoseKumulativMittelwert: number;
    messungPrognoseKumulativMax: number;
}

export interface WetterHeizgradtageZeitreihe {
    [station: string]: WetterHeizgradtageZeitreiheEntry[];
}

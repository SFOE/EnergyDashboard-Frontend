import { DateModel } from './base/date.model';
import { HistogramAreaChartEntry } from './charts';

export type Perspektive = 'ZERO_Basis' | 'ZERO_A' | 'ZERO_B' | 'ZERO_C' | 'WWB';
export type PerspektiveWithStatistik = Perspektive | 'Statistik';

export interface EnergieverbrauchMitPrognoseEntry extends DateModel {
    holz: number;
    wasser: number;
    abfaelle: number;
    kohle: number;
    erdoel: number;
    erdgas: number;
    nuclear: number;
    uebrigeErneuerbareEnergien: number;
    ptx: number;
    perspektive: PerspektiveWithStatistik;
}

export type EnergieverbrauchMitPrognoseDto = {
    [perspektive in Perspektive]: EnergieverbrauchMitPrognoseEntry[];
};

export type EnergieverbrauchMitPrognoseData = {
    [perspektive in Perspektive]: {
        chartAreaEntries: (HistogramAreaChartEntry & {
            perspektive: PerspektiveWithStatistik;
        })[];
    };
};

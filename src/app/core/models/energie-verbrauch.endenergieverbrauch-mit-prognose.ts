import { DateModel } from './base/date.model';
import { HistogramAreaChartEntry } from './charts';

export type Perspektive = 'ZERO_Basis' | 'ZERO_A' | 'ZERO_B' | 'ZERO_C' | 'WWB';
export type PerspektiveWithStatistik = Perspektive | 'Statistik';

export interface EndenergieverbrauchMitPrognoseEntry extends DateModel {
    abfaelle: number;
    date: Date;
    elektrizitaet: number;
    erdgas: number;
    erdoelprodukte: number;
    fernwaerme: number;
    holz: number;
    kohle: number;
    perspektive: PerspektiveWithStatistik;
    ptx: number;
    uebrigeErneuerbareEnergien: number;
}

export type EndenergieverbrauchMitPrognoseDto = {
    [perspektive in Perspektive]: EndenergieverbrauchMitPrognoseEntry[];
};

export type EndenergieverbrauchMitPrognoseData = {
    [perspektive in Perspektive]: {
        chartAreaEntries: (HistogramAreaChartEntry & {
            perspektive: PerspektiveWithStatistik;
        })[];
    };
};

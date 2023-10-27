import { DateModel } from '../../../core/models/base/date.model';

export interface HistogramEntry {
    date: Date;
}

export interface NoDataBlock<T> {
    from: number;
    to: number;
    items: T[];
}

export interface Band {
    upper: number;
    mean?: number;
    lower: number;
}

export interface HistogramBandEntry extends HistogramEntry {
    band?: Band | null;
}

export type LabelFilter = <T extends HistogramEntry>(
    value: T,
    index: number,
    arrayLength: number
) => boolean;

export type LabelFormatter = (d: Date) => string;

export interface LabelModifier {
    formatter: LabelFormatter;
    filter: LabelFilter;
}

export interface PointOfInterest extends DateModel {
    pointNumber: number;
}

export interface Block {
    startDate: Date;
    endDate: Date;
    color: string;
}

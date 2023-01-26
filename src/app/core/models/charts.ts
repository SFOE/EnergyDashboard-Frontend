import { HistogramLineEntry } from '../../shared/diagrams/histogram/histogram-line/histogram-line.component';

export interface HistogramAreaChartEntry extends HistogramLineEntry {
    tooltipInformation?: {
        differenzMittelwert: number | null;
        differenzMin: number | null;
        differenzMax: number | null;
    };
    absoluteValue?: number | null;
}

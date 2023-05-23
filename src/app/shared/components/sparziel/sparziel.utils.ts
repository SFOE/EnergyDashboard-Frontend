import { SparzielAktuelleEinsparungEntryV4 } from '../../../core/models/sparziel';
import { HistogramDetailEntry } from '../../diagrams/histogram/histogram-detail/histogram-detail.component';

export const mapAktuelleEinsparungEntryToHistogramEntry = (
    data: SparzielAktuelleEinsparungEntryV4[],
    sparzielPercentage: number
): HistogramDetailEntry[] => {
    return data.map((entry) => {
        let barValues: number[]; // contains 3 values: [not relevant for goal, measured & relevant for goal, projected (estimated) savings]
        if (!entry.isEstimation) {
            barValues = [entry.differenzMittelwertProzent, 0];
        } else {
            barValues = [0, entry.differenzMittelwertProzent];
        }
        return {
            date: entry.date,
            barValues: barValues,
            barLineValue: null,
            hiddenValues: [entry.differenzMittelwertWitterungsbereinigtProzent],
            lineValues: [-sparzielPercentage, 0, entry.temperaturAbweichungNorm]
        };
    });
};

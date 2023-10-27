import { SparzielAktuelleEinsparungEntryV5 } from '../../../core/models/sparziel';
import { HistogramDetailEntry } from '../../diagrams/histogram/histogram-detail/histogram-detail.component';

export const mapAktuelleEinsparungEntryToHistogramEntry = (
    data: SparzielAktuelleEinsparungEntryV5[],
    sparzielPercentage: number | null
): HistogramDetailEntry[] => {
    return data.map((entry) => {
        let barValues: number[]; // contains 3 values: [not relevant for goal, measured & relevant for goal, projected (estimated) savings]
        if (!entry.isEstimation) {
            barValues = [entry.differenzReferenzperiodeProzent, 0];
        } else {
            barValues = [0, entry.differenzReferenzperiodeProzent];
        }
        return {
            date: entry.date,
            barValues: barValues,
            barLineValue: null,
            hiddenValues: [
                entry.differenzReferenzperiodeWitterungsbereinigtProzent
            ],
            lineValues:
                sparzielPercentage === null
                    ? [0, entry.temperaturAbweichungNorm]
                    : [sparzielPercentage, 0, entry.temperaturAbweichungNorm]
        };
    });
};

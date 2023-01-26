import { SparzielAktuelleEinsparungEntryV2V3 } from '../../../core/models/sparziel';
import { HistogramDetailEntry } from '../../diagrams/histogram/histogram-detail/histogram-detail.component';
import { ArrayUtils } from '../../static-utils/array-utils';

export const mapAktuelleEinsparungEntryToHistogramEntry = (
    data: SparzielAktuelleEinsparungEntryV2V3[],
    sparzielPercentage: number,
    relevantCutoffDate: Date
): HistogramDetailEntry[] => {
    const lastNotEmptyIndex = ArrayUtils.findLastIndex(
        data,
        (entry) => entry.differenzMittelwertProzent !== 0
    );
    return data.map((entry, index) => {
        let barValues: number[] = []; // contains 3 values: [not relevant for goal, meassured & relevant for goal, projected savings]
        if (index === lastNotEmptyIndex) {
            barValues = [0, 0, entry.differenzMittelwertProzent];
        } else {
            const isEntryRelevant = entry.date >= relevantCutoffDate;
            barValues = isEntryRelevant
                ? [0, entry.differenzMittelwertProzent, 0]
                : [entry.differenzMittelwertProzent, 0, 0];
        }
        return {
            date: entry.date,
            barValues,
            lineValues: [-sparzielPercentage, 0, entry.temperaturAbweichungNorm]
        };
    });
};

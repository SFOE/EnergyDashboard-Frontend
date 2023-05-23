import {
    StromKkwAusfall,
    StromKkwProductionEntry
} from '../../../services/strom/strom.model';
import { HistogramEntry } from '../../../shared/diagrams/histogram/base-histogram.model';
import { ArrayUtils } from '../../../shared/static-utils/array-utils';
import { kkwColors } from '../strom.consts';

export const getAusfallColor = (planned: boolean) => {
    if (planned) {
        return kkwColors.COLOR_KKW_OUTAGE_PLANNED;
    }
    return kkwColors.COLOR_KKW_OUTAGE_UNPLANNED;
};

export const findKkwAusfallToHistogramEntry = (
    entry: HistogramEntry,
    ausfaelle: StromKkwAusfall[]
): StromKkwAusfall[] => {
    const uniqueRelevantAusfaelle: StromKkwAusfall[] = [];
    ausfaelle.forEach((ausfall) => {
        const isRelevant =
            ausfall.startDate.getTime() <= entry.date.getTime() &&
            ausfall.endDate.getTime() >= entry.date.getTime();
        const isUnique = !uniqueRelevantAusfaelle.some(
            (current) =>
                current.productionPlant === ausfall.productionPlant &&
                current.wasPlanned === ausfall.wasPlanned
        );
        if (isRelevant && isUnique) {
            uniqueRelevantAusfaelle.push(ausfall);
        }
    });
    return uniqueRelevantAusfaelle;
};

const countAusfallTypes = (
    ausfaelle: StromKkwAusfall[]
): {
    planned: number;
    unplanned: number;
} => {
    return ausfaelle.reduce(
        (accumulator, current) => {
            if (current.wasPlanned) {
                return { ...accumulator, planned: accumulator.planned + 1 };
            } else {
                return { ...accumulator, unplanned: accumulator.unplanned + 1 };
            }
        },
        {
            planned: 0,
            unplanned: 0
        }
    );
};

const createAusfallFromHistorgramEntry = (
    entry: HistogramEntry,
    count: number,
    wasPlanned: boolean
): StromKkwAusfall => ({
    startDate: entry.date,
    endDate: entry.date,
    count: count,
    wasPlanned: wasPlanned,
    color: getAusfallColor(wasPlanned)
});

export const aggregateAusfaelleToHistogramEntry = (
    entry: HistogramEntry,
    ausfaelle: StromKkwAusfall[]
): StromKkwAusfall[] => {
    const ausfaelleToEntry = findKkwAusfallToHistogramEntry(entry, ausfaelle);
    const aggregatedAusfaelle = [];
    const counts = countAusfallTypes(ausfaelleToEntry);
    if (counts.planned > 0) {
        aggregatedAusfaelle.push(
            createAusfallFromHistorgramEntry(entry, counts.planned, true)
        );
    }
    if (counts.unplanned > 0) {
        aggregatedAusfaelle.push(
            createAusfallFromHistorgramEntry(entry, counts.unplanned, false)
        );
    }

    return aggregatedAusfaelle;
};

export const findLatestProductionEntry = (
    entries: StromKkwProductionEntry[]
): StromKkwProductionEntry => {
    const index = ArrayUtils.findLastIndex(
        entries,
        (entry) => !!entry.values[1]
    );
    return entries[index];
};

export const findLatestProductionEntryDate = (
    entries: StromKkwProductionEntry[]
): Date => {
    return findLatestProductionEntry(entries).date;
};

import { PreiseFuturesDto } from '../../core/models/preise-futures.model';
import { PreiseIndexiert } from '../../core/models/preise-indexiert.model';
import { PreiseStromBoerse } from '../../core/models/preise-strom-boerse.model';
import { HistogramLineEntry } from '../../shared/diagrams/histogram/histogram-line/histogram-line.component';

export const mapPreiseStromBoerseToLineEntries = (
    entries: PreiseStromBoerse[]
): HistogramLineEntry[] => {
    return entries.map((entry) => ({
        values: [entry.preisEUR],
        date: new Date(entry.date)
    }));
};

export const mapPreiseIndexiertToLineEntries = (
    entries: PreiseIndexiert[]
): HistogramLineEntry[] => {
    return entries.map((entry) => ({
        values: [entry.preisIndexiert],
        date: new Date(entry.date)
    }));
};

export const mapPreiseFuturesDtoToLineEntries = (
    dtos: PreiseFuturesDto[]
): HistogramLineEntry[] =>
    dtos.map((dto) => ({
        date: new Date(dto.date),
        values: [
            dto.monthPlusOne,
            dto.monthPlusTwo,
            dto.quaterPlusOne,
            dto.quaterPlusTwo,
            dto.yearPlusOne,
            dto.yearPlusTwo
        ]
    }));

import { HistogramAreaChartEntry } from '../../core/models/charts';
import {
    StromFuellstaendeChartHistogramAreaChartEntry,
    StromFuellstaendeSpeicherseenEntry
} from '../../core/models/strom-fuellstaende-speicherseen';
import { StromImportExportHistoricalValue } from '../../core/models/strom-import-export.historical-values';
import { StromVerbrauchEndverbrauch } from '../../core/models/strom-verbrauch.endverbrauch';
import { StromVerbrauchLandesverbrauchMitPrognoseEntryApi } from '../../core/models/strom-verbrauch.landesverbrauch-mit-prognose';
import { StromVerbrauchLandesverbrauchVergleich } from '../../core/models/strom-verbrauch.landesverbrauch-vergleich';
import {
    aggregateAusfaelleToHistogramEntry,
    findKkwAusfallToHistogramEntry,
    getAusfallColor
} from '../../pages/strom/kkw/kkw.utils';
import { dateWithoutTime } from '../../shared/static-utils/date-utils';
import {
    StromKkwAusfall,
    StromKkwAusfallDto,
    StromKkwProductionEntry,
    StromKkwProductionEntryDto,
    StromProductionData,
    StromProductionDto,
    StromProductionEntry,
    StromProductionImportVerbrauchData,
    StromProductionImportVerbrauchDto,
    StromProductionYearDto
} from './strom.model';

export const mapSpeicherseeDtoToChartEntry = (
    dto: StromFuellstaendeSpeicherseenEntry
): StromFuellstaendeChartHistogramAreaChartEntry => {
    return {
        values: [
            dto.fiveYearMittelwert,
            dto.speicherstandProzent,
            dto.historicalMinWithReserves,
            dto.historicalMin,
            dto.fiveYearMax,
            dto.fiveYearMin
        ],
        date: new Date(dto.date),
        band: {
            upper: dto.fiveYearMax,
            lower: dto.fiveYearMin
        },
        tooltipInformation: {
            differenzMittelwert: dto.differenzMittelwert,
            differenzMin: dto.differenzMin,
            differenzMax: dto.differenzMax
        },
        absoluteValue: dto.speicherstandGWh,
        speicherstandBei100ProzentInGWh: dto.speicherstandBei100ProzentInGWh
    };
};

export const mapStromImportExportHistoricalValueToChartEntry = (
    dto: StromImportExportHistoricalValue
): HistogramAreaChartEntry => {
    return {
        values: [
            dto.fiveYearMittelwert,
            dto.nettoimport,
            dto.fiveYearMax,
            dto.fiveYearMin
        ],
        date: new Date(dto.date),
        band: {
            upper: dto.fiveYearMax,
            lower: dto.fiveYearMin
        },
        tooltipInformation: {
            differenzMittelwert: dto.differenzMittelwert,
            differenzMin: dto.differenzMin,
            differenzMax: dto.differenzMax
        }
    };
};

export const mapStromVerbrauchLandesverbrauchMitPrognoseToChartEntry = (
    data: StromVerbrauchLandesverbrauchMitPrognoseEntryApi[]
): HistogramAreaChartEntry[] => {
    return data.map((dto) => ({
        values: [
            dto.fiveYearMittelwert,
            dto.landesverbrauch,
            dto.landesverbrauchGeschaetzt,
            dto.landesverbrauchPrognose,
            dto.fiveYearMax,
            dto.fiveYearMin
        ],
        date: new Date(dto.date),
        band: {
            upper: dto.fiveYearMax,
            lower: dto.fiveYearMin
        },
        tooltipInformation: {
            differenzMittelwert: dto.differenzMittelwert,
            differenzMin: dto.differenzMin,
            differenzMax: dto.differenzMax
        }
    }));
};

export const mapStromVerbrauchEndverbrauchToChartEntries = (
    data: StromVerbrauchEndverbrauch[]
): HistogramAreaChartEntry[] => {
    return data.map((dto) => ({
        values: [
            dto.fiveYearMittelwert,
            dto.endverbrauch,
            dto.prognoseMittelwert,
            dto.fiveYearMax,
            dto.fiveYearMin
        ],
        date: new Date(dto.date),
        band: {
            upper: dto.fiveYearMax,
            lower: dto.fiveYearMin
        },
        tooltipInformation: {
            differenzMittelwert: dto.differenzMittelwert,
            differenzMin: dto.differenzMin,
            differenzMax: dto.differenzMax
        }
    }));
};

export const mapStromVerbrauchLandesverbrauchToChartEntries = (
    data: StromVerbrauchLandesverbrauchVergleich[]
): HistogramAreaChartEntry[] => {
    return data.map((dto) => ({
        values: [
            dto.fiveYearMittelwert,
            dto.landesverbrauchBFE,
            dto.landesverbrauchSG,
            dto.landesverbrauchENTSOE,
            dto.fiveYearMax,
            dto.fiveYearMin
        ],
        date: new Date(dto.date),
        band: {
            upper: dto.fiveYearMax,
            lower: dto.fiveYearMin
        },
        tooltipInformation: {
            differenzMittelwert: dto.differenzMittelwert,
            differenzMin: dto.differenzMin,
            differenzMax: dto.differenzMax
        }
    }));
};

export const mapStromProductionToEntry = (
    dto: StromProductionDto
): StromProductionData => {
    const entries: StromProductionEntry[] = [];
    let lastUpdate: Date | undefined;
    Object.entries(dto).forEach(([key, data]) => {
        // if it is a number
        if (!isNaN(+key)) {
            entries.push({ ...(data as StromProductionYearDto), year: +key });
        } else if (key === 'date') {
            lastUpdate = new Date(data as string);
        }
    });
    return {
        entries,
        lastUpdate
    };
};

export const mapStromProductionImportVerbrauchDto = (
    dto: StromProductionImportVerbrauchDto
) =>
    <StromProductionImportVerbrauchData>{
        trend: dto.currentEntry,
        chartAreaEntries: dto.entries.map(
            (entry) =>
                <HistogramAreaChartEntry>{
                    date: new Date(entry.date),
                    values: [
                        entry.flusskraft,
                        entry.kernkraft,
                        entry.photovoltaik,
                        entry.wind,
                        entry.speicherkraft,
                        entry.thermische,
                        entry.nettoimporte
                    ]
                }
        ),
        chartLineEntries: dto.entries.map(
            (entry) =>
                <HistogramAreaChartEntry>{
                    date: new Date(entry.date),
                    values: [entry.stromverbrauch]
                }
        )
    };

export const mapStromKkwProductionDtoToEntry = (
    dto: StromKkwProductionEntryDto,
    ausfaelle: StromKkwAusfall[] = [],
    aggregateAusfaelle: boolean = false
): StromKkwProductionEntry => {
    const date = new Date(dto.date);
    return {
        date,
        values: [dto.fiveYearMittelwert, dto.currentProduction], // add mittelwert first to draw current production line above the average line
        band: { lower: dto.fiveYearMin, upper: dto.fiveYearMax },
        ausfaelle: aggregateAusfaelle
            ? aggregateAusfaelleToHistogramEntry({ date }, ausfaelle)
            : findKkwAusfallToHistogramEntry({ date }, ausfaelle)
    };
};

export const mapStromKkwAusfaelle = (
    dtos: StromKkwAusfallDto[]
): StromKkwAusfall[] =>
    dtos.map((dto) => {
        const startDate = dateWithoutTime(dto.startDate);
        const endDate = dateWithoutTime(dto.endDate);
        /* add one day if start- and endDate or the same day,
        otherwise the ausfall is not displayed in the chart */
        if (startDate.getTime() === endDate.getTime()) {
            endDate.setDate(endDate.getDate() + 1);
        }

        return {
            startDate,
            endDate,
            productionPlant: dto.productionPlant,
            wasPlanned: dto.wasPlanned,
            color: getAusfallColor(dto.wasPlanned)
        };
    });

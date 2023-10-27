import { GasImportEuropaTaeglichEntry } from 'src/app/core/models/gas/gas-import-eruopa-taeglich';
import { HistogramAreaChartEntry } from '../../core/models/charts';
import { GasImportHistoricalValues } from '../../core/models/gas/gas-import.historical-values';
export const mapGasImportHistoricalValueToChartEntry = (
    dto: GasImportHistoricalValues
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

export const mapGasImportEuropaTaeglichToChartEntry = (
    data: GasImportEuropaTaeglichEntry
): HistogramAreaChartEntry => {
    return {
        values: [
            data.norway,
            data.algeria,
            data.russia,
            data.azerbaijan,
            data.uk,
            data.lng
        ],
        date: new Date(data.date)
        // band: {
        //     upper: data.upper,
        //     lower: data.lower
        // },
        // tooltipInformation: {
        //     differenzMittelwert: data.differenzMittelwert,
        //     differenzMin: data.differenzMin,
        //     differenzMax: data.differenzMax
        // }
    };
};

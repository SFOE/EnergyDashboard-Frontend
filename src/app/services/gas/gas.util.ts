import { HistogramAreaChartEntry } from '../../core/models/charts';
import { GasImportHistoricalValues } from '../../core/models/gas-import.historical-values';

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

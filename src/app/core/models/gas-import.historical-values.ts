import { FiveYearStatisticsModel } from './base/statisics.model';

export interface GasImportHistoricalValues extends FiveYearStatisticsModel {
    nettoimport: number | null;
    date: string;
    differenzMittelwert: number | null;
    differenzMin: number | null;
    differenzMax: number | null;
}

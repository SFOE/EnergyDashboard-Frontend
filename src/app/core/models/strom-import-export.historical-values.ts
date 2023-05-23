import { DateModel } from './base/date.model';
import { FiveYearWithDiffStatisticsModel } from './base/statisics.model';

export interface StromImportExportHistoricalValue
    extends DateModel,
        FiveYearWithDiffStatisticsModel {
    nettoimport: number | null;
}

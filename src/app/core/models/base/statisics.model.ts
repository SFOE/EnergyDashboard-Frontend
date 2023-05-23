export interface FiveYearStatisticsModel {
    fiveYearMin: number;
    fiveYearMittelwert: number;
    fiveYearMax: number;
}

export interface DiffStatisticsModel {
    differenzMittelwert: number | null;
    differenzMin: number | null;
    differenzMax: number | null;
}

export interface FiveYearWithDiffStatisticsModel
    extends FiveYearStatisticsModel,
        DiffStatisticsModel {}

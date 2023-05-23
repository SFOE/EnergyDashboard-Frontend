export interface StromsparzielFivePercentPeakHoursEntry {
    weekday: number;
    hour: number;
    savedPercent: number;
    anteilPrivate: number;
    anteilKMU: number;
    anteilIndustrie: number;
}

export interface StromsparzielFivePercentPeakHoursModel {
    year: number;
    month: number;
    peakDays: StromsparzielFivePercentPeakHoursEntry[];
}

export interface StromsparzielFivePercentEinsparungen {
    totalSavingsGWh: number;
    anteilPrivate: number;
    anteilKMU: number;
    anteilIndustrie: number;
}

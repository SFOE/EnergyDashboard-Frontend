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
    totalSavingKmuPercent: number;
    totalSavingPrivatPercent: number;
    totalSavingIndustriePercent: number;
    totalSavingsGWh: number;
    totalReferenceDemandGWh: number;
}

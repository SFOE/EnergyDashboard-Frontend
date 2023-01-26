export interface WetterTemperaturPrognose {
    [station: string]: WetterTemperaturPrognoseEntry[];
}

export interface WetterTemperaturPrognoseEntry {
    datum: string;
    lufttemperaturPrognose: number | null;
    lufttemperaturTagesmittelNorm: number;
    fiveYearMin: number;
    fiveYearMax: number;
    differenzNorm: number | null;
    differenzMin: number | null;
    differenzMax: number | null;
}

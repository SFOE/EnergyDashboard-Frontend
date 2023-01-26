export interface WetterTemperaturAktuell {
    [station: string]: WetterTemperaturAktuellEntry[];
}

export interface WetterTemperaturAktuellEntry {
    datum: string;
    lufttemperaturTagesmittel: number | null;
    lufttemperaturTagesmittelNorm: number;
    fiveYearMin: number;
    fiveYearMax: number;
    differenzNorm: number | null;
    differenzMin: number | null;
    differenzMax: number | null;
}

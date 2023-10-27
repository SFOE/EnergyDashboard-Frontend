import { DateModel } from '../base/date.model';

export interface GasImportEuropaTaeglichEntry extends DateModel {
    norway: number;
    algeria: number;
    russia: number;
    azerbaijan: number;
    uk: number;
    lng: number;
}

export interface GasImportEuropaTaeglich {
    [station: string]: GasImportEuropaTaeglichEntry[];
}

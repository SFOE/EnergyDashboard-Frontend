import { DateModel } from './base/date.model';

export interface WetterHeizgradtageTabelleDaten extends DateModel {
    observation: string;
    forecast: string;
    estimate: string;
}

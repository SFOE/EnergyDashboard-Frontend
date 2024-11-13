import { DateModel } from './base/date.model';

export interface StromProduktionPvEntry extends DateModel {
    stromProduktion: number;
    haushalteProJahr: number;
}

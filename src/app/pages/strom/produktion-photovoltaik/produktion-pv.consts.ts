import { COLORS_STROM } from '../../../shared/commons/colors.const';

export enum StromProduktionChartIndex {
    KERNKRAFT = 0,
    WIND = 1,
    FLUSSKRAFT = 2,
    THERMISCHE = 3,
    SPEICHERKRAFT = 4,
    PHOTOVOLTAIK = 5
}

export const StromProduktionColors = [
    COLORS_STROM.KERNKRAFT,
    COLORS_STROM.WIND,
    COLORS_STROM.FLUSSKRAFT,
    COLORS_STROM.THERMISCHE,
    COLORS_STROM.SPEICHERKRAFT,
    COLORS_STROM.PHOTOVOLTAIK
];

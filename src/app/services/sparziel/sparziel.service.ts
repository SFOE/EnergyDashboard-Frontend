import { Injectable } from '@angular/core';
import { Block } from '../../shared/diagrams/histogram/base-histogram.model';
import { COLOR_CHART_HISTOGRAM_AREA_SECONDARY_AREA } from '../../shared/commons/colors.const';

@Injectable({
    providedIn: 'root'
})
export class SparzielService {
    constructor() {}

    getRelevantMonthsForSparziel(): Block[] {
        let blocks: Block[] = [];

        // Relevant Months in Winter 2022 / 2023; Will need to be updated for the coming winter season
        blocks.push({
            startDate: new Date(2022, 10, 1), // 1. Oktober 2022
            endDate: new Date(2023, 4, 1), // 31. März 2023
            color: COLOR_CHART_HISTOGRAM_AREA_SECONDARY_AREA
        });

        return blocks;
    }
}

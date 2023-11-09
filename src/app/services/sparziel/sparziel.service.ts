import { Injectable } from '@angular/core';
import { COLOR_CHART_HISTOGRAM_AREA_SECONDARY_AREA } from '../../shared/commons/colors.const';
import { Block } from '../../shared/diagrams/histogram/base-histogram.model';

@Injectable({
    providedIn: 'root'
})
export class SparzielService {
    constructor() {}

    /**
     * Relevant Months (october until march) in Winter 2022 / 2023; Will need to be updated for the coming winter season
     * Includes full bars in chart for both october and march.
     * Different methods need to be used depending on whether the date is set on the first or last of the month.
     **/

    getRelevantMonthsForSparzielOnMonthEnd(): Block[] {
        return [
            {
                startDate: new Date(2023, 9, 15),
                endDate: new Date(2024, 3, 15),
                color: COLOR_CHART_HISTOGRAM_AREA_SECONDARY_AREA
            }
        ];
    }
}

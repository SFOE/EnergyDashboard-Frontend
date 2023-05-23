import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NumberUtils } from '../../../../../shared/static-utils/number-utils';
import {
    StromsparzielFivePercentPeakHoursEntry,
    StromsparzielFivePercentPeakHoursModel
} from '../../../../../core/models/strom-sparziel-five-percent.model';

@Component({
    selector: 'bfe-stromsparziel-five-percent-chart',
    templateUrl: './stromsparziel-five-percent-chart.component.html',
    styleUrls: ['./stromsparziel-five-percent-chart.component.scss']
})
export class StromsparzielFivePercentChartComponent implements OnChanges {
    @Input() data: StromsparzielFivePercentPeakHoursModel;
    @Input() hours: number[];

    processedEntries: StromsparzielFivePercentPeakHoursEntry[][] = [];
    maxPercentage: number = 0;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['data']) {
            const percentageValues: number[] = [];

            // Always add all 5 weekdays, even if the API didn't return all of them.
            for (let i = 0; i < 5; i++) {
                this.processedEntries[i] = [];
            }

            for (const curr of this.data.peakDays) {
                const index = curr.weekday; // assuming weekday values start from 0
                this.processedEntries[index].push(curr);

                percentageValues.push(Math.abs(curr.savedPercent));
            }

            this.setMaxPercentage(percentageValues);
        }
    }

    private setMaxPercentage(values: number[]): void {
        const maxValue = Math.max(...values);
        const roundedMaxValue = NumberUtils.roundUpToFive(
            maxValue % 5 === 0 ? maxValue + 5 : maxValue
        );

        if (this.maxPercentage < roundedMaxValue) {
            this.maxPercentage = roundedMaxValue;
        }
    }
}

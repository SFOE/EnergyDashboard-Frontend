import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'bfe-sparziel-chart',
    templateUrl: './sparziel-chart.component.html',
    styleUrls: ['./sparziel-chart.component.scss']
})
export class SparzielChartComponent implements OnChanges {
    @Input() achievedPercentage: number;
    @Input() projectedPercentage: number;
    @Input() weatherAdjustedPercent: number;
    @Input() sparzielLabelSubfix: string;
    @Input() achievedColor: string = 'blue';

    percentageToGo: number = 0;
    overarchievedPercentage: number = 0;
    calculatedAchievedPercentage: number = 0;
    calculatedProjectedPercentage: number = 0;

    get spaceToGoSizeLeft(): number {
        return this.projectedPercentage < 20
            ? this.percentageToGo + this.projectedPercentage - 20
            : this.percentageToGo;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (
            !!changes['achievedPercentage'] ||
            !!changes['projectedPercentage']
        ) {
            const projectedPlusAchieved =
                this.achievedPercentage + this.projectedPercentage;
            this.calculatedAchievedPercentage = Math.min(
                this.achievedPercentage,
                100
            );
            if (projectedPlusAchieved > 100) {
                this.percentageToGo = 0;
                this.overarchievedPercentage = projectedPlusAchieved - 100;
                this.calculatedProjectedPercentage =
                    100 - this.calculatedAchievedPercentage;
            } else {
                this.percentageToGo = 100 - projectedPlusAchieved;
                this.overarchievedPercentage = 0;
                this.calculatedProjectedPercentage = this.projectedPercentage;
            }
        }
    }
}

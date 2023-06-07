import { Component, OnInit } from '@angular/core';
import { StromService } from '../../../services/strom/strom.service';
import {
    COLOR_CONTEXT,
    COLOR_INDUSTRY,
    COLOR_KMU,
    COLOR_PRIVATE,
    StromsparzielFivePercentConsts
} from '../strom.consts';
import { StromsparzielFivePercentPeakHoursModel } from '../../../core/models/strom-sparziel-five-percent.model';
import { Trend, TrendRating } from '../../../core/models/trend.enum';
import { DiagramLegendEntry } from '../../../shared/diagrams/diagram-legend/diagram-legend.component';
import { getYesterday } from '../../../shared/static-utils/date-utils';

@Component({
    selector: 'bfe-stromstromsparziel-five-percent',
    templateUrl: './stromsparziel-five-percent.component.html',
    styleUrls: ['./stromsparziel-five-percent.component.scss']
})
export class StromsparzielFivePercentComponent implements OnInit {
    readonly primaryColor = COLOR_CONTEXT;

    private model: StromsparzielFivePercentPeakHoursModel[];

    modelBySelectedMonth: StromsparzielFivePercentPeakHoursModel;
    availableMonths: Date[];
    availableHours: number[];
    trend: Trend;
    trendRating: TrendRating;
    updatedDate = getYesterday();

    isLoading: boolean = true;

    readonly legendEntries: DiagramLegendEntry[] = [
        {
            color: COLOR_CONTEXT,
            labelKey: 'commons.sparziel.saved',
            type: 'area'
        },
        {
            color: StromsparzielFivePercentConsts.COLOR_CHART_MISSED_TARGET,
            labelKey: 'commons.sparziel.over',
            type: 'area'
        }
    ];

    constructor(private stromService: StromService) {}

    ngOnInit(): void {
        this.trend = Trend.NEUTRAL;
        this.trendRating = TrendRating.NEGATIV;

        this.stromService.getSparzielFivePercentPeakstunden().subscribe({
            next: (data) => {
                this.model = data;
                this.availableMonths = this.getAvailableMonths(data);
                this.onMonthChanged(this.availableMonths[0]);
                this.availableHours = this.getHours(this.model);
            },
            error: (error) => {
                console.error(error);
            },
            complete: () => {
                this.isLoading = false;
            }
        });
    }

    // Gets the month and year combinations from the values from the API, puts them in an array and sorts them.
    getAvailableMonths(arr: StromsparzielFivePercentPeakHoursModel[]): Date[] {
        const uniqueCombinations: Date[] = [];
        arr.forEach((item) => {
            const combination = { month: item.month - 1, year: item.year };
            if (
                !uniqueCombinations.some(
                    (value) =>
                        value.getMonth() === combination.month &&
                        value.getFullYear() === combination.year
                )
            ) {
                uniqueCombinations.push(
                    new Date(combination.year, combination.month, 1)
                );
            }
        });

        return uniqueCombinations.sort((a, b) => {
            const yearDiff = a.getFullYear() - b.getFullYear();
            if (yearDiff !== 0) {
                return yearDiff;
            }

            return a.getMonth() - b.getMonth();
        });
    }

    onMonthChanged(month: Date): void {
        this.modelBySelectedMonth = this.model
            .filter((item) => item.month - 1 == month.getMonth())
            .filter((item) => item.year == month.getFullYear())[0];
    }

    getHours(arr: StromsparzielFivePercentPeakHoursModel[]): number[] {
        const uniqueHours: number[] = [];

        arr.forEach((model) => {
            model.peakDays.forEach((entry) => {
                if (!uniqueHours.includes(entry.hour)) {
                    uniqueHours.push(entry.hour);
                }
            });
        });

        uniqueHours.sort((a, b) => a - b);
        return uniqueHours;
    }
}

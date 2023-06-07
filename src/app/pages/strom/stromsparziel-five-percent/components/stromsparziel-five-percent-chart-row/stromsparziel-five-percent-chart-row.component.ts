import { Component, HostListener, Input, OnInit } from '@angular/core';
import { weekdayToTranslationKey } from '../../../../../shared/static-utils/date-utils';
import { StromsparzielFivePercentPeakHoursEntry } from '../../../../../core/models/strom-sparziel-five-percent.model';

// At what screen widht shall we display the short weekday names
const SHORT_WEEKDAYS_SCREEN_BREAKPOINT = 1150;

@Component({
    selector: 'bfe-stromsparziel-five-percent-chart-row',
    templateUrl: './stromsparziel-five-percent-chart-row.component.html',
    styleUrls: ['./stromsparziel-five-percent-chart-row.component.scss']
})
export class StromsparzielFivePercentChartRowComponent implements OnInit {
    @Input() weekday: number;
    @Input() maxPercentage: number;
    @Input() entries: StromsparzielFivePercentPeakHoursEntry[];
    @Input() displayScale: boolean = false;
    @Input() numberOfElementsInHeight: number;

    weekdayKey: string;

    ngOnInit() {
        this.weekdayKey = weekdayToTranslationKey(
            this.weekday,
            window.innerWidth > SHORT_WEEKDAYS_SCREEN_BREAKPOINT
        );
    }

    calculateStackedBarWidth(percentage: number): string {
        const calculatedWidth =
            (Math.abs(percentage) / this.maxPercentage) * 100;
        return `width: ${calculatedWidth}%`;
    }

    isPositive(percentage: number): boolean {
        return percentage > 0;
    }

    getRange(value: number): number[] {
        return Array.from({ length: value }, (_, i) => i);
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: Event) {
        this.weekdayKey = weekdayToTranslationKey(
            this.weekday,
            window.innerWidth > 1150
        );
    }
}

import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges
} from '@angular/core';

@Component({
    selector: 'bfe-stromsparziel-five-percent-month-switch',
    templateUrl: './stromsparziel-five-percent-month-switch.component.html',
    styleUrls: ['./stromsparziel-five-percent-month-switch.component.scss']
})
export class StromsparzielFivePercentMonthSwitchComponent implements OnChanges {
    @Input() availableMonths: Date[];
    @Output() monthChanged: EventEmitter<Date> = new EventEmitter();

    currentIndex: number = 0;
    cardWidth = 140; // 120px width of the cards and 10px width margins on each side.
    visibleCards = 4;

    selectedMonth: Date;

    ngOnChanges(changes: SimpleChanges): void {
        // Selects the month closest to the current date.
        // The 'currentIndex' property just defines how many steps forwards the switcher has to take.
        // Meaning if the 'currentIndex' has a value of '2', it has the same effect as clicking two times on the forward-button
        if (!!changes['availableMonths']) {
            let selected = this.findClosestPastDate(this.availableMonths);
            let index = this.availableMonths.indexOf(selected) - 3;

            if (index > 0) {
                this.currentIndex = index;
            }

            this.selectedMonth = selected;
            this.changeSelectedMonth(selected);
        }
    }

    get maxIndex(): number {
        return this.availableMonths.length - this.visibleCards;
    }

    changeSelectedMonth(month: Date): void {
        this.selectedMonth = month;
        this.monthChanged.emit(month);
    }

    previous(): void {
        if (this.currentIndex > 0) {
            this.currentIndex--;
        } else {
            this.currentIndex = this.availableMonths.length - 4;
        }
    }

    next(): void {
        if (this.currentIndex < this.availableMonths.length - 4) {
            this.currentIndex++;
        } else {
            this.currentIndex = 0;
        }
    }

    findClosestPastDate(dates: Date[]): Date {
        const currentDate = new Date();
        let closestDate: Date | null = null;
        let minDifference = Number.POSITIVE_INFINITY;

        for (const date of dates) {
            const difference = currentDate.valueOf() - date.valueOf();

            // Update the closest date if the current date is closer to the current day
            if (difference < minDifference) {
                minDifference = difference;
                closestDate = date;
            }
        }

        return closestDate ?? new Date();
    }
}

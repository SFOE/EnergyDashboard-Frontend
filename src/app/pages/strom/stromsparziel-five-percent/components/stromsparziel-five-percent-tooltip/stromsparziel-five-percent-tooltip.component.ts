import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { weekdayToTranslationKey } from '../../../../../shared/static-utils/date-utils';
import { StromsparzielFivePercentPeakHoursEntry } from '../../../../../core/models/strom-sparziel-five-percent.model';
import {
    COLOR_CONTEXT,
    StromsparzielFivePercentConsts
} from '../../../strom.consts';

@Component({
    selector: 'bfe-stromsparziel-five-percent-tooltip',
    templateUrl: './stromsparziel-five-percent-tooltip.component.html',
    styleUrls: ['./stromsparziel-five-percent-tooltip.component.scss']
})
export class StromsparzielFivePercentTooltip implements OnChanges {
    @Input() data: StromsparzielFivePercentPeakHoursEntry;
    @Input() weekday: number;

    private goalMissed: boolean = false;

    dotClass: string;
    valueLabel: string;

    get weekdayKey(): string {
        return weekdayToTranslationKey(this.weekday);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!!changes['data']) {
            this.goalMissed = this.data.savedPercent > 0;
            this.setDotClass();
            this.setValueLabel();
        }
    }

    setValueLabel(): void {
        this.valueLabel = this.goalMissed
            ? 'commons.sparziel.over'
            : 'commons.sparziel.saved';
    }

    setDotClass(): void {
        this.dotClass = this.goalMissed ? 'dot dot-red' : 'dot dot-yellow';
    }

    getIconColor(value: number): string {
        if (value < 0) {
            return COLOR_CONTEXT;
        } else {
            return StromsparzielFivePercentConsts.COLOR_CHART_MISSED_TARGET;
        }
    }
}

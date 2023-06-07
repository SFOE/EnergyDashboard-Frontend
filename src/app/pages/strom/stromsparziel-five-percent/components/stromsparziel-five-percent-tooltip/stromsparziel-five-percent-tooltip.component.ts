import {
    AfterViewChecked,
    Component,
    ElementRef,
    Input,
    OnChanges,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import { weekdayToTranslationKey } from '../../../../../shared/static-utils/date-utils';
import { StromsparzielFivePercentPeakHoursEntry } from '../../../../../core/models/strom-sparziel-five-percent.model';
import {
    COLOR_CONTEXT,
    StromsparzielFivePercentConsts
} from '../../../strom.consts';

const TOOLTIP_POINT_OFFSET = 4;
const TOOLTIP_VIEWPORT_PADDING = 32; // minimal distance from the viewport end

@Component({
    selector: 'bfe-stromsparziel-five-percent-tooltip',
    templateUrl: './stromsparziel-five-percent-tooltip.component.html',
    styleUrls: ['./stromsparziel-five-percent-tooltip.component.scss']
})
export class StromsparzielFivePercentTooltip
    implements OnChanges, AfterViewChecked
{
    @Input() data: StromsparzielFivePercentPeakHoursEntry;
    @Input() weekday: number;
    private previousPositionOfTooltipSource: number;
    @ViewChild('tooltip') tooltip: ElementRef<HTMLDivElement>;

    private goalMissed: boolean = false;

    dotClass: string;
    valueLabel: string;

    get weekdayKey(): string {
        return weekdayToTranslationKey(this.weekday, true);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!!changes['data']) {
            this.goalMissed = this.data.savedPercent > 0;
            this.setDotClass();
            this.setValueLabel();
        }
    }

    ngAfterViewChecked(): void {
        // Only update the position of the tooltip if the previous position was smaller.
        // Angular always shifts it around a bit otherwise
        const x = this.tooltip.nativeElement.getBoundingClientRect().x;

        if (
            !(
                this.previousPositionOfTooltipSource === x ||
                this.previousPositionOfTooltipSource >= x
            )
        ) {
            this.previousPositionOfTooltipSource =
                this.tooltip.nativeElement.getBoundingClientRect().x;
            this.calculatePositionOfTooltip();
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

    private calculatePositionOfTooltip() {
        const tooltipElement = this.tooltip.nativeElement;

        const source = tooltipElement.getBoundingClientRect();
        // calculate how much space the tooltip takes up and decide which side to display it
        const viewportWidth = window.innerWidth;
        const remaingSpaceRight =
            viewportWidth -
            (source.x + tooltipElement.clientWidth + TOOLTIP_VIEWPORT_PADDING);
        const displayRight = remaingSpaceRight > 0;

        const tooltipXPosition = displayRight
            ? TOOLTIP_POINT_OFFSET
            : `-${tooltipElement.clientWidth - TOOLTIP_POINT_OFFSET}`;

        tooltipElement.style.left = `${tooltipXPosition}px`;
    }
}

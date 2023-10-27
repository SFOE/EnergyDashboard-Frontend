import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TranslationService } from '../../../../core/i18n/translation.service';
import { DiagramLegendEntry } from '../../../diagrams/diagram-legend/diagram-legend.component';
import {
    Block,
    LabelModifier
} from '../../../diagrams/histogram/base-histogram.model';
import { HistogramDetailEntry } from '../../../diagrams/histogram/histogram-detail/histogram-detail.component';
import { HistogramElFocusEvent } from '../../../diagrams/histogram/interactive-histogram.component';
import { LabelFilters, LabelFormatters } from '../../../diagrams/label.utils';

export interface SparzielHistogramChartModel {
    lastUpdate?: Date;
    data: HistogramDetailEntry[];
    barWidth: number;
    blocks: Block[];
    colors: {
        bars: string[];
        lines: string[];
    };
    legendEntries: DiagramLegendEntry[];
    titleDynamicKey: string;
    langtextDynamicKey: string;
    sparzielTarget: number | null;
}

const DOMAIN_MAX_PADDING = 5;
const DOMAIN_MIN_PADDING = -5;

@Component({
    selector: 'bfe-sparziel-histogram-chart',
    templateUrl: './sparziel-histogram-chart.component.html',
    styleUrls: ['./sparziel-histogram-chart.component.scss']
})
export class SparzielHistogramChartComponent implements OnChanges {
    @Input() model: SparzielHistogramChartModel;
    @Input() loading: boolean = false;
    @Input() hasSparziel: boolean = true;

    readonly xLabelModifier: LabelModifier;
    readonly xSubLabelModifier: LabelModifier;
    readonly yLabelFormatter;
    // hack to display POIs at the correct position in the chart
    readonly pointsOfInterest = [
        {
            date: new Date(2022, 2, 25),
            pointNumber: 1,
            labelKey: 'commons.points-of-interests.ukraine-war',
            overrideDateLabel: new Date(2022, 1, 24)
        },
        {
            date: new Date(2022, 8, 29),
            pointNumber: 2,
            labelKey: 'commons.points-of-interests.wespi',
            overrideDateLabel: new Date(2022, 7, 31)
        }
    ];

    tooltipEvent?: HistogramElFocusEvent<HistogramDetailEntry>;

    domainMax: number = DOMAIN_MAX_PADDING;
    domainMin: number = DOMAIN_MIN_PADDING;

    constructor(translationService: TranslationService) {
        this.xLabelModifier = {
            formatter: LabelFormatters.monthShort(translationService.language),
            filter: LabelFilters.everyNth(1, { excludeLast: false })
        };
        this.xSubLabelModifier = {
            formatter: LabelFormatters.yearFull(translationService.language),
            filter: LabelFilters.januaryAndDecember({
                excludeLast: true
            })
        };
        this.yLabelFormatter = (value: number) =>
            value >= 0 ? `+${value}%` : `${value}%  `;
    }

    showLineChartTooltip(event: HistogramElFocusEvent<HistogramDetailEntry>) {
        this.tooltipEvent = event;
    }

    hideTooltip(): void {
        this.tooltipEvent = undefined;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!!changes['model']) {
            this.domainMax = this.getDomainMax();
            this.domainMin = this.getDomainMin();
        }
    }

    private getDomainMax(): number {
        return (
            this.findInHistogramEntries(this.model.data, Math.max) +
            DOMAIN_MAX_PADDING
        );
    }

    private getDomainMin(): number {
        return (
            this.findInHistogramEntries(this.model.data, Math.min) +
            DOMAIN_MIN_PADDING
        );
    }

    private findInHistogramEntries = (
        entries: HistogramDetailEntry[],
        higherOrderFunction: (...args: number[]) => number
    ): number => {
        const values: number[] = entries
            .flatMap((entry) => [...entry.barValues, ...entry.lineValues])
            .filter((values) => !!values) as number[];
        return higherOrderFunction(...values);
    };
}

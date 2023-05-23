import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslationService } from '../../../../core/i18n/translation.service';
import { DiagramLegendEntry } from '../../../../shared/diagrams/diagram-legend/diagram-legend.component';
import { LabelModifier } from '../../../../shared/diagrams/histogram/base-histogram.model';
import { HistogramLineEntry } from '../../../../shared/diagrams/histogram/histogram-line/histogram-line.component';
import { HistogramElFocusEvent } from '../../../../shared/diagrams/histogram/interactive-histogram.component';
import {
    LabelFilters,
    LabelFormatters
} from '../../../../shared/diagrams/label.utils';

const legendKeys = [
    'dashboard.preise.common.futures.month-plus-one',
    'dashboard.preise.common.futures.month-plus-two',
    'dashboard.preise.common.futures.quarter-plus-one',
    'dashboard.preise.common.futures.quarter-plus-two',
    'dashboard.preise.common.futures.year-plus-one',
    'dashboard.preise.common.futures.year-plus-two'
];

@Component({
    selector: 'bfe-preise-futures-chart',
    templateUrl: './preise-futures-chart.component.html',
    styleUrls: ['./preise-futures-chart.component.scss']
})
export class PreiseFuturesChartComponent implements OnInit {
    @Input() chartData: Observable<HistogramLineEntry[]>;
    @Input() colors: string[];
    @Input() titleKey: string;
    @Input() langtextKey: string;

    data?: HistogramLineEntry[];
    isLoading: boolean = true;
    legendEntries: DiagramLegendEntry[] = [];
    tooltipEvent?: HistogramElFocusEvent<HistogramLineEntry>;

    xLabelModifier: LabelModifier;
    xSubLabelModifier: LabelModifier;
    yLabelFormatter = (value: number) => `${value} EUR`;

    get lastUpdated(): Date | string {
        if (this.data && this.data.length > 0) {
            return this.data[this.data.length - 1].date;
        }
        return '';
    }

    constructor(translationService: TranslationService) {
        this.xLabelModifier = {
            formatter: LabelFormatters.monthShort(translationService.language),
            filter: LabelFilters.everyNth(90)
        };
        this.xSubLabelModifier = {
            formatter: LabelFormatters.yearFull(translationService.language),
            filter: LabelFilters.none()
        };
    }

    ngOnInit() {
        this.chartData.subscribe((data) => {
            this.data = data;
            this.isLoading = false;
        });
        this.legendEntries = this.colors.map((color, index) => ({
            color,
            labelKey: legendKeys[index],
            type: 'line'
        }));
    }

    showTooltip(event: HistogramElFocusEvent<HistogramLineEntry>) {
        this.tooltipEvent = event;
    }

    hideTooltip(): void {
        this.tooltipEvent = undefined;
    }
}

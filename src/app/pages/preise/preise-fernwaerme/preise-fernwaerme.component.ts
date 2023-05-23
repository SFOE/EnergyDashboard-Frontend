import { Component, OnInit } from '@angular/core';
import { TranslationService } from '../../../core/i18n/translation.service';
import { HistogramAreaChartEntry } from '../../../core/models/charts';
import { Context } from '../../../core/models/context.enum';
import { PreiseService } from '../../../services/preise/preise.service';
import { COLOR_FERNWAERME } from '../../../shared/commons/colors.const';
import { DiagramLegendEntry } from '../../../shared/diagrams/diagram-legend/diagram-legend.component';
import { LabelModifier } from '../../../shared/diagrams/histogram/base-histogram.model';
import { HistogramLineEntry } from '../../../shared/diagrams/histogram/histogram-line/histogram-line.component';
import { HistogramElFocusEvent } from '../../../shared/diagrams/histogram/interactive-histogram.component';
import {
    LabelFilters,
    LabelFormatters
} from '../../../shared/diagrams/label.utils';

@Component({
    selector: 'bfe-preise-fernwaerme',
    templateUrl: './preise-fernwaerme.component.html',
    styleUrls: ['./preise-fernwaerme.component.scss']
})
export class PreiseFernwaermeComponent implements OnInit {
    readonly context = Context.FERNWAERME;
    readonly primaryColor = COLOR_FERNWAERME;

    readonly legendEntries: DiagramLegendEntry[] = [
        {
            color: this.primaryColor,
            labelKey: 'dashboard.preise.fernwaerme.legend.endverbrauch',
            type: 'line'
        }
    ];

    readonly labelModifier: LabelModifier;
    readonly subLabelModifier: LabelModifier;
    readonly yLabelFormatter;

    currentEntry: HistogramLineEntry;
    chartData: HistogramLineEntry[];
    isLoading = true;
    tooltipEvent?: HistogramElFocusEvent<HistogramLineEntry>;

    constructor(
        private preiseService: PreiseService,
        translationService: TranslationService
    ) {
        this.labelModifier = {
            formatter: LabelFormatters.monthShort(translationService.language),
            filter: LabelFilters.everyNth(6)
        };
        this.subLabelModifier = {
            formatter: LabelFormatters.yearFull(translationService.language),
            filter: LabelFilters.none()
        };
        this.yLabelFormatter = (value: number) => `${value}%`;
    }

    ngOnInit(): void {
        this.preiseService.getPreiseFernwaermeEndverbrauch().subscribe({
            next: (data) => {
                this.chartData = data;
                this.currentEntry = data[data.length - 1];
            },
            error: (error) => {
                console.error(error);
            },
            complete: () => {
                this.isLoading = false;
            }
        });
    }

    showLineChartTooltip(
        event: HistogramElFocusEvent<HistogramAreaChartEntry>
    ) {
        this.tooltipEvent = event;
    }

    hideTooltip(): void {
        this.tooltipEvent = undefined;
    }
}

import { Component, OnInit } from '@angular/core';
import { TranslationService } from '../../../core/i18n/translation.service';
import { HistogramAreaChartEntry } from '../../../core/models/charts';
import { Context } from '../../../core/models/context.enum';
import { PreiseService } from '../../../services/preise/preise.service';
import { COLOR_OEL } from '../../../shared/commons/colors.const';
import { DiagramLegendEntry } from '../../../shared/diagrams/diagram-legend/diagram-legend.component';
import { LabelModifier } from '../../../shared/diagrams/histogram/base-histogram.component';
import { HistogramLineEntry } from '../../../shared/diagrams/histogram/histogram-line/histogram-line.component';
import { HistogramElFocusEvent } from '../../../shared/diagrams/histogram/interactive-histogram.component';
import {
    LabelFilters,
    LabelFormatters
} from '../../../shared/diagrams/label.utils';

@Component({
    selector: 'bfe-preise-oel',
    templateUrl: './preise-oel.component.html',
    styleUrls: ['./preise-oel.component.scss']
})
export class PreiseOelComponent implements OnInit {
    readonly context = Context.OEL;
    readonly primaryColor = COLOR_OEL;
    readonly legendEntries: DiagramLegendEntry[] = [
        {
            color: this.primaryColor,
            labelKey: 'dashboard.preise.oel.legend.spotpreis-boerse',
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
        this.preiseService.getPreiseHeizoelEntwicklung().subscribe({
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

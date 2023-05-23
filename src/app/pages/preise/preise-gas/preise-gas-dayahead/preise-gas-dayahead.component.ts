import { Component, Input } from '@angular/core';
import { TranslationService } from '../../../../core/i18n/translation.service';
import { HistogramAreaChartEntry } from '../../../../core/models/charts';
import { COLOR_GAS } from '../../../../shared/commons/colors.const';
import { DiagramLegendEntry } from '../../../../shared/diagrams/diagram-legend/diagram-legend.component';
import { LabelModifier } from '../../../../shared/diagrams/histogram/base-histogram.model';
import { HistogramLineEntry } from '../../../../shared/diagrams/histogram/histogram-line/histogram-line.component';
import { HistogramElFocusEvent } from '../../../../shared/diagrams/histogram/interactive-histogram.component';
import {
    LabelFilters,
    LabelFormatters
} from '../../../../shared/diagrams/label.utils';

@Component({
    selector: 'bfe-preise-gas-dayahead',
    templateUrl: './preise-gas-dayahead.component.html',
    styleUrls: ['./preise-gas-dayahead.component.scss']
})
export class PreiseGasDayaheadComponent {
    readonly primaryColor = COLOR_GAS;
    readonly legendEntries: DiagramLegendEntry[] = [
        {
            color: this.primaryColor,
            labelKey: 'dashboard.preise.gas.legend.spotpreis-boerse',
            type: 'line'
        }
    ];
    readonly labelModifier: LabelModifier;
    readonly subLabelModifier: LabelModifier;
    readonly yLabelFormatter;
    tooltipEvent?: HistogramElFocusEvent<HistogramLineEntry>;

    @Input() currentEntry: HistogramLineEntry;
    @Input() chartData: HistogramLineEntry[];

    constructor(translationService: TranslationService) {
        this.labelModifier = {
            formatter: LabelFormatters.monthShort(translationService.language),
            filter: LabelFilters.everyNth(90)
        };
        this.subLabelModifier = {
            formatter: LabelFormatters.yearFull(translationService.language),
            filter: LabelFilters.none()
        };
        this.yLabelFormatter = (value: number) => `${value} EUR`;
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

import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ThousandCommaPipe } from 'src/app/shared/commons/thousand-comma.pipe';
import { TranslationService } from '../../../../core/i18n/translation.service';
import { HistogramAreaChartEntry } from '../../../../core/models/charts';
import { COLOR_GAS } from '../../../../shared/commons/colors.const';
import {
    BrushSelectionComponent,
    getDefaultBrushLabelModifier
} from '../../../../shared/components/brush-selection/brush-selection.component';
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
export class PreiseGasDayaheadComponent
    extends BrushSelectionComponent
    implements OnChanges
{
    readonly primaryColor = COLOR_GAS;
    readonly legendEntries: DiagramLegendEntry[] = [
        {
            color: this.primaryColor,
            labelKey: 'dashboard.preise.gas.legend.spotpreis-boerse',
            type: 'line'
        }
    ];
    readonly labelModifier: LabelModifier;
    readonly brushLabelModifier: LabelModifier;
    readonly subLabelModifier: LabelModifier;
    readonly yLabelFormatter;
    tooltipEvent?: HistogramElFocusEvent<HistogramLineEntry>;

    @Input() currentEntry: HistogramLineEntry;
    @Input() chartData: HistogramLineEntry[];
    filteredChartData: HistogramLineEntry[];

    constructor(translationService: TranslationService) {
        super();
        this.labelModifier = {
            formatter: LabelFormatters.monthShort(translationService.language),
            filter: LabelFilters.everyNth(90)
        };
        this.brushLabelModifier =
            getDefaultBrushLabelModifier(translationService);
        this.subLabelModifier = {
            formatter: LabelFormatters.yearFull(translationService.language),
            filter: LabelFilters.none()
        };
        const thousandComma = new ThousandCommaPipe();
        this.yLabelFormatter = (value: number) =>
            `${thousandComma.transform(value)} EUR`;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!!changes['chartData']) {
            this.initializeBrushSelection(this.chartData);
        }
    }

    override onBrushUpdated(): void {
        this.filteredChartData = this.filterEntriesByBrush(this.chartData);
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

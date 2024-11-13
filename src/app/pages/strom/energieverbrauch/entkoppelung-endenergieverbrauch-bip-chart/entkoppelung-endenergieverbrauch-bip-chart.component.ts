import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { HistogramLineEntry } from 'src/app/shared/diagrams/histogram/histogram-line/histogram-line.component';
import { TranslationService } from '../../../../core/i18n/translation.service';
import { HistogramAreaChartEntry } from '../../../../core/models/charts';
import { DiagramLegendEntry } from '../../../../shared/diagrams/diagram-legend/diagram-legend.component';
import { LabelModifier } from '../../../../shared/diagrams/histogram/base-histogram.model';
import { HistogramElFocusEvent } from '../../../../shared/diagrams/histogram/interactive-histogram.component';
import {
    LabelFilters,
    LabelFormatters
} from '../../../../shared/diagrams/label.utils';
import { getEnergieverbrauchLastUpdateDate } from '../energieverbrauch.utils';
import { COLORS_STROM_ENTKOPPELUNG } from './entkoppelung-endenergieverbrauch-bip.consts';

const TRANSLATION_KEY_PREFIX =
    'dashboard.strom.entkoppelung-endenergieverbrauch-bip';
const LEGEND_LABEL_KEYS = [
    'final-consumption',
    'heating-degree-days',
    'population',
    'bip'
];

@Component({
    selector: 'bfe-entkoppelung-endenergieverbrauch-bip-chart',
    templateUrl: './entkoppelung-endenergieverbrauch-bip-chart.component.html',
    styleUrls: ['./entkoppelung-endenergieverbrauch-bip-chart.component.scss']
})
export class EntkoppelungEndenergieverbrauchBipChartComponent
    implements OnInit, OnChanges
{
    @Input() chartData: HistogramLineEntry[] = [];
    @Input() baseYear: number;

    readonly labelModifier: LabelModifier;
    readonly lineChartColors = Object.values(COLORS_STROM_ENTKOPPELUNG);
    readonly legendEntries: DiagramLegendEntry[] = LEGEND_LABEL_KEYS.map(
        (label, i) => ({
            color: this.lineChartColors[i],
            labelKey: `${TRANSLATION_KEY_PREFIX}.${label}`,
            type: 'line'
        })
    );

    lastEntryDate: Date | null;
    lastUpdate?: Date;
    minYValue = 0;
    tooltipEvent?: HistogramElFocusEvent<HistogramLineEntry>;
    tooltipColors = this.legendEntries.map(({ color }) => color);
    tooltipLabels = this.legendEntries.map(({ labelKey }) => labelKey);

    constructor(translationService: TranslationService) {
        this.labelModifier = {
            formatter: LabelFormatters.yearFull(translationService.language),
            filter: LabelFilters.januaryAndDecember({ excludeLast: true })
        };
    }

    ngOnInit(): void {
        this.lastEntryDate = this.chartData.at(-1)?.date ?? null;
        this.lastUpdate = getEnergieverbrauchLastUpdateDate(
            this.lastEntryDate ?? new Date()
        );
    }

    ngOnChanges() {
        if (!this.chartData) return;

        this.setYAxisRange();
    }

    showLineChartTooltip(
        event: HistogramElFocusEvent<HistogramAreaChartEntry>
    ) {
        this.tooltipEvent = event;
    }

    hideTooltip(): void {
        this.tooltipEvent = undefined;
    }

    private setYAxisRange() {
        this.minYValue = Math.min(
            ...this.chartData.flatMap(
                ({ values }) =>
                    values.filter((value) => value != null) as number[]
            )
        );
    }
}

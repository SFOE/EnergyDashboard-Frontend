import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { TranslationService } from '../../../../core/i18n/translation.service';
import {
    StromKkwProductionData,
    StromKkwProductionEntry
} from '../../../../services/strom/strom.model';
import { DiagramLegendEntry } from '../../../../shared/diagrams/diagram-legend/diagram-legend.component';
import {
    Block,
    LabelModifier
} from '../../../../shared/diagrams/histogram/base-histogram.model';
import { HistogramElFocusEvent } from '../../../../shared/diagrams/histogram/interactive-histogram.component';
import {
    LabelFilters,
    LabelFormatters
} from '../../../../shared/diagrams/label.utils';
import { COLOR_CONTEXT, kkwColors } from '../../strom.consts';
import { findLatestProductionEntryDate } from '../kkw.utils';
import { ProductionChartTooltipData } from './kkw-production-chart-tooltip/kkw-production-chart-tooltip.component';

const baseLegendEntries: DiagramLegendEntry[] = [
    {
        color: kkwColors.COLOR_KKW_PRODUCTION_MINMAX,
        labelKey: 'commons.legend.five-year-min-max',
        type: 'area'
    },
    {
        color: kkwColors.COLOR_KKW_PRODUCTION_MITTELWERT,
        labelKey: 'commons.legend.five-year-average',
        type: 'line'
    },
    {
        color: kkwColors.COLOR_KKW_PRIMARY,
        labelKey: 'commons.legend.latest',
        type: 'line'
    }
];

const ausfaelleLegendEntries: DiagramLegendEntry[] = [
    {
        color: kkwColors.COLOR_KKW_OUTAGE_PLANNED,
        labelKey: 'dashboard.strom.kkw.outage.planned',
        type: 'area'
    },
    {
        color: kkwColors.COLOR_KKW_OUTAGE_UNPLANNED,
        labelKey: 'dashboard.strom.kkw.outage.unplanned',
        type: 'area'
    }
];

export interface KKWProductionChartModel {
    titleDynamicKey: string;
    kurztextDynamicKey?: string;
    chartData: Observable<StromKkwProductionData>;
    displayAusfaelleInBackground?: boolean;
}

@Component({
    selector: 'bfe-kkw-production-chart',
    templateUrl: './kkw-production-chart.component.html',
    styleUrls: ['./kkw-production-chart.component.scss']
})
export class KkwProductionChartComponent implements OnChanges {
    @Input() model: KKWProductionChartModel;

    readonly kkwColors = kkwColors;
    readonly lineColors = ['#CCCCCC', COLOR_CONTEXT];
    readonly xLabelModifier: LabelModifier;
    readonly xSubLabelModifier: LabelModifier;
    readonly yLabelFormatter = (value: number) => `${value} GWh`;

    isLoading: boolean = true;
    lastUpdate?: Date;
    legendEntries: DiagramLegendEntry[] = baseLegendEntries;
    chartData$: Observable<{
        entries: StromKkwProductionEntry[];
        ausfaelle: Block[];
    }>;
    displayAusfaelle: boolean = false;

    tooltipEvent?: HistogramElFocusEvent<ProductionChartTooltipData>;

    constructor(translationService: TranslationService) {
        this.xLabelModifier = {
            formatter: LabelFormatters.monthShort(translationService.language),
            filter: LabelFilters.firstOfMonthOnly({ excludeLast: true })
        };
        this.xSubLabelModifier = {
            formatter: LabelFormatters.yearFull(translationService.language),
            filter: LabelFilters.januaryAndDecember({
                excludeLast: true
            })
        };
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!!changes['model']) {
            this.chartData$ = this.model.chartData.pipe(
                tap((data) => {
                    this.isLoading = false;
                    this.lastUpdate = findLatestProductionEntryDate(
                        data.entries
                    );
                })
            );
            this.displayAusfaelle =
                this.model.displayAusfaelleInBackground ?? true;
            this.setLegendEntries();
        }
    }

    private setLegendEntries() {
        if (this.displayAusfaelle) {
            this.legendEntries = [
                ...baseLegendEntries,
                ...ausfaelleLegendEntries
            ];
        } else {
            this.legendEntries = baseLegendEntries;
        }
    }

    showTooltip(event: HistogramElFocusEvent<StromKkwProductionEntry>) {
        this.tooltipEvent = event;
    }

    hideTooltip(): void {
        this.tooltipEvent = undefined;
    }
}

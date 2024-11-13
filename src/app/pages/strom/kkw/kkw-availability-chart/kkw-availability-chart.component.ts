import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { TranslationService } from '../../../../core/i18n/translation.service';
import {
    StromKkwVerfuegbarkeitData,
    StromKkwVerfuegbarkeitEntry
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
import { kkwColors } from '../../strom.consts';
import { getYesterday } from '../../../../shared/static-utils/date-utils';
import { ThousandCommaPipe } from 'src/app/shared/commons/thousand-comma.pipe';

export interface KKWAvailabilityChartModel {
    titleDynamicKey: string;
    kurztextDynamicKey: string;
    chartData: Observable<StromKkwVerfuegbarkeitData>;
    displayAusfaelleInBackground?: boolean;
}

const baseLegendEntries: DiagramLegendEntry[] = [
    {
        color: kkwColors.COLOR_KKW_PRIMARY,
        labelKey: 'dashboard.strom.kkw.available-power',
        type: 'line'
    },
    {
        color: kkwColors.COLOR_KKW_INSTALLED_POWER,
        labelKey: 'dashboard.strom.kkw.max-power',
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

@Component({
    selector: 'bfe-kkw-availability-chart',
    templateUrl: './kkw-availability-chart.component.html',
    styleUrls: ['./kkw-availability-chart.component.scss']
})
export class KkwAvailabilityChartComponent implements OnChanges {
    @Input() model: KKWAvailabilityChartModel;

    readonly kkwColors = kkwColors;
    readonly xLabelModifier: LabelModifier;
    readonly xSubLabelModifier: LabelModifier;
    readonly yLabelFormatter;

    isLoading: boolean = true;

    legendEntries: DiagramLegendEntry[] = baseLegendEntries;
    chartData$: Observable<{
        entries: StromKkwVerfuegbarkeitEntry[];
        ausfaelle: Block[];
    }>;
    displayAusfaelle: boolean = false;
    domainMax: number = 0;

    lastUpdate: Date = getYesterday();

    tooltipEvent?: HistogramElFocusEvent<StromKkwVerfuegbarkeitEntry>;

    constructor(translationService: TranslationService) {
        this.xLabelModifier = {
            formatter: LabelFormatters.monthShort(translationService.language),
            filter: LabelFilters.firstOfMonthOnly({ excludeLast: false })
        };
        this.xSubLabelModifier = {
            formatter: LabelFormatters.yearFull(translationService.language),
            filter: LabelFilters.januaryAndDecember({
                excludeLast: true
            })
        };
        const thousandComma = new ThousandCommaPipe();
        this.yLabelFormatter = (value: number) =>
            `${thousandComma.transform(value)} MW`;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!!changes['model']) {
            this.chartData$ = this.model.chartData.pipe(
                tap((data) => {
                    this.isLoading = false;
                    this.setDomainMax(data);
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

    showTooltip(event: HistogramElFocusEvent<StromKkwVerfuegbarkeitEntry>) {
        this.tooltipEvent = event;
    }

    hideTooltip(): void {
        this.tooltipEvent = undefined;
    }

    setDomainMax(data: StromKkwVerfuegbarkeitData): void {
        if (!data?.entries) {
            this.domainMax = 0;
        }

        let highestValue = Number.NEGATIVE_INFINITY;

        for (const entry of data.entries) {
            const verfuegbareLeistung = entry.barValues[0] || 0;
            if (verfuegbareLeistung > highestValue) {
                highestValue = verfuegbareLeistung;
            }

            const installierteLeistung = entry.lineValues[0] || 0;
            if (installierteLeistung > highestValue) {
                highestValue = installierteLeistung;
            }
        }

        let nextThousand = Math.ceil(highestValue / 1000) * 1000;

        // If the next 1000 is less than 200 more, we give it another 1000.
        if (nextThousand - highestValue < 200) {
            this.domainMax = nextThousand + 1000;
        } else {
            this.domainMax = nextThousand;
        }
    }
}

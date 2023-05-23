import { Component, OnInit } from '@angular/core';
import { HistogramDetailEntry } from '../../../../shared/diagrams/histogram/histogram-detail/histogram-detail.component';
import { DiagramLegendEntry } from '../../../../shared/diagrams/diagram-legend/diagram-legend.component';
import {
    COLOR_CHART_HISTOGRAM_AREA_MIN_MAX_DOT,
    COLOR_CHART_HISTOGRAM_AREA_SECONDARY,
    COLOR_CHART_HISTOGRAM_AREA_SECONDARY_AREA,
    COLOR_POSITIVE
} from '../../../../shared/commons/colors.const';
import { COLOR_CONTEXT, COLOR_CONTEXT_SECONDARY } from '../../strom.consts';
import {
    Block,
    LabelModifier
} from '../../../../shared/diagrams/histogram/base-histogram.model';
import {
    LabelFilters,
    LabelFormatters
} from '../../../../shared/diagrams/label.utils';
import { TranslationService } from '../../../../core/i18n/translation.service';
import { HistogramElFocusEvent } from '../../../../shared/diagrams/histogram/interactive-histogram.component';
import { StromService } from '../../../../services/strom/strom.service';
import { SparzielNachBereichProMonat } from '../../../../core/models/sparziel';
import { SparzielService } from '../../../../services/sparziel/sparziel.service';
import { getYesterday } from '../../../../shared/static-utils/date-utils';

const DOMAIN_MAX_PADDING = 5;
const DOMAIN_MIN_PADDING = -5;
const SPARZIEL_PERCENTAGE = 10;

@Component({
    selector: 'bfe-stromsparziel-nach-bereich-pro-monat-histogram-chart',
    templateUrl:
        './stromsparziel-nach-bereich-pro-monat-histogram-chart.component.html',
    styleUrls: [
        './stromsparziel-nach-bereich-pro-monat-histogram-chart.component.scss'
    ]
})
export class StromsparzielNachBereichProMonatHistogramChartComponent
    implements OnInit
{
    isLoading: boolean = true;
    lastUpdate: Date = getYesterday();
    domainMax: number = DOMAIN_MAX_PADDING;
    domainMin: number = DOMAIN_MIN_PADDING;
    tooltipEvent?: HistogramElFocusEvent<HistogramDetailEntry>;

    data: SparzielNachBereichProMonat[];
    entries: HistogramDetailEntry[];
    blocks: Block[] = [];

    readonly sparzielTarget = SPARZIEL_PERCENTAGE;
    readonly xLabelModifier: LabelModifier;
    readonly xSubLabelModifier: LabelModifier;
    readonly yLabelFormatter;
    readonly barColors = [
        COLOR_CONTEXT_SECONDARY,
        COLOR_CONTEXT,
        COLOR_CHART_HISTOGRAM_AREA_SECONDARY
    ];
    readonly lineColors = [COLOR_POSITIVE, '#000000'];
    readonly barLineColor = COLOR_CHART_HISTOGRAM_AREA_MIN_MAX_DOT;

    readonly legendEntries: DiagramLegendEntry[] = [
        {
            color: COLOR_CONTEXT + '80', // add transparency to color, 80 is equal to 0.5 opacity
            labelKey: 'commons.sparziel.sectors.private',
            type: 'area'
        },
        {
            color: COLOR_CONTEXT,
            labelKey: 'commons.sparziel.sectors.kmu',
            type: 'area'
        },
        {
            color: COLOR_CHART_HISTOGRAM_AREA_SECONDARY,
            labelKey: 'commons.sparziel.sectors.industry',
            type: 'area'
        },
        {
            color: this.barLineColor,
            labelKey: 'commons.sparziel.netto-value',
            type: 'dashed-line'
        },
        {
            color: this.lineColors[0],
            labelKey: 'commons.sparziel.chart-legend.target',
            labelKeyOptions: { target: this.sparzielTarget },
            type: 'line'
        },
        {
            color: this.lineColors[1],
            labelKey: 'commons.sparziel.chart-legend.five-year-average',
            type: 'line'
        },
        {
            color: COLOR_CHART_HISTOGRAM_AREA_SECONDARY_AREA,
            labelKey: 'commons.sparziel.chart-legend.relevant-difference',
            type: 'area'
        }
    ];

    constructor(
        translationService: TranslationService,
        private stromService: StromService,
        private sparzielService: SparzielService
    ) {
        this.xLabelModifier = {
            formatter: LabelFormatters.monthShort(translationService.language),
            filter: LabelFilters.none()
        };
        this.xSubLabelModifier = {
            formatter: LabelFormatters.yearFull(translationService.language),
            filter: LabelFilters.januaryAndDecember({
                excludeLast: true
            })
        };
        this.yLabelFormatter = (value: number) =>
            value >= 0 ? `+${value}%` : `${value}%  `;

        this.blocks.push({
            startDate: new Date(2022, 9, 1),
            endDate: new Date(2023, 2, 31),
            color: COLOR_CHART_HISTOGRAM_AREA_SECONDARY_AREA
        });
    }

    ngOnInit(): void {
        this.stromService.getSparzielNachBereichProMonat().subscribe({
            next: (data) => {
                this.data = data;
                this.entries = this.mapHistogramEntries(this.data);

                this.domainMax = this.getDomainMax();
                this.domainMin = this.getDomainMin();
            },
            error: (error) => {
                console.error(error);
            },
            complete: () => {
                this.isLoading = false;
            }
        });
    }

    private getDomainMax(): number {
        const max = this.findInHistogramEntries(this.entries, Math.max);
        if (max <= 0) {
            return DOMAIN_MAX_PADDING;
        } else {
            return max + DOMAIN_MAX_PADDING;
        }
    }

    private getDomainMin(): number {
        return (
            this.findInHistogramEntries(this.entries, Math.min) +
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

    showLineChartTooltip(event: HistogramElFocusEvent<HistogramDetailEntry>) {
        this.tooltipEvent = event;
    }

    hideTooltip(): void {
        this.tooltipEvent = undefined;
    }

    mapHistogramEntries(data: SparzielNachBereichProMonat[]) {
        return data.map((current) => {
            return {
                date: current.date,
                barValues: [
                    current.anteilPrivate,
                    current.anteilKMU,
                    current.anteilIndustrie
                ],
                barLineValue: current.nationalSavingsPercent,
                hiddenValues: [],
                lineValues: [
                    -this.sparzielTarget,
                    0,
                    -Math.floor(Math.random() * 20)
                ]
            };
        });
    }
}

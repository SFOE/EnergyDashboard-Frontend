import { Component } from '@angular/core';
import { LabelModifier } from '../../../../shared/diagrams/histogram/base-histogram.model';
import {
    COLOR_CHART_HISTOGRAM_AREA_MIN_MAX_DOT,
    COLOR_CHART_HISTOGRAM_AREA_SECONDARY
} from '../../../../shared/commons/colors.const';
import { COLOR_CONTEXT, COLOR_CONTEXT_SECONDARY } from '../../strom.consts';
import { DiagramLegendEntry } from '../../../../shared/diagrams/diagram-legend/diagram-legend.component';
import {
    LabelFilters,
    LabelFormatters
} from '../../../../shared/diagrams/label.utils';
import { HistogramDetailEntry } from '../../../../shared/diagrams/histogram/histogram-detail/histogram-detail.component';
import { HistogramElFocusEvent } from '../../../../shared/diagrams/histogram/interactive-histogram.component';
import { StromService } from '../../../../services/strom/strom.service';
import { SparzielNachBereichAktuellerMonat } from '../../../../core/models/sparziel';

const DOMAIN_MAX_PADDING = 5;
const DOMAIN_MIN_PADDING = -5;
const SPARZIEL_PERCENTAGE = 10;

@Component({
    selector: 'bfe-stromsparziel-nach-bereich-aktueller-monat-histogram-chart',
    templateUrl:
        './stromsparziel-nach-bereich-aktueller-monat-histogram-chart.component.html',
    styleUrls: [
        './stromsparziel-nach-bereich-aktueller-monat-histogram-chart.component.scss'
    ]
})
export class StromsparzielNachBereichAktuellerMonatHistogramChartComponent {
    isLoading: boolean = true;
    lastUpdate: Date = new Date();
    domainMax: number = DOMAIN_MAX_PADDING;
    domainMin: number = DOMAIN_MIN_PADDING;
    tooltipEvent?: HistogramElFocusEvent<HistogramDetailEntry>;

    data: SparzielNachBereichAktuellerMonat[];
    entries: HistogramDetailEntry[];

    readonly sparzielTarget = SPARZIEL_PERCENTAGE;
    readonly xLabelModifier: LabelModifier;
    readonly yLabelFormatter;
    readonly barColors = [
        COLOR_CONTEXT_SECONDARY,
        COLOR_CONTEXT,
        COLOR_CHART_HISTOGRAM_AREA_SECONDARY
    ];
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
            color: 'grey',
            labelKey: 'commons.sparziel.missing',
            type: 'diagonal'
        }
    ];

    constructor(private stromService: StromService) {
        this.xLabelModifier = {
            formatter: LabelFormatters.day(),
            filter: LabelFilters.everyNth(5, { excludeLast: false })
        };
        this.yLabelFormatter = (value: number) =>
            value >= 0 ? `+${value}%` : `${value}%  `;
    }

    ngOnInit(): void {
        this.stromService.getSparzielNachBereichAktuellerMonat().subscribe({
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
        let maxSum = -Infinity;

        this.data.forEach((item) => {
            let currentSum = 0;

            if (item.anteilKMU > 0) {
                currentSum += item.anteilKMU;
            }

            if (item.anteilIndustrie > 0) {
                currentSum += item.anteilIndustrie;
            }

            if (item.anteilPrivate > 0) {
                currentSum += item.anteilPrivate;
            }

            if (currentSum > maxSum) {
                maxSum = currentSum;
            }
        });

        return maxSum + DOMAIN_MAX_PADDING;
    }

    private getDomainMin(): number {
        let minSum = Infinity;

        this.data.forEach((item) => {
            let currentSum = 0;

            if (item.anteilKMU < 0) {
                currentSum += item.anteilKMU;
            }

            if (item.anteilIndustrie < 0) {
                currentSum += item.anteilIndustrie;
            }

            if (item.anteilPrivate < 0) {
                currentSum += item.anteilPrivate;
            }

            if (currentSum < minSum) {
                minSum = currentSum;
            }
        });

        return minSum + DOMAIN_MIN_PADDING;
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

    mapHistogramEntries(data: SparzielNachBereichAktuellerMonat[]) {
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

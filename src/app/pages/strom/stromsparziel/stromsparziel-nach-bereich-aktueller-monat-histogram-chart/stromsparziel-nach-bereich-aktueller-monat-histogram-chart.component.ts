import { Component, HostListener } from '@angular/core';
import {
    Block,
    LabelModifier
} from '../../../../shared/diagrams/histogram/base-histogram.model';
import {
    COLOR_CHART_HISTOGRAM_AREA_MIN_MAX_DOT,
    COLOR_CHART_HISTOGRAM_AREA_SECONDARY,
    COLOR_CHART_HISTOGRAM_AREA_SECONDARY_AREA
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

const BAR_MEDIUM_WIDTH_SCREEN_BREAKPOINT = 800;
const BAR_LARGE_WIDTH_SCREEN_BREAKPOINT = 1000;

@Component({
    selector: 'bfe-stromsparziel-nach-bereich-aktueller-monat-histogram-chart',
    templateUrl:
        './stromsparziel-nach-bereich-aktueller-monat-histogram-chart.component.html',
    styleUrls: [
        './stromsparziel-nach-bereich-aktueller-monat-histogram-chart.component.scss'
    ]
})
export class StromsparzielNachBereichAktuellerMonatHistogramChartComponent {
    readonly sparzielTarget = 10;
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
        },
        {
            color: COLOR_CHART_HISTOGRAM_AREA_SECONDARY_AREA,
            labelKey:
                'commons.sparziel.chart-legend.current-month-1-till-today',
            type: 'area'
        }
    ];

    isLoading: boolean = true;
    lastUpdate: Date = new Date();
    domainMax: number = 5;
    domainMin: number = -5;
    barWidth: number = 16;
    tooltipEvent?: HistogramElFocusEvent<HistogramDetailEntry>;

    entries: HistogramDetailEntry[];
    blocks: Block[] = [];

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
                this.entries = this.mapHistogramEntries(data);

                this.domainMax = this.getDomainMax(data);
                this.domainMin = this.getDomainMin(data);

                this.setBarWidth();

                this.blocks.push({
                    startDate: this.getFirstDayOfCurrentMonth(),
                    endDate: this.getLastDateFromEntries(this.entries),
                    color: COLOR_CHART_HISTOGRAM_AREA_SECONDARY_AREA
                });
            },
            error: (error) => {
                console.error(error);
            },
            complete: () => {
                this.isLoading = false;
            }
        });
    }

    private getFirstDayOfCurrentMonth(): Date {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), 1);
    }

    private getLastDateFromEntries(objects: HistogramDetailEntry[]): Date {
        let highestDate: Date = objects[0].date;

        for (const obj of objects) {
            if (obj.date > highestDate) {
                highestDate = obj.date;
            }
        }

        return highestDate;
    }

    private getDomainMax(data: SparzielNachBereichAktuellerMonat[]): number {
        let maxSum = -Infinity;

        data.forEach((item) => {
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

    private getDomainMin(data: SparzielNachBereichAktuellerMonat[]): number {
        let minSum = Infinity;

        data.forEach((item) => {
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

    showTooltip(event: HistogramElFocusEvent<HistogramDetailEntry>) {
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
                lineValues: [-this.sparzielTarget, 0]
            };
        });
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: Event) {
        this.setBarWidth();
    }

    private setBarWidth() {
        if (window.innerWidth > BAR_LARGE_WIDTH_SCREEN_BREAKPOINT) {
            this.barWidth = 16;
        } else if (window.innerWidth > BAR_MEDIUM_WIDTH_SCREEN_BREAKPOINT) {
            this.barWidth = 12;
        } else {
            this.barWidth = 7;
        }
    }
}

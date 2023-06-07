import { Component, OnInit } from '@angular/core';
import { TranslationService } from '../../../../core/i18n/translation.service';
import { HistogramAreaChartEntry } from '../../../../core/models/charts';
import { StromService } from '../../../../services/strom/strom.service';
import {
    COLOR_STROM,
    COLORS_STROM
} from '../../../../shared/commons/colors.const';
import { LabelModifier } from '../../../../shared/diagrams/histogram/base-histogram.model';
import { HistogramElFocusEvent } from '../../../../shared/diagrams/histogram/interactive-histogram.component';
import {
    LabelFilters,
    LabelFormatters
} from '../../../../shared/diagrams/label.utils';
import { filterHistogramAreaEntryByDate } from '../../../../shared/diagrams/utils';
import { oneWeekInMilliseconds } from '../../../../shared/static-utils/date-utils';
import { ProduktionChartIndex } from './produktion-verbrauch-histogram-chart.consts';

const DOMAIN_MAX_PADDING = 5;

@Component({
    selector: 'bfe-produktion-verbrauch-histogram-chart',
    templateUrl: './produktion-verbrauch-histogram-chart.component.html',
    styleUrls: ['./produktion-verbrauch-histogram-chart.component.scss']
})
export class ProduktionVerbrauchHistogramChartComponent implements OnInit {
    chartData: {
        areaEntries: HistogramAreaChartEntry[];
        lineEntries: HistogramAreaChartEntry[];
    };
    tooltipEvent?: HistogramElFocusEvent<HistogramAreaChartEntry>;
    isLoading: boolean = true;
    domainMax: number;
    lastUpdate?: Date;

    readonly labelModifier: LabelModifier;
    readonly yLabelFormatter;
    readonly chartColors = [
        COLORS_STROM.FLUSSKRAFT,
        COLORS_STROM.KERNKRAFT,
        COLORS_STROM.PHOTOVOLTAIK,
        COLORS_STROM.WIND,
        COLORS_STROM.SPEICHERKRAFT,
        COLORS_STROM.THERMISCHE,
        COLOR_STROM // color for imports
    ];
    readonly chartIndex = ProduktionChartIndex;

    private readonly fourWeeksBackFromToday = new Date(
        Date.now() - oneWeekInMilliseconds * 4
    );

    constructor(
        private stromService: StromService,
        translationService: TranslationService
    ) {
        this.labelModifier = {
            formatter: LabelFormatters.monthAndDay(translationService.language),
            filter: LabelFilters.firstDayOfWeek()
        };
        this.yLabelFormatter = (value: number) => `${value} GWh`;
    }

    ngOnInit(): void {
        this.stromService
            .getStromProductionImportVerbrauch()
            .subscribe((data) => {
                this.lastUpdate = data.trend.date;
                this.chartData = {
                    areaEntries: filterHistogramAreaEntryByDate(
                        data.chartAreaEntries,
                        this.fourWeeksBackFromToday
                    ),
                    lineEntries: filterHistogramAreaEntryByDate(
                        data.chartLineEntries,
                        this.fourWeeksBackFromToday
                    )
                };

                this.domainMax = this.getDomainMax(this.chartData.areaEntries);
                this.isLoading = false;
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

    private getDomainMax(entries: HistogramAreaChartEntry[]): number {
        let maxSum: number = 0;

        for (const entry of entries) {
            if (entry.values) {
                const sum =
                    entry.values
                        .filter((e) => (e ?? 0) > 0)
                        .reduce((a, b) => (a ?? 0) + (b || 0), 0) ?? 0; // sum the array values, treating null as 0

                if (sum > maxSum) {
                    maxSum = sum;
                }
            }
        }

        maxSum += DOMAIN_MAX_PADDING;
        return maxSum;
    }
}

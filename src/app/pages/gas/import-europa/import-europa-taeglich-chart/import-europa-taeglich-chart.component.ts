import { Component, HostListener, OnInit } from '@angular/core';
import { TranslationService } from '../../../../core/i18n/translation.service';
import { HistogramAreaChartEntry } from '../../../../core/models/charts';
import { LabelModifier } from '../../../../shared/diagrams/histogram/base-histogram.model';
import { HistogramElFocusEvent } from '../../../../shared/diagrams/histogram/interactive-histogram.component';
import {
    LabelFilters,
    LabelFormatters
} from '../../../../shared/diagrams/label.utils';
import { filterHistogramAreaEntryByDate } from '../../../../shared/diagrams/utils';
import { oneWeekInMilliseconds } from '../../../../shared/static-utils/date-utils';
import {
    GasImportEuropaChartIndex,
    GasImportEuropaColors
} from '../import-europa.consts';

import { GasService } from '../../../../services/gas/gas.service';
const DOMAIN_MAX_PADDING = 5;

@Component({
    selector: 'bfe-gas-import-europa-taeglich-chart',
    templateUrl: './import-europa-taeglich-chart.component.html',
    styleUrls: ['./import-europa-taeglich-chart.component.scss']
})
export class GasImportEuropaTaeglichChartComponent implements OnInit {
    chartData: {
        areaEntries: HistogramAreaChartEntry[];
        lineEntries: HistogramAreaChartEntry[];
    };
    tooltipEvent?: HistogramElFocusEvent<HistogramAreaChartEntry>;
    isLoading: boolean = true;
    domainMax: number;
    lastUpdate?: Date;
    measuringUnit: string =
        this.translationService.returnTranslation('commons.unit.mioM3');

    readonly labelModifier: LabelModifier;
    readonly yLabelFormatter;
    readonly chartColors = GasImportEuropaColors;
    readonly chartIndex = GasImportEuropaChartIndex;

    barWidth: number = 22;

    constructor(
        private gasService: GasService,
        private translationService: TranslationService
    ) {
        this.labelModifier = {
            formatter: LabelFormatters.monthAndDay(translationService.language),
            filter: LabelFilters.firstDayOfWeek()
        };
        this.yLabelFormatter = (value: number) =>
            `${value} ${this.measuringUnit}`;
    }

    ngOnInit(): void {
        this.gasService.getGasImportEuropaTaeglich().subscribe({
            next: (data) => {
                this.lastUpdate = data[data.length - 1].date;

                this.chartData = {
                    areaEntries: filterHistogramAreaEntryByDate(
                        data,
                        this.getFourWeeksBackFromDate(this.lastUpdate)
                    ),
                    lineEntries: []
                };

                this.domainMax = this.getDomainMax(this.chartData.areaEntries);
                this.setBarWidth();
            },
            complete: () => (this.isLoading = false)
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

    private setBarWidth() {
        if (window.innerWidth > 1000) {
            this.barWidth = 22;
        } else {
            this.barWidth = 14;
        }
    }
    getFourWeeksBackFromDate(date: Date) {
        return new Date(new Date(date).getTime() - oneWeekInMilliseconds * 4);
    }
    @HostListener('window:resize', ['$event'])
    onResize(event: Event) {
        this.setBarWidth();
    }
}

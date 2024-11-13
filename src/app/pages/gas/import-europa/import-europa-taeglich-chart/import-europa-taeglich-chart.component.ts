import { Component, HostListener, OnInit } from '@angular/core';
import { TranslationService } from '../../../../core/i18n/translation.service';
import { HistogramAreaChartEntry } from '../../../../core/models/charts';
import { LabelModifier } from '../../../../shared/diagrams/histogram/base-histogram.model';
import { HistogramElFocusEvent } from '../../../../shared/diagrams/histogram/interactive-histogram.component';
import {
    LabelFilters,
    LabelFormatters
} from '../../../../shared/diagrams/label.utils';
import { oneWeekInMilliseconds } from '../../../../shared/static-utils/date-utils';
import {
    GasImportEuropaChartIndex,
    GasImportEuropaColors
} from '../import-europa.consts';

import { differenceInDays } from 'date-fns';
import { ThousandCommaPipe } from 'src/app/shared/commons/thousand-comma.pipe';
import {
    BrushSelectionComponent,
    getDefaultBrushLabelModifier
} from 'src/app/shared/components/brush-selection/brush-selection.component';
import { GasService } from '../../../../services/gas/gas.service';

const DOMAIN_MAX_PADDING = 5;
const EXTENDED_LABEL_MIN_DAYS = 84;

@Component({
    selector: 'bfe-gas-import-europa-taeglich-chart',
    templateUrl: './import-europa-taeglich-chart.component.html',
    styleUrls: ['./import-europa-taeglich-chart.component.scss']
})
export class GasImportEuropaTaeglichChartComponent
    extends BrushSelectionComponent
    implements OnInit
{
    chartData: {
        areaEntries: HistogramAreaChartEntry[];
        lineEntries: HistogramAreaChartEntry[];
        filteredAreaEntries: HistogramAreaChartEntry[];
        filteredLineEntries: HistogramAreaChartEntry[];
    };
    tooltipEvent?: HistogramElFocusEvent<HistogramAreaChartEntry>;
    isLoading: boolean = true;
    domainMax: number;
    lastUpdate?: Date;
    measuringUnit: string =
        this.translationService.returnTranslation('commons.unit.mioM3');
    labelModifier: LabelModifier;
    subLabelModifier?: LabelModifier;
    readonly brushLabelModifier: LabelModifier;
    readonly yLabelFormatter;
    readonly chartColors = GasImportEuropaColors;
    readonly chartIndex = GasImportEuropaChartIndex;

    barWidth: number = 22;

    constructor(
        private gasService: GasService,
        private translationService: TranslationService
    ) {
        super();
        this.labelModifier = {
            formatter: LabelFormatters.monthAndDay(translationService.language),
            filter: LabelFilters.firstDayOfWeek()
        };
        this.brushLabelModifier =
            getDefaultBrushLabelModifier(translationService);
        const thousandComma = new ThousandCommaPipe();
        this.yLabelFormatter = (value: number) =>
            `${thousandComma.transform(value)} ${this.measuringUnit}`;
    }

    ngOnInit(): void {
        this.gasService.getGasImportEuropaTaeglich().subscribe({
            next: (data) => {
                this.lastUpdate = data[data.length - 1].date;

                this.chartData = {
                    areaEntries: data,
                    lineEntries: [],
                    filteredAreaEntries: [],
                    filteredLineEntries: []
                };

                this.domainMax = this.getDomainMax(this.chartData.areaEntries);
                this.setBarWidth();
                const brushSelectionStart = this.getFourWeeksBackFromDate(
                    this.lastUpdate
                );
                this.initializeBrushSelection(
                    this.chartData.areaEntries,
                    brushSelectionStart
                );
            },
            complete: () => (this.isLoading = false)
        });
    }

    override onBrushUpdated(): void {
        this.chartData.filteredAreaEntries = this.filterEntriesByBrush(
            this.chartData.areaEntries
        );

        const { labelModifier, subLabelModifier } = this.getLabelModifiers();
        this.labelModifier = labelModifier;
        this.subLabelModifier = subLabelModifier;
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

    private getFourWeeksBackFromDate(date: Date) {
        return new Date(new Date(date).getTime() - oneWeekInMilliseconds * 4);
    }

    private getLabelModifiers(): {
        labelModifier: LabelModifier;
        subLabelModifier?: LabelModifier;
    } {
        const { start, end } = this.brushSelection;
        const data = this.chartData.filteredAreaEntries;
        const lang = this.translationService.language;
        const useExtendedLabel =
            differenceInDays(end, start) > EXTENDED_LABEL_MIN_DAYS;

        const labelModifier = useExtendedLabel
            ? {
                  formatter: LabelFormatters.firstOfMonthOnly(data, lang),
                  filter: LabelFilters.firstOfMonthOnly({
                      excludeFirst: true,
                      excludeLast: true
                  })
              }
            : {
                  formatter: LabelFormatters.monthAndDay(lang),
                  filter: LabelFilters.firstDayOfWeek()
              };

        const subLabelModifier = useExtendedLabel
            ? {
                  formatter: LabelFormatters.yearFull(lang),
                  filter: LabelFilters.januaryAndDecember()
              }
            : undefined;

        return { labelModifier, subLabelModifier };
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: Event) {
        this.setBarWidth();
    }
}

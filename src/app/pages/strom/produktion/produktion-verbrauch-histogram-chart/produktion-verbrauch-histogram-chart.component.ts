import { Component, OnInit } from '@angular/core';
import { differenceInDays } from 'date-fns';
import { ThousandCommaPipe } from 'src/app/shared/commons/thousand-comma.pipe';
import {
    BrushSelectionComponent,
    getDefaultBrushLabelModifier
} from 'src/app/shared/components/brush-selection/brush-selection.component';
import { filterHistogramAreaEntryByDate } from 'src/app/shared/diagrams/utils';
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
import {
    getYearsAgo,
    oneWeekInMilliseconds
} from '../../../../shared/static-utils/date-utils';
import { ProduktionChartIndex } from './produktion-verbrauch-histogram-chart.consts';

const DOMAIN_MAX_PADDING = 5;
const EXTENDED_LABEL_MIN_DAYS = 84;

@Component({
    selector: 'bfe-produktion-verbrauch-histogram-chart',
    templateUrl: './produktion-verbrauch-histogram-chart.component.html',
    styleUrls: ['./produktion-verbrauch-histogram-chart.component.scss']
})
export class ProduktionVerbrauchHistogramChartComponent
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
    labelModifier: LabelModifier;
    subLabelModifier?: LabelModifier;

    readonly brushLabelModifier: LabelModifier;
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
    private readonly fiveYearsBackFromToday = getYearsAgo(5);

    constructor(
        private stromService: StromService,
        private translationService: TranslationService
    ) {
        super();
        this.brushLabelModifier =
            getDefaultBrushLabelModifier(translationService);
        const thousandComma = new ThousandCommaPipe();
        this.yLabelFormatter = (value: number) =>
            `${thousandComma.transform(value)} GWh`;
    }

    ngOnInit(): void {
        this.stromService
            .getStromProductionImportVerbrauch()
            .subscribe((data) => {
                this.lastUpdate = data.trend.date;
                this.chartData = {
                    areaEntries: filterHistogramAreaEntryByDate(
                        data.chartAreaEntries,
                        this.fiveYearsBackFromToday
                    ),
                    lineEntries: filterHistogramAreaEntryByDate(
                        data.chartLineEntries,
                        this.fiveYearsBackFromToday
                    ),
                    filteredAreaEntries: [],
                    filteredLineEntries: []
                };
                this.domainMax = this.getDomainMax(this.chartData.areaEntries);

                this.initializeBrushSelection(
                    this.chartData.lineEntries,
                    this.fourWeeksBackFromToday
                );
                this.isLoading = false;
            });
    }

    override onBrushUpdated(): void {
        this.chartData.filteredAreaEntries = this.filterEntriesByBrush(
            this.chartData.areaEntries
        );
        this.chartData.filteredLineEntries = this.filterEntriesByBrush(
            this.chartData.lineEntries
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
}

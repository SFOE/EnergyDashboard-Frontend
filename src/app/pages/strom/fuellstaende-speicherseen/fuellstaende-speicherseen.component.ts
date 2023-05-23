import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslationService } from '../../../core/i18n/translation.service';
import {
    StromFuellstaendeChartEntriesByRegion,
    StromFuellstaendeChartHistogramAreaChartEntry,
    StromFuellstaendeSpeicherseenCurrentEntry
} from '../../../core/models/strom-fuellstaende-speicherseen';

import { StromService } from '../../../services/strom/strom.service';
import { DiagramLegendEntry } from '../../../shared/diagrams/diagram-legend/diagram-legend.component';
import { LabelModifier } from '../../../shared/diagrams/histogram/base-histogram.model';

import { HistogramElFocusEvent } from '../../../shared/diagrams/histogram/interactive-histogram.component';
import {
    LabelFilters,
    LabelFormatters
} from '../../../shared/diagrams/label.utils';
import {
    COLOR_CONTEXT,
    COLOR_SPEICHERSEEN,
    SpeicherseenConsts,
    SpeicherseeRegions
} from '../strom.consts';

@Component({
    selector: 'bfe-fuellstaende-speicherseen',
    templateUrl: './fuellstaende-speicherseen.component.html',
    styleUrls: ['./fuellstaende-speicherseen.component.scss']
})
export class FuellstaendeSpeicherseenComponent implements OnInit {
    readonly consts = SpeicherseenConsts;

    readonly colorContext = COLOR_CONTEXT;
    readonly colorSpeicherseen = COLOR_SPEICHERSEEN;
    readonly regions = SpeicherseeRegions;
    readonly regionSelectionControl = new FormControl('totalCH');
    selectedRegion: string;

    private chartEntriesByRegion: StromFuellstaendeChartEntriesByRegion;
    chartData: StromFuellstaendeChartHistogramAreaChartEntry[] = [];

    latestEntry?: StromFuellstaendeSpeicherseenCurrentEntry;

    readonly yLabelFormatter;
    readonly labelModifier: LabelModifier;
    readonly subLabelModifier: LabelModifier;

    isLoading: boolean = true;

    tooltipEvent?: HistogramElFocusEvent<StromFuellstaendeChartHistogramAreaChartEntry>;

    readonly chartLabelFilter = LabelFilters.firstWeekOfMonth;

    readonly legendEntries: DiagramLegendEntry[] = [
        {
            color: SpeicherseenConsts.COLOR_CHART_MIN_MAX_RANGE,
            labelKey:
                'dashboard.strom.fuellstaende-speicherseen.diagram-legend.five-year-min-max',
            type: 'area'
        },
        {
            color: SpeicherseenConsts.COLOR_CHART_SECONDARY,
            labelKey: 'commons.legend.average',
            type: 'line'
        },
        {
            color: SpeicherseenConsts.COLOR_CHART_PRIMARY,
            labelKey: 'commons.legend.latest',
            type: 'line'
        }
    ];

    readonly additionalEntriesTotalCH: DiagramLegendEntry[] = [
        {
            color: SpeicherseenConsts.COLOR_CHART_MINIMUM_WITH_RESERVES,
            labelKey:
                'dashboard.strom.fuellstaende-speicherseen.diagram-legend.minimum-including-reserves',
            type: 'line'
        },
        {
            color: SpeicherseenConsts.COLOR_CHART_HISTORICAL_MINIMUM,
            labelKey:
                'dashboard.strom.fuellstaende-speicherseen.diagram-legend.historical-minimum',
            type: 'line'
        }
    ];

    constructor(
        private stromService: StromService,
        private changeDetector: ChangeDetectorRef,
        translationService: TranslationService
    ) {
        this.labelModifier = {
            formatter: LabelFormatters.monthShort(translationService.language),
            filter: LabelFilters.firstOfMonthOnly()
        };
        this.subLabelModifier = {
            formatter: LabelFormatters.yearFull(translationService.language),
            filter: LabelFilters.januaryAndDecember()
        };
        this.yLabelFormatter = (value: number) => `${value}%`;
    }

    ngOnInit(): void {
        this.stromService.getFuellstaendeSpeicherseenChartEntries().subscribe({
            next: (chartEntries) => {
                this.chartEntriesByRegion = chartEntries;
                this.changeRegion('totalCH');
            },
            complete: () => (this.isLoading = false)
        });

        this.regionSelectionControl.valueChanges.subscribe(
            (selectedRegion) =>
                !!selectedRegion && this.changeRegion(selectedRegion)
        );
    }

    get additionalEntries() {
        return this.isSelectedRegionCH ? this.additionalEntriesTotalCH : [];
    }

    get isSelectedRegionCH() {
        return this.selectedRegion === 'totalCH';
    }

    showLineChartTooltip(
        event: HistogramElFocusEvent<StromFuellstaendeChartHistogramAreaChartEntry>
    ) {
        this.tooltipEvent = event;
    }

    hideTooltip(): void {
        this.tooltipEvent = undefined;
    }

    changeRegion(region: string): void {
        if (this.chartEntriesByRegion?.hasOwnProperty(region)) {
            this.selectedRegion = region;
            const regionData = this.chartEntriesByRegion[region];
            this.chartData = regionData.entries;
            this.latestEntry = regionData.latestEntry;
            this.changeDetector.markForCheck();
        }
    }
}

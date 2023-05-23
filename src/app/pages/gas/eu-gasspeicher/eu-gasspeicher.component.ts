import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslationService } from '../../../core/i18n/translation.service';
import { HistogramAreaChartEntry } from '../../../core/models/charts';
import {
    FuellstandGasspeicher,
    FuellstandGasspeicherChartEntriesByRegion,
    FuellstandGasspeicherRegion,
    FuellstandGasspeicherRegionCurrentEntry
} from '../../../core/models/gas-fuellstand-gasspeicher';
import { GasService } from '../../../services/gas/gas.service';
import { LabelModifier } from '../../../shared/diagrams/histogram/base-histogram.model';
import { HistogramElFocusEvent } from '../../../shared/diagrams/histogram/interactive-histogram.component';
import {
    LabelFilters,
    LabelFormatters
} from '../../../shared/diagrams/label.utils';

import {
    COLOR_CONTEXT,
    GasspeicherConsts,
    GasspeicherLaender
} from '../gas.consts';

@Component({
    selector: 'bfe-eu-gasspeicher',
    templateUrl: './eu-gasspeicher.component.html',
    styleUrls: ['./eu-gasspeicher.component.scss']
})
export class EuGasspeicherComponent implements OnInit {
    spaceColor = COLOR_CONTEXT;

    readonly consts = GasspeicherConsts;
    readonly FuellstandGasspeicherRegion = FuellstandGasspeicherRegion;
    readonly regions = GasspeicherLaender;
    readonly regionSelectionControl = new FormControl('EU');
    readonly labelModifier: LabelModifier;
    readonly subLabelModifier: LabelModifier;
    readonly yLabelFormatter;

    private chartEntriesByRegion: FuellstandGasspeicherChartEntriesByRegion;
    histogramChartData: HistogramAreaChartEntry[] = [];
    chartDataDonuts: FuellstandGasspeicherRegionCurrentEntry;

    tooltipEvent?: HistogramElFocusEvent<HistogramAreaChartEntry>;

    isLoading: boolean = true;

    get lastUpdated(): string | null {
        if (!this.chartDataDonuts) {
            return null;
        }

        return this.chartDataDonuts.EU.date;
    }

    constructor(
        private gasService: GasService,
        translationService: TranslationService
    ) {
        this.labelModifier = {
            formatter: LabelFormatters.monthShort(translationService.language),
            filter: LabelFilters.firstOfMonthOnly({ excludeLast: true })
        };
        this.subLabelModifier = {
            formatter: LabelFormatters.yearFull(translationService.language),
            filter: LabelFilters.januaryAndDecember()
        };
        this.yLabelFormatter = (value: number) =>
            value === 100 ? `${value}%` : `${value}`;
    }

    ngOnInit(): void {
        this.gasService.getFuellstandGasspeicherChartEntries().subscribe({
            next: (data) => {
                this.chartDataDonuts = data.currentEntry;
                this.chartEntriesByRegion = data.entries;
                this.changeRegion(FuellstandGasspeicherRegion.EU);
                this.isLoading = false;
            },
            complete: () => (this.isLoading = false)
        });
        this.regionSelectionControl.valueChanges.subscribe((selectedRegion) => {
            !!selectedRegion && this.changeRegion(selectedRegion);
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

    private changeRegion(region: string): void {
        if (this.chartEntriesByRegion?.hasOwnProperty(region)) {
            const regionData = this.chartEntriesByRegion[region];
            if (!regionData) {
                return;
            }
            this.histogramChartData = regionData.map((entry) =>
                this.mapEntry(entry)
            );
        }
    }

    private mapEntry(entry: FuellstandGasspeicher): HistogramAreaChartEntry {
        return {
            date: new Date(entry.date),
            values: [
                entry.fiveYearMittelwert,
                entry.speicherstandProzent,
                entry.fiveYearMax,
                entry.fiveYearMin
            ],
            band: {
                upper: entry.fiveYearMax,
                lower: entry.fiveYearMin
            },
            tooltipInformation: {
                differenzMittelwert: entry.differenzMittelwert,
                differenzMin: entry.differenzMin,
                differenzMax: entry.differenzMax
            },
            absoluteValue: entry.speicherstandTWh
        };
    }
}

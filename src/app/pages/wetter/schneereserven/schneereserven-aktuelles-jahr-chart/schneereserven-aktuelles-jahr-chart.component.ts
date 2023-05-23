import { Component, OnInit } from '@angular/core';
import { LabelModifier } from '../../../../shared/diagrams/histogram/base-histogram.model';
import { TranslationService } from '../../../../core/i18n/translation.service';
import {
    LabelFilters,
    LabelFormatters
} from '../../../../shared/diagrams/label.utils';
import { HistogramAreaChartEntry } from '../../../../core/models/charts';
import { WetterService } from '../../../../services/wetter/wetter.service';
import { WetterSchneereservenAktuellEntry } from '../../../../core/models/wetter-schneereserven-aktuell';
import { HistogramElFocusEvent } from '../../../../shared/diagrams/histogram/interactive-histogram.component';
import { WetterConsts } from '../../wetter.consts';

@Component({
    selector: 'bfe-schneereserven-aktuelles-jahr-chart',
    templateUrl: './schneereserven-aktuelles-jahr-chart.component.html',
    styleUrls: ['./schneereserven-aktuelles-jahr-chart.component.scss']
})
export class SchneereservenAktuellesJahrChartComponent implements OnInit {
    readonly labelModifier: LabelModifier;
    readonly yLabelFormatter;
    readonly consts = WetterConsts;

    histogramChartData: HistogramAreaChartEntry[] = [];
    isLoading: boolean = true;
    dateOfLastUpdate: Date = new Date();

    tooltipEvent?: HistogramElFocusEvent<HistogramAreaChartEntry>;

    constructor(
        private wetterService: WetterService,
        translationService: TranslationService
    ) {
        this.labelModifier = {
            formatter: LabelFormatters.monthShort(translationService.language),
            filter: LabelFilters.firstOfMonthOnly()
        };

        this.yLabelFormatter = (value: number) => `${value}mm`;
    }

    ngOnInit(): void {
        this.wetterService.getSchneereservenAktuell().subscribe({
            next: (data) => {
                this.isLoading = false;
                this.histogramChartData = data.map((e) => this.mapEntry(e));
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

    private mapEntry(
        entry: WetterSchneereservenAktuellEntry
    ): HistogramAreaChartEntry {
        return {
            date: new Date(entry.date.toString()),
            values: [
                entry.fiveYearMittelwert,
                entry.aktuellMm,
                entry.fiveYearMax,
                entry.fiveYearMin
            ],
            band: {
                upper: entry.fiveYearMax,
                lower: entry.fiveYearMin
            }
        };
    }
}

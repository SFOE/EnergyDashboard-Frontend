import { Component, OnInit } from '@angular/core';
import { SparzielEntry } from '../../../core/models/sparziel';
import { StromService } from '../../../services/strom/strom.service';
import {
    COLOR_CHART_DETAIL_SECONDARY,
    COLOR_CHART_STROM_ADDITIONAL_LINE,
    COLOR_POSITIVE
} from '../../../shared/commons/colors.const';
import { mapAktuelleEinsparungEntryToHistogramEntry } from '../../../shared/components/sparziel/sparziel.utils';
import { DiagramLegendEntry } from '../../../shared/diagrams/diagram-legend/diagram-legend.component';
import { HistogramDetailEntry } from '../../../shared/diagrams/histogram/histogram-detail/histogram-detail.component';
import { HistogramElFocusEvent } from '../../../shared/diagrams/histogram/interactive-histogram.component';
import { COLOR_CONTEXT } from '../strom.consts';

const CUTOFF_DATE = new Date(2022, 9, 1);
const SPARZIEL_PERCENTAGE = 10;

@Component({
    selector: 'bfe-stromstromsparziel',
    templateUrl: './stromsparziel.component.html',
    styleUrls: ['./stromsparziel.component.scss']
})
export class StromsparzielComponent implements OnInit {
    readonly primaryColor = COLOR_CONTEXT;
    readonly sparzielTarget = SPARZIEL_PERCENTAGE;
    readonly barColors = [
        COLOR_CHART_DETAIL_SECONDARY,
        COLOR_CONTEXT,
        COLOR_CONTEXT
    ];
    readonly lineColors = [
        COLOR_POSITIVE,
        '#000000',
        COLOR_CHART_STROM_ADDITIONAL_LINE
    ];
    readonly legendEntries: DiagramLegendEntry[] = [
        {
            color: COLOR_CHART_DETAIL_SECONDARY,
            labelKey: 'commons.sparziel.chart-legend.difference',
            type: 'area'
        },
        {
            color: COLOR_CONTEXT,
            labelKey:
                'commons.sparziel.chart-legend.relevant-difference-meassured',
            type: 'area'
        },
        {
            color: COLOR_CONTEXT + '80', // add transparency to color, 80 is equal to 0.5 opacity
            labelKey:
                'commons.sparziel.chart-legend.relevant-difference-projected',
            type: 'area'
        },
        {
            color: this.lineColors[1],
            labelKey: 'commons.sparziel.chart-legend.five-year-average',
            type: 'line'
        },
        {
            color: this.lineColors[0],
            labelKey: 'commons.sparziel.chart-legend.target',
            labelKeyOptions: { target: this.sparzielTarget },
            type: 'line'
        },
        {
            color: this.lineColors[2],
            labelKey: 'commons.sparziel.chart-legend.temperature',
            type: 'dashed-line'
        }
    ];

    isLoadingTrend: boolean = true;
    isLoadingPerMonth: boolean = true;
    sparzielPerMonth: HistogramDetailEntry[] = [];
    sparzielZielData?: SparzielEntry;

    tooltipEvent?: HistogramElFocusEvent<HistogramDetailEntry>;

    constructor(private stromService: StromService) {}

    ngOnInit(): void {
        this.stromService.getSparziel().subscribe({
            next: (data) => {
                this.sparzielZielData = data;
            },
            complete: () => (this.isLoadingTrend = false)
        });

        this.stromService.getSparzielAktuelleEinsparungen().subscribe({
            next: (data) => {
                this.sparzielPerMonth =
                    mapAktuelleEinsparungEntryToHistogramEntry(
                        data,
                        SPARZIEL_PERCENTAGE,
                        CUTOFF_DATE
                    );
            },
            complete: () => (this.isLoadingPerMonth = false)
        });
    }
}

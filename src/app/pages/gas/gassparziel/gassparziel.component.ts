import { Component, OnInit } from '@angular/core';
import { SparzielEntry } from '../../../core/models/sparziel';
import { GasService } from '../../../services/gas/gas.service';
import {
    COLOR_CHART_HISTOGRAM_AREA_SECONDARY_AREA,
    COLOR_CHART_STROM_ADDITIONAL_LINE,
    COLOR_POSITIVE
} from '../../../shared/commons/colors.const';
import { mapAktuelleEinsparungEntryToHistogramEntry } from '../../../shared/components/sparziel/sparziel.utils';
import { DiagramLegendEntry } from '../../../shared/diagrams/diagram-legend/diagram-legend.component';
import { HistogramDetailEntry } from '../../../shared/diagrams/histogram/histogram-detail/histogram-detail.component';
import { HistogramElFocusEvent } from '../../../shared/diagrams/histogram/interactive-histogram.component';
import { COLOR_CONTEXT } from '../gas.consts';
import { Block } from '../../../shared/diagrams/histogram/base-histogram.model';
import { SparzielService } from '../../../services/sparziel/sparziel.service';

const SPARZIEL_PERCENTAGE = 15;

@Component({
    selector: 'bfe-gassparziel',
    templateUrl: './gassparziel.component.html',
    styleUrls: ['./gassparziel.component.scss']
})
export class GassparzielComponent implements OnInit {
    readonly primaryColor = COLOR_CONTEXT;
    readonly sparzielTarget = SPARZIEL_PERCENTAGE;
    readonly barColors = [COLOR_CONTEXT, COLOR_CONTEXT];
    readonly lineColors = [
        COLOR_POSITIVE,
        '#000000',
        COLOR_CHART_STROM_ADDITIONAL_LINE
    ];
    readonly legendEntries: DiagramLegendEntry[] = [
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
        },
        {
            color: COLOR_CHART_HISTOGRAM_AREA_SECONDARY_AREA,
            labelKey: 'commons.sparziel.chart-legend.relevant-difference',
            type: 'area'
        }
    ];

    isLoadingTrend: boolean = true;
    isLoadingPerMonth: boolean = true;
    sparzielPerMonth: HistogramDetailEntry[] = [];
    sparzielZielData: SparzielEntry;
    sparzielBlocks: Block[];

    tooltipEvent?: HistogramElFocusEvent<HistogramDetailEntry>;

    constructor(
        private gasService: GasService,
        private sparzielService: SparzielService
    ) {
        this.sparzielBlocks =
            this.sparzielService.getRelevantMonthsForSparziel();
    }

    ngOnInit(): void {
        this.gasService.getSparzielZiel().subscribe({
            next: (data) => {
                this.sparzielZielData = data;
            },
            complete: () => (this.isLoadingTrend = false)
        });

        this.gasService.getSparzielAktuelleEinsparung().subscribe({
            next: (data) => {
                this.sparzielPerMonth =
                    mapAktuelleEinsparungEntryToHistogramEntry(
                        data,
                        SPARZIEL_PERCENTAGE
                    );
            },
            complete: () => (this.isLoadingPerMonth = false)
        });
    }
}

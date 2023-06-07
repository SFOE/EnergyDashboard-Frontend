import { Component, HostListener, Input, OnInit } from '@angular/core';
import { mapAktuelleEinsparungEntryToHistogramEntry } from '../../../../shared/components/sparziel/sparziel.utils';
import { StromService } from '../../../../services/strom/strom.service';
import { SparzielService } from '../../../../services/sparziel/sparziel.service';
import { COLOR_CONTEXT } from '../../strom.consts';
import {
    COLOR_CHART_HISTOGRAM_AREA_SECONDARY_AREA,
    COLOR_CHART_STROM_ADDITIONAL_LINE,
    COLOR_POSITIVE
} from '../../../../shared/commons/colors.const';
import { DiagramLegendEntry } from '../../../../shared/diagrams/diagram-legend/diagram-legend.component';
import { HistogramDetailEntry } from '../../../../shared/diagrams/histogram/histogram-detail/histogram-detail.component';
import { Block } from '../../../../shared/diagrams/histogram/base-histogram.model';

const SPARZIEL_PERCENTAGE = 10;

@Component({
    selector: 'bfe-stromsparziel-mehr-mindestverbrauch-pro-monat',
    templateUrl:
        './stromsparziel-mehr-mindestverbrauch-pro-monat.component.html',
    styleUrls: [
        './stromsparziel-mehr-mindestverbrauch-pro-monat.component.scss'
    ]
})
export class StromsparzielMehrMindestverbrauchProMonatComponent
    implements OnInit
{
    @Input()
    lastUpdated: Date | undefined;

    readonly primaryColor = COLOR_CONTEXT;
    readonly targetPercentage = SPARZIEL_PERCENTAGE;
    readonly barColors = [COLOR_CONTEXT, COLOR_CONTEXT + '80'];
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
            labelKeyOptions: { target: this.targetPercentage },
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

    isLoading: boolean = true;
    mehrMindestverbrauchData: HistogramDetailEntry[] = [];
    mehrMindestverbrauchBlocks: Block[];
    barWidth: number = 22;

    constructor(
        private stromService: StromService,
        private sparzielService: SparzielService
    ) {}

    ngOnInit(): void {
        this.mehrMindestverbrauchBlocks =
            this.sparzielService.getRelevantMonthsForSparzielOnMonthEnd();

        this.stromService.getSparzielAktuelleEinsparungen().subscribe({
            next: (data) => {
                this.mehrMindestverbrauchData =
                    mapAktuelleEinsparungEntryToHistogramEntry(
                        data,
                        SPARZIEL_PERCENTAGE
                    );

                this.setBarWidth();
            },
            complete: () => (this.isLoading = false)
        });
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: Event) {
        this.setBarWidth();
    }

    private setBarWidth() {
        if (window.innerWidth > 1000) {
            this.barWidth = 22;
        } else {
            this.barWidth = 14;
        }
    }
}

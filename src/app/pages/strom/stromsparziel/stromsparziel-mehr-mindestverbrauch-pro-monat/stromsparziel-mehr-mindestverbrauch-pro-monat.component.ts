import { Component, HostListener, Input, OnInit } from '@angular/core';
import { StromService } from '../../../../services/strom/strom.service';
import { COLOR_CHART_STROM_ADDITIONAL_LINE } from '../../../../shared/commons/colors.const';
import { mapAktuelleEinsparungEntryToHistogramEntry } from '../../../../shared/components/sparziel/sparziel.utils';
import { DiagramLegendEntry } from '../../../../shared/diagrams/diagram-legend/diagram-legend.component';
import { HistogramDetailEntry } from '../../../../shared/diagrams/histogram/histogram-detail/histogram-detail.component';
import { COLOR_CONTEXT } from '../../strom.consts';

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
    readonly lineColors = ['#000000', COLOR_CHART_STROM_ADDITIONAL_LINE];
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
            color: this.lineColors[0],
            labelKey: 'commons.sparziel.chart-legend.five-year-average',
            type: 'line'
        },
        {
            color: this.lineColors[1],
            labelKey: 'commons.sparziel.chart-legend.temperature',
            type: 'dashed-line'
        }
    ];

    isLoading: boolean = true;
    mehrMindestverbrauchData: HistogramDetailEntry[] = [];
    barWidth: number = 22;

    constructor(private stromService: StromService) {}

    ngOnInit(): void {
        this.stromService.getSparzielAktuelleEinsparungen().subscribe({
            next: (data) => {
                this.mehrMindestverbrauchData =
                    mapAktuelleEinsparungEntryToHistogramEntry(data, null);

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

import { Component, HostListener, Input, OnInit } from '@angular/core';
import { TranslationService } from '../../../../core/i18n/translation.service';
import { WetterService } from '../../../../services/wetter/wetter.service';
import { DiagramLegendEntry } from '../../../../shared/diagrams/diagram-legend/diagram-legend.component';
import {
    Block,
    LabelModifier
} from '../../../../shared/diagrams/histogram/base-histogram.model';
import { HistogramDetailEntry } from '../../../../shared/diagrams/histogram/histogram-detail/histogram-detail.component';
import { HistogramElFocusEvent } from '../../../../shared/diagrams/histogram/interactive-histogram.component';
import {
    LabelFilters,
    LabelFormatters
} from '../../../../shared/diagrams/label.utils';
import { COLOR_SPACE, WetterConsts } from '../../wetter.consts';

@Component({
    selector: 'bfe-niederschlag-aktuell-histogram-chart',
    templateUrl: './niederschlag-aktuell-histogram-chart.component.html',
    styleUrls: ['./niederschlag-aktuell-histogram-chart.component.scss']
})
export class NiederschlagAktuellHistogramChartComponent implements OnInit {
    @Input() loading: boolean = true;

    readonly primaryColor = COLOR_SPACE;
    readonly barColors = [WetterConsts.COLOR_CHART_PRIMARY];
    readonly lineColors = ['#000000'];
    readonly xLabelModifier: LabelModifier;
    readonly xSubLabelModifier: LabelModifier;
    readonly yLabelFormatter;
    readonly legendEntries: DiagramLegendEntry[] = [
        {
            color: '#000000',
            labelKey: 'commons.wetter.niederschlag.standard',
            type: 'line'
        },
        {
            color: WetterConsts.COLOR_CHART_PRIMARY,
            labelKey: 'commons.wetter.niederschlag.precipitation',
            type: 'area'
        },
        {
            color: WetterConsts.COLOR_CHART_NIEDERSCHLAG_CURRENT_MONTH,
            labelKey: 'commons.wetter.niederschlag.current-month-1-till-today',
            type: 'area'
        }
    ];

    isLoading = true;
    data: HistogramDetailEntry[];
    blocks: Block[] = [];
    domainMax: number = 200;
    domainMin: number = 0;
    dateOfLastUpdate: Date = new Date();
    barWidth: number = 40;

    tooltipEvent?: HistogramElFocusEvent<HistogramDetailEntry>;

    constructor(
        private wetterService: WetterService,
        translationService: TranslationService
    ) {
        this.xLabelModifier = {
            formatter: LabelFormatters.monthShort(translationService.language),
            filter: LabelFilters.everyNth(1, { excludeLast: false })
        };

        this.xSubLabelModifier = {
            formatter: LabelFormatters.yearFull(translationService.language),
            filter: LabelFilters.januaryAndDecember()
        };

        this.yLabelFormatter = (value: number) => `${value}%`;
    }

    ngOnInit(): void {
        this.dateOfLastUpdate.setDate(this.dateOfLastUpdate.getDate() - 1);

        this.wetterService.getNiederschlagAktuell().subscribe({
            next: (data) => {
                this.data =
                    this.wetterService.mapNiederschlagAktuellToHistogramEntries(
                        data
                    );
                let latestDate = this.getLatestDateFromData();

                this.blocks = [
                    {
                        startDate: new Date(
                            latestDate.getFullYear(),
                            latestDate.getMonth() - 1,
                            18
                        ),
                        endDate: new Date(
                            latestDate.getFullYear(),
                            latestDate.getMonth(),
                            15
                        ),
                        color: WetterConsts.COLOR_CHART_NIEDERSCHLAG_CURRENT_MONTH
                    }
                ];

                this.setBarWidth();
            },
            error: (error) => {
                console.error(error);
            },
            complete: () => {
                this.isLoading = false;
            }
        });
    }

    showTooltip(event: HistogramElFocusEvent<HistogramDetailEntry>) {
        this.tooltipEvent = event;
    }

    hideTooltip(): void {
        this.tooltipEvent = undefined;
    }

    getLatestDateFromData() {
        let highestDate = new Date(0);

        this.data.forEach((obj) => {
            const currentDate = new Date(obj.date);
            if (currentDate > highestDate) {
                highestDate = currentDate;
            }
        });

        return highestDate;
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: Event) {
        this.setBarWidth();
    }

    private setBarWidth() {
        if (window.innerWidth > 1000) {
            this.barWidth = 40;
        } else {
            this.barWidth = 20;
        }
    }
}

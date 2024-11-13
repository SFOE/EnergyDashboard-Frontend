import { Component, HostListener, Input, OnInit } from '@angular/core';
import { TranslationService } from '../../../../core/i18n/translation.service';
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
import { COLOR_CONTEXT } from '../../strom.consts';
import { UpdateInterval } from '../../../../shared/components/kpi-container/kpi-date-info-subtext/kpi-date-info-subtext.component';
import { StromService } from '../../../../services/strom/strom.service';
import { ThousandCommaPipe } from 'src/app/shared/commons/thousand-comma.pipe';
import { StromProduktionPvEntry } from '../../../../core/models/strom-produktion-pv';

@Component({
    selector: 'bfe-produktion-pv-charts',
    templateUrl: './produktion-pv-charts.component.html',
    styleUrls: ['./produktion-pv-charts.component.scss']
})
export class ProduktionPvChartsComponent implements OnInit {
    @Input() loading: boolean = true;

    readonly COLOR_CONTEXT = COLOR_CONTEXT;
    readonly barColors: string[] = [COLOR_CONTEXT];
    readonly lineColors: string[] = ['#000000'];
    readonly xLabelModifier: LabelModifier;
    readonly xSubLabelModifier: LabelModifier;
    readonly yLabelFormatter;
    readonly legendEntries: DiagramLegendEntry[] = [
        {
            color: COLOR_CONTEXT,
            labelKey: 'commons.strom.produktion-pv.production',
            type: 'area'
        }
    ];

    isLoading: boolean = true;
    data: HistogramDetailEntry[];
    blocks: Block[] = [];
    domainMax: number;
    domainMin: number = 0;
    dateOfLastUpdate: Date = new Date();
    updateInterval: UpdateInterval = 'yearly';
    barWidth: number = 40;
    gridData: StromProduktionPvEntry[] = [];
    nbrOfBars: number;

    tooltipEvent?: HistogramElFocusEvent<HistogramDetailEntry>;

    constructor(
        private stromService: StromService,
        translationService: TranslationService
    ) {
        this.xLabelModifier = {
            formatter: LabelFormatters.yearFull(translationService.language),
            filter: LabelFilters.none()
        };

        const thousandComma: ThousandCommaPipe = new ThousandCommaPipe();
        this.yLabelFormatter = (value: number): string =>
            `${thousandComma.transform(value)} GWh`;
    }

    ngOnInit(): void {
        this.stromService.getProduktionPv().subscribe({
            next: (data: StromProduktionPvEntry[]): void => {
                // start with year 2010
                const startingYear: number = 2010;

                const referenceDataEntry: StromProduktionPvEntry = data.filter(
                    (el: StromProduktionPvEntry): boolean => {
                        return el.date.toString() === startingYear.toString();
                    }
                )[0];
                const latestDataEntry: StromProduktionPvEntry =
                    data[data.length - 1];

                this.gridData.push(referenceDataEntry);
                this.gridData.push(latestDataEntry);

                // set date of last update and add 1 year
                this.dateOfLastUpdate = this.getDateBasedOnJuly11();

                // map data to fit histogram entries
                const mappedData: HistogramDetailEntry[] =
                    this.stromService.mapProduktionPvToHistogramEntries(data);

                const nbrOfYearsToDisplay: number = 14;
                this.data = mappedData.slice(-nbrOfYearsToDisplay);

                this.nbrOfBars = this.data.length;
                this.setBarWidth();
            },
            error: (error): void => {
                console.error(error);
            },
            complete: (): void => {
                this.isLoading = false;
            }
        });
    }

    getDateBasedOnJuly11(): Date {
        const currentDate: Date = new Date();
        const currentYear: number = currentDate.getFullYear();

        // create date for July 11th of the current year
        const july11: Date = new Date(currentYear, 6, 11);

        // check if the current date has already passed July 11
        if (currentDate > july11) {
            return new Date(currentYear, 6, 11);
        } else {
            // otherwise, return July 11 of previous year
            return new Date(currentYear - 1, 6, 11);
        }
    }

    showTooltip(event: HistogramElFocusEvent<HistogramDetailEntry>): void {
        this.tooltipEvent = event;
    }

    hideTooltip(): void {
        this.tooltipEvent = undefined;
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: Event): void {
        this.setBarWidth();
    }

    private setBarWidth(): void {
        if (window.innerWidth > 1000) {
            this.barWidth = 420 / this.nbrOfBars;
        } else {
            this.barWidth = 210 / this.nbrOfBars;
        }
    }
}

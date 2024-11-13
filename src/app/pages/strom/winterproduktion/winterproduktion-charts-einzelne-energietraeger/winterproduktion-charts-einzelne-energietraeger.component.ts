import { Component, HostListener, Input, OnInit } from '@angular/core';
import { COLORS_WINTERPRODUKTION } from '../../strom.consts';
import { COLOR_SPACE } from '../../../wetter/wetter.consts';
import {
    Block,
    LabelModifier
} from '../../../../shared/diagrams/histogram/base-histogram.model';
import { DiagramLegendEntry } from '../../../../shared/diagrams/diagram-legend/diagram-legend.component';
import { HistogramDetailEntry } from '../../../../shared/diagrams/histogram/histogram-detail/histogram-detail.component';
import { UpdateInterval } from '../../../../shared/components/kpi-container/kpi-date-info-subtext/kpi-date-info-subtext.component';
import { HistogramElFocusEvent } from '../../../../shared/diagrams/histogram/interactive-histogram.component';
import { StromService } from '../../../../services/strom/strom.service';
import { TranslationService } from '../../../../core/i18n/translation.service';
import { LabelFormatters } from '../../../../shared/diagrams/label.utils';
import { ThousandCommaPipe } from '../../../../shared/commons/thousand-comma.pipe';
import { StromWinterproduktionEinzelneEnergietraegerEntry } from '../../../../core/models/strom-winterproduktion.einzelne-energietraeger';
import { createDateMappingFunctions } from '../../../../shared/static-utils/date-mapping-utils';
import { addExtraEntries } from '../../../../shared/static-utils/data-add-empty-entries';
import { COLORS_STROM } from '../../../../shared/commons/colors.const';
import { getYesterdayDate } from '../../../../shared/static-utils/date-utils';

@Component({
    selector: 'bfe-winterproduktion-charts-einzelne-energietraeger',
    templateUrl:
        './winterproduktion-charts-einzelne-energietraeger.component.html',
    styleUrls: [
        './winterproduktion-charts-einzelne-energietraeger.component.scss'
    ]
})
export class WinterproduktionChartsEinzelneEnergietraegerComponent
    implements OnInit
{
    @Input() loading: boolean = true;

    readonly primaryColor = COLOR_SPACE;
    readonly COLOR_CONTEXT = 'black';
    readonly lineColors: string[] = [COLORS_WINTERPRODUKTION.HGT];
    readonly xLabelFormatter: (date: Date) => string[];
    readonly xSubLabelModifier: LabelModifier;
    readonly barColors = [
        COLORS_STROM.KERNKRAFT,
        COLORS_STROM.THERMISCHE,
        COLORS_STROM.FLUSSKRAFT,
        COLORS_STROM.SPEICHERKRAFT,
        COLORS_STROM.WIND,
        COLORS_STROM.PHOTOVOLTAIK
    ];

    readonly legendEntries: DiagramLegendEntry[] = [
        {
            color: this.barColors[0],
            labelKey: 'dashboard.strom.produktion.type.kernkraft',
            type: 'area'
        },
        {
            color: this.barColors[1],
            labelKey: 'dashboard.strom.winterproduktion.thermische',
            type: 'area'
        },
        {
            color: this.barColors[2],
            labelKey: 'dashboard.strom.produktion.type.flusskraft',
            type: 'area'
        },
        {
            color: this.barColors[3],
            labelKey: 'dashboard.strom.produktion.type.speicherkraft',
            type: 'area'
        },
        {
            color: this.barColors[4],
            labelKey: 'dashboard.strom.produktion.type.wind',
            type: 'area'
        },
        {
            color: this.barColors[5],
            labelKey: 'dashboard.strom.produktion.type.photovoltaik',
            type: 'area'
        }
    ];

    isLoading: boolean = true;
    data: HistogramDetailEntry[];
    blocks: Block[] = [];
    domainMax: number;
    domainMin: number = 0;
    dateOfLastUpdate: Date = new Date();
    updateInterval: UpdateInterval = 'daily';
    barWidth: number = 10;
    nbrOfBars: number;
    xTicksItems: Date[] = [];
    getOriginalDate: (adjustedDate: Date) => Date;
    transServ: TranslationService;
    yLabelFormatter;

    tooltipEvent?: HistogramElFocusEvent<HistogramDetailEntry>;

    constructor(
        private stromService: StromService,
        translationService: TranslationService
    ) {
        this.xLabelFormatter = LabelFormatters.winter(
            translationService.language,
            'numeric'
        );

        const thousandComma: ThousandCommaPipe = new ThousandCommaPipe();
        this.yLabelFormatter = (value: number): string =>
            `${thousandComma.transform(value)} GWh`;

        this.transServ = translationService;
    }

    ngOnInit(): void {
        // create maps to store original to adjusted date and vice versa
        const originalToAdjustedMap: Map<string, Date> = new Map<
            string,
            Date
        >();
        const adjustedToOriginalMap: Map<string, Date> = new Map<
            string,
            Date
        >();

        // create mapping functions
        const { adjustDatesWithMapping, getAdjustedDate, getOriginalDate } =
            createDateMappingFunctions(
                originalToAdjustedMap,
                adjustedToOriginalMap
            );

        this.getOriginalDate = getOriginalDate;

        this.stromService
            .getWinterproduktionEinzelneEnergietraeger()
            .subscribe({
                next: (
                    data: StromWinterproduktionEinzelneEnergietraegerEntry[]
                ): void => {
                    this.dateOfLastUpdate = getYesterdayDate();

                    // add empty entry between the groups
                    const transformedData: {
                        data: StromWinterproduktionEinzelneEnergietraegerEntry[];
                        xTicks: Date[];
                    } =
                        addExtraEntries<StromWinterproduktionEinzelneEnergietraegerEntry>(
                            data,
                            (currentDate: Date) => ({
                                date: new Date(
                                    currentDate.getFullYear(),
                                    currentDate.getMonth() + 1,
                                    16
                                ), // 16th of the next month (could be any other), used to distinguish empty entries from actual data
                                kernkraft: 0,
                                thermische: 0,
                                flusskraft: 0,
                                speicherkraft: 0,
                                wind: 0,
                                pv: null
                            })
                        );

                    /* map the date to monthly intervals without jumps between groups
                   to properly use the functions calculating the coordinates */
                    const dataWithDatesMapped: StromWinterproduktionEinzelneEnergietraegerEntry[] =
                        adjustDatesWithMapping(transformedData.data);

                    // get labels (dates) for x-axis
                    this.xTicksItems = transformedData.xTicks.map(
                        (date: Date) => getAdjustedDate(date)
                    );

                    this.data =
                        this.stromService.mapWinterproduktionEinzelneEnergietraegerToHistogramEntries(
                            dataWithDatesMapped
                        );

                    this.getDomainMax();

                    // adjust # of bars
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

    showTooltip(event: HistogramElFocusEvent<HistogramDetailEntry>): void {
        this.tooltipEvent = event;
    }

    hideTooltip(): void {
        this.tooltipEvent = undefined;
    }

    getDomainMax(): void {
        let maxSum: number = 0;

        for (const entry of this.data) {
            if (entry.exists && entry.barValues.length > 0) {
                const sum: number = entry.barValues.reduce(
                    (acc: number, value: number | null) => {
                        return acc + (value !== null ? value : 0);
                    },
                    0
                );

                maxSum = Math.max(maxSum, sum);
            }
        }

        this.domainMax = Math.floor(maxSum);
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: Event): void {
        this.setBarWidth();
    }

    private setBarWidth(): void {
        const mobileLimit: number = 430;

        const width: number =
            window.innerWidth > 1000
                ? 570
                : window.innerWidth > mobileLimit
                ? 380
                : 255;

        this.barWidth = width / this.nbrOfBars;

        if (window.innerWidth <= mobileLimit) {
            // for mobile
            this.yLabelFormatter = (value: number): string =>
                `${value / 1000} TWh`;
        }
    }
}

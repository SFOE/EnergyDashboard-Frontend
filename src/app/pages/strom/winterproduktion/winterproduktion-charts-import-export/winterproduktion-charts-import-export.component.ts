import { Component, HostListener, Input, OnInit } from '@angular/core';
import { COLORS_WINTERPRODUKTION } from '../../strom.consts';
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
import {
    StromWinterproduktionImportExportMapped,
    StromWinterproduktionImportExportEntry
} from '../../../../core/models/strom-winterproduktion.import-export';
import { createDateMappingFunctions } from '../../../../shared/static-utils/date-mapping-utils';
import { addExtraEntries } from '../../../../shared/static-utils/data-add-empty-entries';
import { getYesterdayDate } from '../../../../shared/static-utils/date-utils';

@Component({
    selector: 'bfe-winterproduktion-charts-import-export',
    templateUrl: './winterproduktion-charts-import-export.component.html',
    styleUrls: ['./winterproduktion-charts-import-export.component.scss']
})
export class WinterproduktionChartsImportExportComponent implements OnInit {
    @Input() loading: boolean = true;

    readonly barColors: string[] = [
        COLORS_WINTERPRODUKTION.EIGENPRODUKTION,
        COLORS_WINTERPRODUKTION.IMPORT,
        COLORS_WINTERPRODUKTION.EXPORT,
        COLORS_WINTERPRODUKTION.STROMVERBRAUCH
    ];
    readonly lineColor: string[] = [COLORS_WINTERPRODUKTION.HGT];
    readonly xLabelFormatter: (date: Date) => string[];
    readonly xSubLabelModifier: LabelModifier;
    readonly legendEntries: DiagramLegendEntry[] = [
        {
            color: COLORS_WINTERPRODUKTION.HGT,
            labelKey:
                'dashboard.strom.entkoppelung-endenergieverbrauch-bip.heating-degree-days',
            type: 'line'
        },
        {
            color: COLORS_WINTERPRODUKTION.STROMVERBRAUCH,
            labelKey: 'commons.strom.winterproduktion.stromverbrauch',
            type: 'line'
        },
        {
            color: COLORS_WINTERPRODUKTION.EIGENPRODUKTION,
            labelKey: 'commons.strom.winterproduktion.eigenproduktion',
            type: 'area'
        },
        {
            color: COLORS_WINTERPRODUKTION.IMPORT,
            labelKey: 'commons.strom.winterproduktion.import',
            type: 'area'
        },
        {
            color: COLORS_WINTERPRODUKTION.EXPORT,
            labelKey: 'commons.strom.winterproduktion.export',
            type: 'area'
        }
    ];

    isLoading: boolean = true;
    data: HistogramDetailEntry[];
    blocks: Block[] = [];
    domainMax: number = 8000;
    domainMin: number = 0;
    domainMax2: number;
    domainRatio: number;
    dateOfLastUpdate: Date = new Date();
    updateInterval: UpdateInterval = 'daily';
    barWidth: number = 10;
    nbrOfBars: number;
    xTicksItems: Date[] = [];
    // space for the right y-axis, it reduces the chart size
    space_2nd_y: number = 55;
    unit_right_yaxis: string = 'HGT';
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

    protected adjustHgt(
        data: StromWinterproduktionImportExportMapped[],
        ratio: number
    ): StromWinterproduktionImportExportMapped[] {
        return data.map((entry: StromWinterproduktionImportExportMapped) => ({
            ...entry,
            heizgradtage: entry.heizgradtage ? entry.heizgradtage * ratio : null
        }));
    }

    private transformWinterproduktionData(
        input: StromWinterproduktionImportExportEntry[]
    ): StromWinterproduktionImportExportMapped[] {
        return input.map((entry: StromWinterproduktionImportExportEntry) => {
            const isImport: boolean = entry.nettoimporte > 0;
            // starting point for the block in the stacked bar (y-coordinate)
            const yCoord: number = isImport
                ? entry.eigenproduktion
                : entry.eigenproduktion + entry.nettoimporte;

            const exportValue: number | null = isImport
                ? null
                : Math.round(-entry.nettoimporte);
            const importValue: number | null = isImport
                ? Math.round(entry.nettoimporte)
                : null;

            return {
                date: new Date(entry.date),
                stromverbrauch: Math.round(entry.stromverbrauch),
                import: importValue,
                export: exportValue,
                diff_ep_ni: yCoord,
                nettoimporte_bfe: entry.nettoimporte_bfe,
                heizgradtage: Math.round(entry.heizgradtage ?? 0)
            };
        });
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

        this.stromService.getWinterproduktionImportExport().subscribe({
            next: (data: StromWinterproduktionImportExportEntry[]): void => {
                this.dateOfLastUpdate = getYesterdayDate();

                const calculatedData: StromWinterproduktionImportExportMapped[] =
                    this.transformWinterproduktionData(data);

                this.setDomainMax2(data);
                this.domainRatio = this.domainMax / this.domainMax2;

                let adjustedHGTs: StromWinterproduktionImportExportMapped[] =
                    this.adjustHgt(calculatedData, this.domainRatio);

                // add empty entry between the groups
                const dataWithExtraEntries: {
                    data: StromWinterproduktionImportExportMapped[];
                    xTicks: Date[];
                } = addExtraEntries<StromWinterproduktionImportExportMapped>(
                    adjustedHGTs,
                    (currentDate: Date) => ({
                        date: new Date(
                            currentDate.getFullYear(),
                            currentDate.getMonth() + 1,
                            16
                        ), // 16th of the next month (could be any other), used to distinguish empty entries from actual data
                        stromverbrauch: 0,
                        import: 0,
                        export: 0,
                        diff_ep_ni: 0,
                        nettoimporte_bfe: 0,
                        heizgradtage: null
                    })
                );

                /* map the date to monthly intervals without jumps between groups
                   to properly use the functions calculating the coordinates for each bar*/
                const dataWithDatesMapped: StromWinterproduktionImportExportMapped[] =
                    adjustDatesWithMapping(dataWithExtraEntries.data);

                // get labels (dates) for x-axis
                this.xTicksItems = dataWithExtraEntries.xTicks.map(
                    (date: Date) => getAdjustedDate(date)
                );

                this.data =
                    this.stromService.mapWinterproduktionImportExportToHistogramEntries(
                        dataWithDatesMapped
                    );

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

    setDomainMax2(data: StromWinterproduktionImportExportEntry[]): void {
        const maxHgt: number = Math.max(
            0,
            ...data.map(
                (item: StromWinterproduktionImportExportEntry) =>
                    item.heizgradtage || 0
            )
        );

        this.domainMax2 = Math.ceil(maxHgt / 50) * 50;
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
                ? 400
                : 255;

        this.barWidth = (width - this.space_2nd_y) / this.nbrOfBars;

        if (window.innerWidth <= mobileLimit) {
            // for mobile
            this.yLabelFormatter = (value: number): string =>
                `${value / 1000} TWh`;
        }
    }
}

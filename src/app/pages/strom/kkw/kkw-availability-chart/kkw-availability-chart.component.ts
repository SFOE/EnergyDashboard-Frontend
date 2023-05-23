import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslationService } from '../../../../core/i18n/translation.service';
import {
    StromKkwVerfuegbarkeitAusfall,
    StromKkwVerfuegbarkeitData,
    StromKkwVerfuegbarkeitEntry,
    StromKkwVerfuegbarkeitHistogramDetailEntry
} from '../../../../services/strom/strom.model';
import { DiagramLegendEntry } from '../../../../shared/diagrams/diagram-legend/diagram-legend.component';
import {
    Block,
    LabelModifier
} from '../../../../shared/diagrams/histogram/base-histogram.model';
import { HistogramElFocusEvent } from '../../../../shared/diagrams/histogram/interactive-histogram.component';
import {
    LabelFilters,
    LabelFormatters
} from '../../../../shared/diagrams/label.utils';
import { kkwColors } from '../../strom.consts';
import {
    convertToDate,
    getYesterday
} from '../../../../shared/static-utils/date-utils';

export interface KKWAvailabilityChartModel {
    titleDynamicKey: string;
    kurztextDynamicKey?: string;
    chartData: Observable<StromKkwVerfuegbarkeitData>;
}

@Component({
    selector: 'bfe-kkw-availability-chart',
    templateUrl: './kkw-availability-chart.component.html',
    styleUrls: ['./kkw-availability-chart.component.scss']
})
export class KkwAvailabilityChartComponent implements OnChanges {
    @Input() model: KKWAvailabilityChartModel;
    @Input() showNumberOfOutages: boolean;
    @Input() displayAusfaelleInBackground: boolean;

    readonly kkwColors = kkwColors;
    readonly xLabelModifier: LabelModifier;
    readonly xSubLabelModifier: LabelModifier;
    readonly yLabelFormatter;

    isLoading: boolean = true;
    data: StromKkwVerfuegbarkeitData;
    chartData: StromKkwVerfuegbarkeitHistogramDetailEntry[];
    blocks: Block[];
    lastUpdated: Date = getYesterday();

    tooltipEvent?: HistogramElFocusEvent<StromKkwVerfuegbarkeitHistogramDetailEntry>;

    legendEntries: DiagramLegendEntry[] = [
        {
            color: kkwColors.COLOR_KKW_PRIMARY,
            labelKey: 'dashboard.strom.kkw.available-power',
            type: 'line'
        },
        {
            color: kkwColors.COLOR_KKW_INSTALLED_POWER,
            labelKey: 'dashboard.strom.kkw.max-power',
            type: 'line'
        }
    ];

    constructor(translationService: TranslationService) {
        this.xLabelModifier = {
            formatter: LabelFormatters.monthShort(translationService.language),
            filter: LabelFilters.firstOfMonthOnly({ excludeLast: false })
        };
        this.xSubLabelModifier = {
            formatter: LabelFormatters.yearFull(translationService.language),
            filter: LabelFilters.januaryAndDecember({
                excludeLast: true
            })
        };
        this.yLabelFormatter = (value: number) => `${value} MW`;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!!changes['model']) {
            this.model.chartData.subscribe({
                next: (data) => {
                    this.data = data;
                    this.chartData =
                        this.mapKkwVerfuegbarkeitDataToHistogramEntries(data);
                    this.blocks = this.displayAusfaelleInBackground
                        ? this.mapKkwVerfuegbarkeitDataToHistogramBlocks(data)
                        : [];
                },
                error: (error) => {
                    console.error(error);
                },
                complete: () => {
                    this.isLoading = false;
                }
            });
        }

        if (this.displayAusfaelleInBackground) {
            this.legendEntries.push(
                {
                    color: kkwColors.COLOR_KKW_OUTAGE_PLANNED,
                    labelKey: 'dashboard.strom.kkw.outage.planned',
                    type: 'area'
                },
                {
                    color: kkwColors.COLOR_KKW_OUTAGE_UNPLANNED,
                    labelKey: 'dashboard.strom.kkw.outage.unplanned',
                    type: 'area'
                }
            );
        }
    }

    showTooltip(
        event: HistogramElFocusEvent<StromKkwVerfuegbarkeitHistogramDetailEntry>
    ) {
        this.tooltipEvent = event;
    }

    hideTooltip(): void {
        this.tooltipEvent = undefined;
    }

    mapKkwVerfuegbarkeitDataToHistogramEntries(
        data: StromKkwVerfuegbarkeitData
    ): StromKkwVerfuegbarkeitHistogramDetailEntry[] {
        return data.entries.map((dto: StromKkwVerfuegbarkeitEntry) => {
            const date = convertToDate(dto.date.toString());
            const dateWithoutTime = this.getDateWithoutTime(date); // Used to check if there was an outage on that day.

            return {
                date: date,
                barValues: [dto.kkwVerfuegbareLeistung],
                barLineValue: null,
                hiddenValues: [],
                lineValues: [dto.kkwInstallierteLeistung],
                outages: data.ausfaelle
                    .filter(
                        (outage) =>
                            this.getDateWithoutTime(outage.startDate) <=
                                dateWithoutTime &&
                            this.getDateWithoutTime(outage.endDate) >=
                                dateWithoutTime
                    )
                    .map((e) => {
                        return {
                            wasPlanned: e.wasPlanned,
                            productionPlant: e.productionPlant
                        };
                    }),
                exists: true
            };
        });
    }

    mapKkwVerfuegbarkeitDataToHistogramBlocks(
        data: StromKkwVerfuegbarkeitData
    ): Block[] {
        return data.ausfaelle.map((dto: StromKkwVerfuegbarkeitAusfall) => {
            if (
                this.getDateWithoutTime(dto.startDate) ===
                this.getDateWithoutTime(dto.endDate)
            ) {
                return {
                    startDate: dto.startDate,
                    endDate: dto.endDate,
                    color: dto.wasPlanned
                        ? kkwColors.COLOR_KKW_OUTAGE_PLANNED
                        : kkwColors.COLOR_KKW_OUTAGE_UNPLANNED
                };
            } else {
                return {
                    startDate: dto.startDate,
                    endDate: this.addDaysToDate(dto.endDate, 1),
                    color: dto.wasPlanned
                        ? kkwColors.COLOR_KKW_OUTAGE_PLANNED
                        : kkwColors.COLOR_KKW_OUTAGE_UNPLANNED
                };
            }
        });
    }

    addDaysToDate(inputDate: Date, numberOfDays: number): Date {
        const newDate = new Date(inputDate);
        newDate.setDate(inputDate.getDate() + numberOfDays);
        return newDate;
    }

    getDateWithoutTime(date: Date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }

    getDomainMax(): number {
        let highestValue = Number.NEGATIVE_INFINITY;

        for (const entry of this.data.entries) {
            if (entry.kkwVerfuegbareLeistung > highestValue) {
                highestValue = entry.kkwVerfuegbareLeistung;
            }

            if (entry.kkwInstallierteLeistung > highestValue) {
                highestValue = entry.kkwInstallierteLeistung;
            }
        }

        let nextThousand = Math.ceil(highestValue / 1000) * 1000;

        // If the next 1000 is less than 200 more, we give it another 1000.
        if (nextThousand - highestValue < 200) {
            return nextThousand + 1000;
        } else {
            return nextThousand;
        }
    }
}

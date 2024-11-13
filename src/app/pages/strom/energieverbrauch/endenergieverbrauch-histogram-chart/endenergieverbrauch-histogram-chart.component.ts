import { Component, Input, OnInit } from '@angular/core';
import {
    EndenergieverbrauchMitPrognoseData,
    Perspektive,
    PerspektiveWithStatistik
} from 'src/app/core/models/energie-verbrauch.endenergieverbrauch-mit-prognose';
import { ThousandCommaPipe } from 'src/app/shared/commons/thousand-comma.pipe';
import { TranslationService } from '../../../../core/i18n/translation.service';
import { HistogramAreaChartEntry } from '../../../../core/models/charts';
import {
    LabelModifier,
    PointOfInterestWithLabels
} from '../../../../shared/diagrams/histogram/base-histogram.model';
import { HistogramElFocusEvent } from '../../../../shared/diagrams/histogram/interactive-histogram.component';
import {
    LabelFilters,
    LabelFormatters
} from '../../../../shared/diagrams/label.utils';
import { COLORS_ENDENERGIE } from '../../strom.consts';
import { getEnergieverbrauchLastUpdateDate } from '../energieverbrauch.utils';
import { EndenergieverbrauchChartIndex } from './endenergieverbrauch-histogram-chart.consts';

const DOMAIN_MAX_PADDING = 5;
const PERSPECTIVES: Perspektive[] = [
    'ZERO_Basis',
    'ZERO_A',
    'ZERO_B',
    'ZERO_C',
    'WWB'
];

const CHART_COLORS = [
    COLORS_ENDENERGIE.ERDOELPRODUKTE,
    COLORS_ENDENERGIE.ELEKTRIZITAET,
    COLORS_ENDENERGIE.ERDGAS,
    COLORS_ENDENERGIE.FERNWAERME,
    COLORS_ENDENERGIE.HOLZ,
    COLORS_ENDENERGIE.KOHLE,
    COLORS_ENDENERGIE.PTX,
    COLORS_ENDENERGIE.UEBRIGE_ERNEUERBARE_ENERGIE,
    COLORS_ENDENERGIE.ABFAELLE
];

@Component({
    selector: 'bfe-endenergieverbrauch-histogram-chart',
    templateUrl: './endenergieverbrauch-histogram-chart.component.html',
    styleUrls: ['./endenergieverbrauch-histogram-chart.component.scss']
})
export class EndenergieverbrauchHistogramChartComponent implements OnInit {
    @Input() data: EndenergieverbrauchMitPrognoseData;
    currentScenario = PERSPECTIVES[0];
    // hack to display POIs at the correct position in the chart
    pointsOfInterestWithLabels: PointOfInterestWithLabels[] = [];
    tooltipEvent?: HistogramElFocusEvent<HistogramAreaChartEntry>;
    domainMax: number;
    lastEntryDate?: Date | undefined | null;
    lastUpdate?: Date;
    turningPoint: number;

    readonly labelModifier: LabelModifier;
    readonly yLabelFormatter;
    readonly chartColors = CHART_COLORS;
    readonly scenarioLabel =
        this.translationService.returnTranslation('commons.scenario');
    readonly scenarioOptions = this.getScenarioOptions();
    readonly chartIndex = EndenergieverbrauchChartIndex;

    constructor(private translationService: TranslationService) {
        this.labelModifier = {
            formatter: LabelFormatters.yearFull(translationService.language),
            filter: LabelFilters.everyNth(10)
        };
        const thousandComma = new ThousandCommaPipe();
        this.yLabelFormatter = (value: number) =>
            `${thousandComma.transform(value / 1000)} TWh`; // we get the data as GWh, we convert it to TWh to have more space for the chart
    }

    get chartData() {
        return {
            chartAreaEntries: this.data[
                this.currentScenario
            ].chartAreaEntries.map((entry) => ({
                ...entry,
                values: entry.values.map((value) => value ?? 0) // need to replace null with 0 to avoid color issues in the tooltip
            }))
        };
    }

    ngOnInit(): void {
        this.adjustChartToPerspective();
        this.lastUpdate = getEnergieverbrauchLastUpdateDate(
            this.lastEntryDate ?? new Date()
        );
    }

    onScenarioChange(perspective: string) {
        this.currentScenario = perspective as Perspektive;
        this.adjustChartToPerspective();
    }

    showLineChartTooltip(
        event: HistogramElFocusEvent<HistogramAreaChartEntry>
    ) {
        this.tooltipEvent = event;
    }

    hideTooltip(): void {
        this.tooltipEvent = undefined;
    }

    private adjustChartToPerspective() {
        const chartAreaEntries = this.chartData.chartAreaEntries;
        const info =
            this.findLatestDateWithPerspektiveStatistik(chartAreaEntries);
        this.turningPoint = info.index;
        this.lastEntryDate = info.date instanceof Date ? info.date : new Date();

        const t = (key: string) =>
            this.translationService.returnTranslation(key);
        this.pointsOfInterestWithLabels = [
            {
                date: this.lastEntryDate,
                topLabel: '',
                leftLabel: t(
                    'dashboard.strom.energieverbrauch.endenergieverbrauch.measured'
                ),
                rightLabel: t(
                    'dashboard.strom.energieverbrauch.endenergieverbrauch.forecast'
                )
            }
        ];

        this.domainMax = this.getDomainMax(chartAreaEntries);
    }

    private findLatestDateWithPerspektiveStatistik(
        entries: HistogramAreaChartEntry[]
    ): { index: number; date: Date | undefined | null } {
        let latestIndex = -1;
        let latestDate: Date | null = null;

        entries.forEach((entry, index) => {
            // work around type defintion
            const entryWithPerspektive = entry as HistogramAreaChartEntry & {
                perspektive: PerspektiveWithStatistik;
            };
            if (entryWithPerspektive.perspektive === 'Statistik') {
                if (
                    latestDate === null ||
                    entryWithPerspektive.date > latestDate
                ) {
                    latestDate = entryWithPerspektive.date;
                    latestIndex = index;
                }
            }
        });

        if (latestIndex === -1 || latestDate === undefined) {
            return { index: latestIndex, date: undefined };
        }

        return { index: latestIndex, date: latestDate };
    }

    private getDomainMax(entries: HistogramAreaChartEntry[]): number {
        let maxSum: number = 0;

        for (const entry of entries) {
            if (entry.values) {
                const sum =
                    entry.values
                        .filter((e) => (e ?? 0) > 0)
                        .reduce((a, b) => (a ?? 0) + (b || 0), 0) ?? 0; // sum the array values, treating null as 0

                if (sum > maxSum) {
                    maxSum = sum;
                }
            }
        }

        maxSum += DOMAIN_MAX_PADDING;
        return maxSum;
    }

    private getScenarioOptions() {
        return PERSPECTIVES.map((s) => {
            const perspective = s.replace('_', ' ');
            return {
                key: `${this.scenarioLabel} ${perspective}`,
                value: s
            };
        });
    }
}

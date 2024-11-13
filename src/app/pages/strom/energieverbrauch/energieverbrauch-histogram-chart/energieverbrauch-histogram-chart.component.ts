import { Component, Input, OnInit } from '@angular/core';
import {
    EnergieverbrauchMitPrognoseData,
    Perspektive,
    PerspektiveWithStatistik
} from 'src/app/core/models/strom-verbrauch.energieverbrauch-mit-prognose';
import { ThousandCommaPipe } from 'src/app/shared/commons/thousand-comma.pipe';
import { TranslationService } from '../../../../core/i18n/translation.service';
import { HistogramAreaChartEntry } from '../../../../core/models/charts';
import {
    LabelModifier,
    PointOfInterestWithLabels,
    PointsOfInterestBlock
} from '../../../../shared/diagrams/histogram/base-histogram.model';
import { HistogramElFocusEvent } from '../../../../shared/diagrams/histogram/interactive-histogram.component';
import {
    LabelFilters,
    LabelFormatters
} from '../../../../shared/diagrams/label.utils';
import { COLORS_BRUTTOENERGIE } from '../../strom.consts';
import { getEnergieverbrauchLastUpdateDate } from '../energieverbrauch.utils';
import { EnergieverbrauchChartIndex } from './energieverbrauch-histogram-chart.consts';

const DOMAIN_MAX_PADDING = 5;
const PERSPECTIVES: Perspektive[] = [
    'ZERO_Basis',
    'ZERO_A',
    'ZERO_B',
    'ZERO_C',
    'WWB'
];

const CHART_COLORS = [
    COLORS_BRUTTOENERGIE.WATER,
    COLORS_BRUTTOENERGIE.WOOD,
    COLORS_BRUTTOENERGIE.THERMO,
    COLORS_BRUTTOENERGIE.DIVERS,
    COLORS_BRUTTOENERGIE.PTX,
    COLORS_BRUTTOENERGIE.NUCLEAR,
    COLORS_BRUTTOENERGIE.COAL,
    COLORS_BRUTTOENERGIE.OIL,
    COLORS_BRUTTOENERGIE.GAS
];

@Component({
    selector: 'bfe-energieverbrauch-histogram-chart',
    templateUrl: './energieverbrauch-histogram-chart.component.html',
    styleUrls: ['./energieverbrauch-histogram-chart.component.scss']
})
export class EnergieverbrauchHistogramChartComponent implements OnInit {
    @Input() data: EnergieverbrauchMitPrognoseData;
    currentScenario = PERSPECTIVES[0];
    // hack to display POIs at the correct position in the chart
    pointsOfInterestWithLabels: PointOfInterestWithLabels[] = [];
    pointsOfInterestBlocks: PointsOfInterestBlock[] = [];
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
    readonly chartIndex = EnergieverbrauchChartIndex;

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
                    'dashboard.strom.stromverbrauch.energieverbrauch.measured'
                ),
                rightLabel: t(
                    'dashboard.strom.stromverbrauch.energieverbrauch.forecast'
                )
            }
        ];

        this.domainMax = this.getDomainMax(chartAreaEntries);

        this.pointsOfInterestBlocks = [
            {
                startDate: new Date('1959-01-01'),
                endDate: new Date('1973-01-01'),
                startPosition: 108,
                endPosition: 224,
                color: COLORS_BRUTTOENERGIE.OIL,
                textColor: '#fff',
                text: `${t(
                    'dashboard.strom.stromverbrauch.energieverbrauch.transformation'
                )} ${t('dashboard.strom.stromverbrauch.type.erdoel')}`
            },
            {
                startDate: new Date('1976-01-01'),
                endDate: new Date('1985-01-01'),
                startPosition: 86,
                endPosition: 133,
                color: COLORS_BRUTTOENERGIE.NUCLEAR,
                text: `${t(
                    'dashboard.strom.stromverbrauch.energieverbrauch.transformation'
                )} ${t('dashboard.strom.stromverbrauch.type.kernbrennstoffe')}`
            },
            {
                startDate: new Date('2010-01-01'),
                endDate: new Date('2050-01-01'),
                startPosition: 98,
                endPosition: this.getEndPosition(),
                color: COLORS_BRUTTOENERGIE.DIVERS,
                text: `${t(
                    'dashboard.strom.stromverbrauch.energieverbrauch.transformation'
                )} ${t(
                    'dashboard.strom.stromverbrauch.type.uebrige-erneuerbare-energie'
                )}`
            }
        ];
    }

    private getEndPosition() {
        switch (this.currentScenario) {
            case 'ZERO_A':
                return 185;
            case 'ZERO_B':
                return 163;
            case 'ZERO_C':
                return 176;
            case 'WWB':
                return 128;
            default:
                return 183;
        }
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

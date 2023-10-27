import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { I18NextModule } from 'angular-i18next';
import { TranslationService } from 'src/app/core/i18n/translation.service';
import { HistogramAreaChartEntry } from 'src/app/core/models/charts';
import { WetterHeizgradtageTrend } from 'src/app/core/models/wetter-heizgradtage-trend';
import { WetterHeizgradtageZeitreihe } from 'src/app/core/models/wetter-heizgradtage-zeitreihe';
import { WetterService } from 'src/app/services/wetter/wetter.service';
import { HideableTextSection } from 'src/app/shared/components/hideable-text-section/hideable-text-section.component';
import {
    ImageSection,
    ImageSectionComponent
} from 'src/app/shared/components/image-section/image-section.component';
import { PointOfInterestLegendEntry } from 'src/app/shared/components/points-of-interest-legend/points-of-interest-legend.component';
import { DiagramLegendEntry } from 'src/app/shared/diagrams/diagram-legend/diagram-legend.component';
import { LabelModifier } from 'src/app/shared/diagrams/histogram/base-histogram.model';
import { HistogramElFocusEvent } from 'src/app/shared/diagrams/histogram/interactive-histogram.component';
import {
    LabelFilters,
    LabelFormatters
} from 'src/app/shared/diagrams/label.utils';
import { TooltipModule } from 'src/app/shared/diagrams/tooltip/tooltip.module';
import { monthToTranslationKey } from 'src/app/shared/static-utils/date-utils';
import { Trend, TrendRating } from '../../../core/models/trend.enum';
import { CommonsModule } from '../../../shared/commons/commons.module';
import { SelectComponent } from '../../../shared/components/select/select.component';
import { SharedComponentsModule } from '../../../shared/components/shared-components.module';
import { TrendModule } from '../../../shared/components/trend/trend.module';
import { DiagramLegendModule } from '../../../shared/diagrams/diagram-legend/diagram-legend.module';
import { HistogramLineModule } from '../../../shared/diagrams/histogram/histogram-line/histogram-line.module';
import { COLOR_SPACE, WetterConsts } from '../wetter.consts';

@Component({
    standalone: true,
    selector: 'bfe-heizgradtage',
    templateUrl: './heizgradtage.component.html',
    styleUrls: ['./heizgradtage.component.scss'],
    imports: [
        SharedComponentsModule,
        TrendModule,
        CommonsModule,
        DiagramLegendModule,
        HistogramLineModule,
        I18NextModule,
        CommonModule,
        TooltipModule,
        SelectComponent,
        ImageSectionComponent,
        HideableTextSection
    ]
})
export class HeizgradtageComponent implements OnInit {
    readonly consts = WetterConsts;
    readonly colorHeizgradtage = COLOR_SPACE;

    readonly yLabelFormatter;
    readonly labelModifier: LabelModifier;
    readonly subLabelModifier: LabelModifier;
    readonly defaultSelectedOption = 'Schweiz';

    // hack to display POIs at the correct position in the chart
    pointsOfInterest: PointOfInterestLegendEntry[] = [];

    readonly legendEntries: DiagramLegendEntry[] = [
        {
            color: WetterConsts.COLOR_CHART_MIN_MAX_RANGE,
            labelKey:
                'dashboard.wetter.heizgrad-tage.diagram-legend.norm-kumulativ-min-max',
            type: 'area'
        },
        {
            color: WetterConsts.COLOR_CHART_SECONDARY,
            labelKey:
                'dashboard.wetter.heizgrad-tage.diagram-legend.norm-kumulativ-mean',
            type: 'line'
        },
        {
            color: 'red',
            labelKey:
                'dashboard.wetter.heizgrad-tage.diagram-legend.messung-prognose-kumulativ-max',
            type: 'dashed-line'
        },
        {
            color: WetterConsts.COLOR_CHART_PRIMARY,
            labelKey:
                'dashboard.wetter.heizgrad-tage.diagram-legend.messung-prognose-kumulativ-mean',
            type: 'line'
        },
        {
            color: 'blue',
            labelKey:
                'dashboard.wetter.heizgrad-tage.diagram-legend.messung-prognose-kumulativ-min',
            type: 'dashed-line'
        }
    ];

    options: { key: string; value: string }[] = [];
    isLoading: boolean = true;
    isLoadingTrend: boolean = true;
    tooltipEvent?: HistogramElFocusEvent<HistogramAreaChartEntry>;

    trend: WetterHeizgradtageTrend = {
        date: new Date(),
        messungPrognoseKumulativMittelwert: 0,
        trend: Trend.NEUTRAL,
        trendRating: TrendRating.NEUTRAL
    };

    chartData: HistogramAreaChartEntry[] = [];
    data: WetterHeizgradtageZeitreihe;

    imageSection: ImageSection;

    constructor(
        translationService: TranslationService,
        private readonly service: WetterService
    ) {
        this.labelModifier = {
            formatter: LabelFormatters.monthShort(translationService.language),
            filter: LabelFilters.firstOfMonthOnly()
        };
        this.subLabelModifier = {
            formatter: LabelFormatters.yearFull(translationService.language),
            filter: LabelFilters.januaryAndDecember()
        };
        this.yLabelFormatter = (value: number) => `${value} HGT`;
    }

    ngOnInit(): void {
        this.service.getHeizgradTageZeitreihe().subscribe({
            next: (chartEntries) => {
                this.data = chartEntries;
                this.changeRegion(this.defaultSelectedOption);

                this.options = Object.keys(chartEntries).map((x) => {
                    return { key: x, value: x };
                });
            },
            complete: () => (this.isLoading = false)
        });

        this.service.getHeizgradTageTrend().subscribe({
            next: (res) => {
                this.trend = res;
            },
            complete: () => (this.isLoadingTrend = false)
        });

        this.service.getHeizgradTageTabelleDaten().subscribe({
            next: (pois) => {
                this.pointsOfInterest = [
                    {
                        date: new Date(pois.observation),
                        pointNumber: 1,
                        labelKey:
                            'dashboard.wetter.heizgrad-tage.diagram.pois.observation',
                        overrideDateLabel: new Date(pois.observation)
                    },
                    {
                        date: new Date(pois.forecast),
                        pointNumber: 2,
                        labelKey:
                            'dashboard.wetter.heizgrad-tage.diagram.pois.forecast',
                        overrideDateLabel: new Date(pois.forecast)
                    },
                    {
                        date: new Date(pois.estimate),
                        pointNumber: 3,
                        labelKey:
                            'dashboard.wetter.heizgrad-tage.diagram.pois.estimate',
                        overrideDateLabel: new Date(pois.estimate)
                    }
                ];
            }
        });

        var dateOfLastUpdate = new Date();
        const currentMonthTranslationKey = monthToTranslationKey(
            dateOfLastUpdate.getMonth()
        );

        this.imageSection = {
            dateOfLastUpdate: dateOfLastUpdate,
            updateInterval: 'monthly',
            titleKey:
                'dynamic:kpi-wetter-5_heizgradtage-karten.currentmonth.titel',
            longTextKey:
                'dynamic:kpi-wetter-5_heizgradtage-karten.currentmonth.langtext',
            images: [
                {
                    imageRelativeLink:
                        '/images/kpi-wetter-5_meteoswiss_hgt_abs.png',
                    titleKey: currentMonthTranslationKey,
                    subTitleKey: 'dynamic:dashboard.wetter.heizgradtage.hgt-abs'
                },
                {
                    imageRelativeLink:
                        '/images/kpi-wetter-5_meteoswiss_hgt_dev.png',
                    titleKey: currentMonthTranslationKey,
                    subTitleKey: 'dynamic:dashboard.wetter.heizgradtage.hgt-dev'
                }
            ]
        };
    }

    get additionalEntries() {
        return [];
    }

    showLineChartTooltip(
        event: HistogramElFocusEvent<HistogramAreaChartEntry>
    ) {
        this.tooltipEvent = event;
    }

    hideTooltip(): void {
        this.tooltipEvent = undefined;
    }

    changeRegion(val: string) {
        this.chartData = this.data[val].map((x) => {
            return {
                values: [
                    x.normKumulativMittelwert,
                    x.messungPrognoseKumulativMax, // dashed line
                    x.messungPrognoseKumulativMittelwert,
                    x.messungPrognoseKumulativMin, // dashed line
                    x.normKumulativMax, // add max dot
                    x.normKumulativMin // add min dot
                ],
                date: new Date(x.date.toString()),
                band: {
                    upper: x.normKumulativMax,
                    mean: x.normKumulativMittelwert,
                    lower: x.normKumulativMin
                }
            };
        });
    }
}

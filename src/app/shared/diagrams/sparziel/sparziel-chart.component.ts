import {
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges
} from '@angular/core';
import { COLOR_POSITIVE } from '../../../shared/commons/colors.const';
import { Block, LabelModifier } from '../histogram/base-histogram.model';
import { HistogramDetailEntry } from '../histogram/histogram-detail/histogram-detail.component';
import { HistogramElFocusEvent } from '../histogram/interactive-histogram.component';
import { LabelFilters, LabelFormatters } from '../label.utils';
import { Sparziel } from './sparziel-chart-tooltip/sparziel-chart-tooltip.component';

@Component({
    selector: 'bfe-sparziel-chart',
    templateUrl: './sparziel-chart.component.html',
    styleUrls: ['./sparziel-chart.component.scss']
})
export class SparzielChartComponent implements OnChanges, OnInit {
    @Input() achievedPercentage: number | null;
    @Input() achievedValue: number;
    @Input() projectedPercentage: number | null;
    @Input() projectedValue: number;
    @Input() weatherAdjustedPercent: number;
    @Input() weatherAdjustedGwh: number;
    @Input() achievedColor: string = 'blue';
    @Input() schaetzung: boolean = true;
    @Input() date: Date = new Date();
    @Input() addSparziel?: boolean = false;
    @Input() sparziel?: Sparziel;

    lineColor = COLOR_POSITIVE;

    percentageToGo: number = 0;
    overarchievedPercentage: number = 0;
    calculatedAchievedPercentage: number = 0;
    calculatedProjectedPercentage: number = 0;

    entries: HistogramDetailEntry[] = [];
    blocks: Block[] = [];
    tooltipEvent?: HistogramElFocusEvent<HistogramDetailEntry>;

    barColors: string[] = [];
    readonly barLineColor = 'black';
    readonly xLabelModifier: LabelModifier = {
        formatter: LabelFormatters.day(),
        filter: LabelFilters.everyNth(5, { excludeLast: false })
    };
    readonly yLabelFormatter = (value: number) =>
        value >= 0 ? `+${value}%` : `${value}%  `;

    domainMax: number = 0;
    domainMin: number = 100;

    ngOnInit(): void {
        var values = this.entries.flatMap((x) => x.barValues as number[]);
        var sum = values.reduce((a, b) => a + b);
        this.addSparziel && this.sparziel
            ? values.push(this.sparziel.percent ?? 0)
            : null;

        var negativeValueCount = values.filter((v) => v < 0).length;

        if (negativeValueCount > 0) {
            function roundPositive(num: number) {
                // prevent unpleasand chart display error
                return Math.ceil(num / 10) * 10 === 0
                    ? 10
                    : Math.ceil(num / 10) * 10;
            }

            function roundNegative(num: number) {
                return Math.floor(num / 10) * 10;
            }

            var sorted = values.sort((a, b) => a - b);
            var min = sorted[0];
            var max = sorted[sorted.length - 1];

            this.domainMin =
                negativeValueCount > 1
                    ? roundNegative(min)
                    : min < 0
                    ? roundNegative(min)
                    : roundPositive(min);
            this.domainMax =
                negativeValueCount > 1
                    ? 5
                    : max < 0
                    ? roundNegative(max)
                    : roundPositive(max);
        } else {
            this.domainMin = 0;
            this.domainMax = Math.ceil(sum / 10) * 10;
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (
            !!changes['achievedPercentage'] ||
            !!changes['projectedPercentage']
        ) {
            const projectedPlusAchieved =
                (this.achievedPercentage ?? 0) +
                (this.projectedPercentage ?? 0);
            this.calculatedAchievedPercentage = Math.min(
                this.achievedPercentage ?? 0,
                100
            );
            if (projectedPlusAchieved > 100) {
                this.percentageToGo = 0;
                this.overarchievedPercentage = projectedPlusAchieved - 100;
                this.calculatedProjectedPercentage =
                    100 - this.calculatedAchievedPercentage;
            } else {
                this.percentageToGo = 100 - projectedPlusAchieved;
                this.overarchievedPercentage = 0;
                this.calculatedProjectedPercentage =
                    this.projectedPercentage ?? 0;
            }

            this.entries = this.addSparziel
                ? [
                      {
                          date: new Date(
                              new Date(this.date).setDate(
                                  this.date.getDate() - 1
                              )
                          ),
                          barValues: [0, 0],
                          barLineValue: null,
                          hiddenValues: [],
                          lineValues: [this.sparziel?.percent ?? 0]
                      },
                      {
                          date: new Date(this.date),
                          barValues: [
                              this.calculatedAchievedPercentage,
                              this.calculatedProjectedPercentage
                          ],
                          barLineValue: 0,
                          hiddenValues: [],
                          lineValues: [this.sparziel?.percent ?? 0]
                      },
                      {
                          date: new Date(
                              new Date(this.date).setDate(
                                  this.date.getDate() + 1
                              )
                          ),
                          barValues: [0, 0],
                          barLineValue: null,
                          hiddenValues: [],
                          lineValues: [this.sparziel?.percent ?? 0]
                      }
                  ]
                : [
                      {
                          date: new Date(this.date),
                          barValues: [
                              this.calculatedAchievedPercentage,
                              this.calculatedProjectedPercentage
                          ],
                          barLineValue: 0,
                          hiddenValues: [],
                          lineValues: []
                      }
                  ];
        }
        if (!!changes['achievedColor']) {
            this.barColors = [this.achievedColor, this.achievedColor + '99'];
        }
    }

    hideTooltip(): void {
        this.tooltipEvent = undefined;
    }

    showTooltip(event: HistogramElFocusEvent<HistogramDetailEntry>) {
        this.tooltipEvent = event;
    }
}

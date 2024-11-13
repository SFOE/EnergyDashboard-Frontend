import { Component, Input, OnChanges, ViewEncapsulation } from '@angular/core';
import { HistogramDetailEntry } from './histogram-detail.component';
import { ArrayUtils } from '../../../static-utils/array-utils';
import { dateKeyFn } from '../base-histogram.component';
import { middleOfDay } from '../../../static-utils/date-utils';
import { HistogramDetailGroupedComponent } from './histogram-detail-grouped.component';
import {
    CurveFactory,
    curveLinear,
    EnterElement,
    line,
    Line,
    Selection
} from 'd3';
import { adminFormatNum } from '../../../static-utils/admin-format-num.function';
import { ThousandCommaPipe } from '../../../commons/thousand-comma.pipe';
import { isDefined } from '../../../xternal-helpers/from-c19-commons/utils/is-defined.function';

@Component({
    selector: 'bfe-histogram-detail-import-export',
    templateUrl: './histogram-detail.component.html',
    encapsulation: ViewEncapsulation.None
})
export class HistogramDetailImportExportComponent<
        T extends HistogramDetailEntry
    >
    extends HistogramDetailGroupedComponent<T>
    implements OnChanges
{
    @Input() domainMax2: number;
    @Input() unit_right_yaxis: string;

    protected domainMaxRatio: number;
    readonly thousandCommaPipe: ThousandCommaPipe = new ThousandCommaPipe();

    protected yLabelFormatter2: (value: number) => string;

    ngOnInit(): void {
        if (this.domainMax2 !== undefined && this.domainMax !== undefined) {
            this.domainMaxRatio = this.domainMax2 / this.domainMax;
        } else {
            this.domainMaxRatio = 1;
        }

        // use formatter to transform values from left y-axis to use for the right y-axis
        this.yLabelFormatter2 = (value: number) =>
            `${this.thousandCommaPipe.transform(
                Math.round(value * this.domainMaxRatio)
            )} ${this.unit_right_yaxis}`;
    }

    // this override prevents an error
    protected override drawBarLines(): void {}

    protected override drawStackedBars(
        barValuesFn: (v: T) => Array<number | null | undefined>,
        colors: readonly string[]
    ): void {
        this.dataGrp.attr('fill', (_, index) => colors[index]);

        const preCalcStackStart = (
            val: number | null | undefined,
            index: number,
            allValues: Array<number | null | undefined>
        ) => {
            if (index === 0) {
                // 'ignore' the first element; it's only the base, not a bar
                // instead use its space as the grey background
                const background_height: number = allValues[3]!;
                return { val: background_height, start: 0 };
            }

            // diff_ep_ni überspringen
            if (index === 3) {
                return { val: null, start: 0 };
            }

            const positiveSum: number = ArrayUtils.sumUp(
                allValues.slice(1, index).filter((v) => v !== null && v! >= 0)
            );
            const negativeSum: number = ArrayUtils.sumUp(
                allValues.slice(1, index).filter((v) => v !== null && v! < 0)
            );

            const start: number =
                allValues[0]! >= 0 ? positiveSum : negativeSum;

            return {
                val: val,
                start: start + (allValues[3] ?? 0)
            };
        };

        const preGetStromverbrauch = (
            val: number | null | undefined,
            index: number,
            allValues: Array<number | null | undefined>
        ) => {
            return {
                val,
                start: allValues[0] ?? 0
            };
        };

        // draw the stacked bars
        this.dataGrp
            .selectAll('g')
            .data(this.data, <any>dateKeyFn)
            .join('g')
            .attr('class', `stackedBar`)
            .attr('transform', ({ date }) => {
                const offsetToCenter: number =
                    this.scaleBandX.bandwidth() / 2 - this.barWidth / 2;

                return `translate(${
                    <number>this.scaleBandX(middleOfDay(date)) + offsetToCenter
                }, 0)`;
            })
            .selectAll('rect')
            .data((v: T) => {
                return barValuesFn(v).map(preCalcStackStart);
            })
            .join('rect')
            .attr('width', this.barWidth)
            .attr('y', ({ start, val }) => {
                return val !== undefined && (val ?? 0) < 0
                    ? <number>this.scaleLinearY(start)
                    : <number>this.scaleLinearY(start + (val ?? 0));
            })
            .attr('height', ({ val }) =>
                Math.abs(this.scaleLinearY(val ?? 0) - this.scaleLinearY(0))
            )
            .attr('fill', (_, index) => colors[index]);

        // draw horizontal lines in stacked bars
        this.dataGrp
            .selectAll('g')
            .data(this.data, <any>dateKeyFn)
            .join('g')
            .attr('transform', ({ date }) => {
                const offsetToCenter: number =
                    this.scaleBandX.bandwidth() / 2 - this.barWidth / 2;
                return `translate(${
                    <number>this.scaleBandX(middleOfDay(date)) + offsetToCenter
                }, 0)`;
            })
            .selectAll('line')
            .data((v: T) => {
                return barValuesFn(v)
                    .map(preGetStromverbrauch)
                    .filter(({ start }) => start !== 0);
            })
            .join('line')
            .attr('x1', 0)
            .attr('y1', ({ start }) => this.scaleLinearY(start))
            .attr('x2', this.barWidth)
            .attr('y2', ({ start }) => this.scaleLinearY(start))
            .attr('stroke', 'black')
            .attr('stroke-width', 2);
    }

    //----- adjusted functions for second y-axis -----

    protected override drawFullYAxis(): void {
        // left y-axis
        const yAxisTicks: number[] = this.getYAxisTicks(this.scaleLinearY);

        const idFn = (v: number) => v;

        this.yAxisGrp
            .selectAll('g')
            .data(yAxisTicks, <any>idFn)
            .join(this.createFullYAxisTick, <any>this.updateFullYAxisTick);

        // yAxisTicks has to remain the same as for the y-axis
        // otherwise numbers correctly drawn according to the left y-axis
        // workaround: calculate the labels for the right y-axis
        this.yAxisGrp2
            .selectAll('g')
            .data(yAxisTicks, <any>idFn)
            .join(this.createFullYAxisTick2, <any>this.updateFullYAxisTick2);
    }

    protected updateFullYAxisTick2 = (
        g: Selection<SVGGElement, number, SVGGElement, void>
    ) => {
        g.attr(
            'transform',
            (v: number): string => `translate(0, ${this.scaleLinearY(v) + 2.5})`
        );

        /* ensure the group is clean by removing any existing child elements
           otherwise it adds more labels on window size change*/
        g.selectAll('*').remove();

        const moveToTheRight: number = -60;

        g.append('text')
            .attr('dx', this.svg.width + moveToTheRight)
            .attr('text-align', 'left')
            .text((v: number) => (this.yLabelFormatter2 || adminFormatNum)(v));

        return g;
    };

    protected createFullYAxisTick2 = (
        group: Selection<EnterElement, number, SVGGElement, void>
    ) => {
        const g = group.append('g');
        g.append('text').attr('dy', 4);
        return this.updateFullYAxisTick2(g);
    };

    //------------- adjust line function
    protected override createLine(
        valueFn: (v: T) => number | null | undefined,
        curveFactory: CurveFactory = curveLinear
    ): Line<T> {
        return line<T>()
            .x(({ date }, index) => {
                return (
                    <number>this.scaleBandX(middleOfDay(date)) +
                    this.barWidth / 2
                );
            })
            .y((entry) => <number>this.scaleLinearY(valueFn(entry) || 0))
            .defined((entry: T) => isDefined(valueFn(entry)))
            .curve(curveFactory);
    }
}

import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import {
    AfterViewInit,
    Component,
    Inject,
    Input,
    OnChanges,
    OnDestroy,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import {
    area,
    CurveFactory,
    curveLinear,
    EnterElement,
    Line,
    line,
    scaleBand,
    ScaleBand,
    scaleLinear,
    ScaleLinear,
    scaleTime,
    ScaleTime,
    Selection
} from 'd3';
import { Subject } from 'rxjs';
import { isDefined } from '../../xternal-helpers/from-c19-commons/utils/is-defined.function';

import {
    COLOR_CHART_TICK_LINE,
    COLOR_CHART_TICK_TEXT
} from '../../commons/colors.const';

import { D3SvgComponent } from '../../components/d3-svg/d3-svg.component';
import { adminFormatNum } from '../../static-utils/admin-format-num.function';
import { middleOfDay } from '../../static-utils/date-utils';
import { LabelFilters, LabelFormatters } from '../label.utils';
import { calcDomainEnd, checkIntersectLeft } from '../utils';
import {
    Block,
    HistogramEntry,
    LabelModifier,
    NoDataBlock,
    PointOfInterest
} from './base-histogram.model';

export const dateKeyFn = (v: HistogramEntry) => v.date.getTime();

@Component({ template: '' })
export abstract class BaseHistogramComponent<T extends HistogramEntry>
    implements OnChanges, AfterViewInit, OnDestroy
{
    @Input()
    xLabelModifier: LabelModifier = {
        formatter: LabelFormatters.dateShort('de'),
        filter: LabelFilters.none()
    };

    @Input()
    xSubLabelModifier?: LabelModifier;

    protected static instanceCounter = 0;
    protected readonly instanceId = ++BaseHistogramComponent.instanceCounter;

    protected static DATE_FMT = 'dd.MM';
    protected static DATE_FMT_FULL = 'dd.MM.yyyy';
    protected static ASSUMED_CHAR_WIDTH = 8; // font size 12
    protected static ASSUMED_SMALL_CHAR_WIDTH = (8 / 12) * 10; // font size 10
    protected static POINTS_OF_INTEREST_MARGIN = 20;

    set data(data: T[]) {
        this._data = data;
        this.firstDate = data[0].date;
        this.lastDate = data[data.length - 1].date;
    }

    get data() {
        return this._data;
    }

    @Input()
    domainMin = 0;

    @Input()
    noOffsetX: boolean;

    @Input()
    domainMax?: number;

    @Input()
    yLabelFormatter?: (v: number) => string;

    @Input()
    yLabelsMaxLength?: number;

    @Input()
    pointsOfInterest: PointOfInterest[] = [];

    @Input()
    blocks: Block[] = [];

    @ViewChild(D3SvgComponent)
    svg: D3SvgComponent;

    firstDate: Date;

    lastDate: Date;

    protected abstract yMaxValue: number;
    protected abstract yTickCount: number;

    protected margin = { top: 0, right: 0, bottom: 0, left: 0 };
    protected bandWithX: number;
    protected paddingX: number;
    protected bandOffsetX: number;
    protected scaleBandX: ScaleBand<Date>;
    protected scaleTimeX: ScaleTime<number, number>;
    protected scaleLinearY: ScaleLinear<number, number>;
    protected dataGrp: Selection<SVGGElement, void, null, undefined>;
    protected xAxisGrp: Selection<SVGGElement, void, null, undefined>;
    protected xAxisLine: Selection<SVGLineElement, void, null, undefined>;
    protected yAxisGrp: Selection<SVGGElement, void, null, undefined>;
    protected pointsOfInterestGroup: Selection<
        SVGGElement,
        void,
        null,
        undefined
    >;
    protected blocksGroup: Selection<SVGGElement, void, null, undefined>;
    protected noDataBlocks: NoDataBlock<T>[];

    protected initialized = false;
    protected readonly onDestroy = new Subject<void>();

    private _data: T[];
    private calculatedYLabelsMaxLength: number;

    constructor(
        protected readonly platform: Platform,
        @Inject(DOCUMENT) protected readonly doc: Document
    ) {}

    ngOnChanges(changes: SimpleChanges) {
        if (
            isDefined(this.data) &&
            isDefined(this.yTickCount) &&
            isDefined(this.domainMin)
        ) {
            this.calculatedYLabelsMaxLength = this.calcYLabelsMaxLength();
        }
        if (this.initialized && this.svg.isVisible) {
            this.createScales();
            this.paint();
        }
        if (changes['xSubLabelModifier'] && this.xSubLabelModifier) {
            this.margin = { ...this.margin, bottom: this.margin.bottom + 30 };
        }
        if (changes['pointsOfInterest'] && this.pointsOfInterest.length > 0) {
            this.margin = {
                ...this.margin,
                top:
                    this.margin.top +
                    BaseHistogramComponent.POINTS_OF_INTEREST_MARGIN
            };
        }
    }

    ngAfterViewInit() {
        this.setupChart();
        // repaint$ completes on destroy, no need for takeUntil
        this.svg.repaint$.subscribe(() => {
            this.createScales();
            this.drawBlocks();
            this.paint();
            this.drawPointsOfInterest();
        });
        setTimeout(() => (this.initialized = true));
    }

    ngOnDestroy(): void {
        this.onDestroy.next();
        this.onDestroy.complete();
    }

    protected abstract paint(): void;

    protected setupChart(fontSize = 12) {
        this.blocksGroup = this.svg.svg.append('g').attr('class', 'blocks');
        this.yAxisGrp = this.svg.svg
            .append('g')
            .attr('class', 'y-axis')
            .attr('text-anchor', 'end')
            .attr('font-size', fontSize)
            .attr('fill', COLOR_CHART_TICK_TEXT);

        this.dataGrp = this.svg.svg
            .append('g')
            .attr('class', 'data')
            .attr('mask', this.svg.domainDataMask);

        this.xAxisGrp = this.svg.svg
            .append('g')
            .attr('class', 'x-axis')
            .attr('text-anchor', 'middle')
            .attr('font-size', fontSize);
        this.xAxisLine = this.svg.svg
            .append('line')
            .attr('class', 'x-axis-base');
    }

    protected createScales() {
        this.createScalesX();
        this.createScaleLinearY();
    }

    protected drawNoDataBlocks(
        blocks: NoDataBlock<T>[] = this.noDataBlocks,
        className: string = 'no-data',
        fill: string = this.svg.noDataFill
    ) {
        const range = this.scaleLinearY.range();
        this.dataGrp
            .selectAll(`rect.${className}`)
            .data(blocks)
            .join('rect')
            .attr('stroke', 'none')
            .attr('class', className)
            .attr(
                'x',
                ({ items }) =>
                    <number>this.scaleTimeX(middleOfDay(items[0].date)) -
                    this.bandWithX / 2
            )
            .attr(
                'width',
                ({ items }) =>
                    <number>(
                        this.scaleTimeX(
                            middleOfDay(items[items.length - 1].date)
                        )
                    ) -
                    <number>this.scaleTimeX(middleOfDay(items[0].date)) +
                    this.bandWithX
            )
            .attr('y', range[1])
            .attr('height', () => range[0] - range[1])
            .attr('fill', fill)
            .attr('opacity', 0.5);
    }

    protected drawFullXAxis() {
        const actualTickItems = this.data
            .filter((v, ix, arr) =>
                this.xLabelModifier.filter(v, ix, arr.length)
            )
            .map((v) => v.date);

        const axisGroups = this.xAxisGrp
            .selectAll('g')
            .data(actualTickItems, <any>((d: Date) => d.getTime()))
            .join((group) => {
                const g = group.append('g');
                g.append('line').attr('stroke', '#333333').attr('y2', 4);
                g.append('text')
                    .attr('dy', 18)
                    .attr('fill', '#333333')
                    .text((v: Date) => this.xLabelModifier.formatter(v));
                // add second line label
                if (this.xSubLabelModifier) {
                    g.append('text')
                        .attr('dy', 31)
                        .attr('fill', '#333333')
                        .attr('font-size', 10)
                        .text((v: Date, ix, arr) => {
                            if (
                                !!this.xSubLabelModifier!.filter(
                                    { date: v },
                                    ix,
                                    arr.length
                                )
                            ) {
                                return this.xSubLabelModifier!.formatter(v);
                            }
                            return '';
                        });
                }
                return g;
            })
            .attr(
                'transform',
                (v: Date) =>
                    `translate(${this.scaleTimeX(middleOfDay(v))}, ${
                        this.svg.height - this.margin.bottom
                    })`
            )
            .attr('opacity', null);

        const tickNodes = <SVGGElement[]>axisGroups.nodes();
        if (tickNodes.length >= 3) {
            this.displayNonIntersectingTickNodes(tickNodes);
        }
        this.updateXAxisBaseLine();
    }

    protected displayNonIntersectingTickNodes(tickNodes: SVGGElement[]): void {
        let nextIndex = 0;
        let currentNodes = tickNodes.slice(0, tickNodes.length);
        let lastNotIntersecting: SVGGElement = tickNodes[0];
        while (nextIndex <= tickNodes.length - 1) {
            let intersectIndex = 1;
            lastNotIntersecting.style.opacity = '1';

            while (
                intersectIndex < currentNodes.length &&
                checkIntersectLeft(
                    lastNotIntersecting.getBoundingClientRect(),
                    currentNodes[intersectIndex].getBoundingClientRect(),
                    2
                )
            ) {
                currentNodes[intersectIndex].style.opacity = '0';
                intersectIndex += 1;
            }

            nextIndex += intersectIndex;
            lastNotIntersecting = tickNodes[nextIndex];
            currentNodes = tickNodes.slice(nextIndex);
        }
    }

    protected drawPreviewYAxis(noData = false) {
        const domain = this.scaleLinearY.domain();
        const linesData = [(domain[1] - domain[0]) / 2, domain[1]];
        const labelsData = [domain[1]];
        const idFn = (v: number) => v;
        this.yAxisGrp
            .selectAll('line')
            .data(linesData, <any>idFn)
            .join('line')
            .attr('stroke', '#ddd')
            .attr('x', this.margin.left)
            .attr('x2', this.svg.width - this.margin.right)
            .attr(
                'transform',
                (v) => `translate(0, ${<number>this.scaleLinearY(v)})`
            );

        this.yAxisGrp
            .selectAll('text')
            .data(labelsData, <any>idFn)
            .join('text')
            .attr('dy', this.margin.top - 4)
            .text((v) =>
                noData ? 'n/A' : (this.yLabelFormatter || adminFormatNum)(v)
            );
    }

    protected drawNoDataLabel(showOrHide: boolean, text: string) {
        this.svg.svg
            .selectAll('text.no-data-lbl')
            .data(showOrHide ? [true] : [])
            .join('text')
            .attr('class', 'no-data-lbl')
            .attr('y', <number>this.scaleLinearY(this.yMaxValue / 2))
            .attr(
                'x',
                this.margin.left +
                    (this.svg.width - this.margin.left - this.margin.right) / 2
            )
            .attr('text-anchor', 'middle')
            .attr('font-size', 12)
            .attr('fill', COLOR_CHART_TICK_TEXT)
            .attr('dy', -12)
            .text(text);
    }

    protected drawFullYAxis() {
        const yAxisTicks = this.getYAxisTicks(this.scaleLinearY);
        const idFn = (v: number) => v;

        this.yAxisGrp
            .selectAll('g')
            .data(yAxisTicks, <any>idFn)
            .join(this.createFullYAxisTick, <any>this.updateFullYAxisTick);
    }

    protected updateFullYAxisTick = (
        g: Selection<SVGGElement, number, SVGGElement, void>
    ) => {
        g.attr('transform', (v) => `translate(0, ${this.scaleLinearY(v)})`);
        g.select('line')
            .attr('x1', this.margin.left - 2)
            .attr('x2', this.svg.width - this.margin.right);

        g.select('text')
            .attr('dx', this.margin.left - 4)
            .text((v) => (this.yLabelFormatter || adminFormatNum)(v));
        return g;
    };
    protected createFullYAxisTick = (
        group: Selection<EnterElement, number, SVGGElement, void>
    ) => {
        const g = group.append('g');
        g.append('line').attr('stroke', COLOR_CHART_TICK_LINE);
        g.append('text').attr('dy', 4);
        return this.updateFullYAxisTick(g);
    };

    protected updateXAxisBaseLine() {
        this.xAxisLine
            .attr('x1', this.margin.left)
            .attr('x2', this.svg.width - this.margin.right)
            .attr(
                'transform',
                `translate(0, ${this.svg.height - this.margin.bottom})`
            );
    }

    protected updateValueDomain(
        el: Selection<SVGRectElement, void, null, undefined>
    ) {
        el.attr('x', this.margin.left)
            .attr('y', this.margin.top)
            .attr(
                'width',
                this.svg.width - this.margin.left - this.margin.right
            )
            .attr(
                'height',
                this.svg.height - this.margin.top - this.margin.bottom
            );
    }

    /**
     * Creates a line to be drawn on the svg
     * @param valueFn function returning the value to be drawn
     * @param curveFactory define the shape of the line, the default value is linear.
     * See https://github.com/d3/d3-shape#curves for a complete list of options
     * @returns line to be drawn by d3
     */
    protected createLine(
        valueFn: (v: T) => number | null | undefined,
        curveFactory: CurveFactory = curveLinear
    ): Line<T> {
        return line<T>()
            .x(({ date }) => <number>this.scaleTimeX(middleOfDay(date)))
            .y((entry) => <number>this.scaleLinearY(valueFn(entry) || 0))
            .defined((entry) => isDefined(valueFn(entry)))
            .curve(curveFactory);
    }

    protected createArea(
        valueFn: (v: T) => number | null | undefined,
        y0: number
    ) {
        return area<T>()
            .x(({ date }) => <number>this.scaleTimeX(middleOfDay(date)))
            .y0(y0)
            .y1((entry) => <number>this.scaleLinearY(valueFn(entry) || 0))
            .defined((entry) => isDefined(valueFn(entry)));
    }

    protected getYLabelsMaxLength(): number {
        return this.yLabelsMaxLength || this.calculatedYLabelsMaxLength;
    }

    protected calcNoDataBlocks(
        skipValueTestFn: (v: T) => boolean
    ): NoDataBlock<T>[] {
        return this.data.reduce((u, item, ix) => {
            if (skipValueTestFn(item)) {
                // skip item if it matches the function
                return u;
            }
            const before = u[u.length - 1];
            if (before && before.to === ix - 1) {
                before.to = ix;
                before.items.push(item);
            } else {
                u.push({ from: ix, to: ix, items: [item] });
            }
            return u;
        }, <NoDataBlock<T>[]>[]);
    }

    private calcYLabelsMaxLength(): number {
        const scale = this.createScaleLinearYDomain();
        return Math.max(
            ...this.getYAxisTicks(scale)
                .map((v) => (this.yLabelFormatter || adminFormatNum)(v))
                .map((v) => v.length)
        );
    }

    private createScalesX() {
        const width = this.svg.width - this.margin.right;

        this.scaleBandX = scaleBand<Date>()
            .domain(this.data.map((entry) => middleOfDay(entry.date)))
            .range([this.margin.left, width]);

        const bandwidth = this.scaleBandX.bandwidth();

        const bandwidthForPadding = bandwidth;
        this.paddingX =
            bandwidthForPadding > 6 ? 2 : bandwidthForPadding > 4 ? 1 : 0;
        this.bandOffsetX = this.paddingX / 2;
        this.bandWithX = bandwidth - this.paddingX;

        const offset = this.noOffsetX ? 0 : bandwidth / 2;
        this.scaleTimeX = scaleTime()
            .domain([middleOfDay(this.firstDate), middleOfDay(this.lastDate)])
            .range([this.margin.left + offset, width - offset]);
    }

    private createScaleLinearY() {
        this.scaleLinearY = this.createScaleLinearYDomain().range([
            this.svg.height - this.margin.bottom,
            this.margin.top
        ]);
    }

    /** create basic scaleLinear for Y-Axis without range (domain only) */
    private createScaleLinearYDomain() {
        const domainMax = this.domainMax
            ? this.domainMax
            : calcDomainEnd(this.yMaxValue, this.yTickCount + 1);
        return scaleLinear().domain([this.domainMin, domainMax]);
    }

    protected getYAxisTicks(yScale: ScaleLinear<number, number>): number[] {
        return yScale.ticks(this.yTickCount);
    }

    protected drawPointsOfInterest(): void {
        this.pointsOfInterestGroup?.remove();
        this.pointsOfInterestGroup = this.svg.svg
            .append('g')
            .attr('class', 'points-of-interest');
        const topMargin =
            this.margin.top - BaseHistogramComponent.POINTS_OF_INTEREST_MARGIN; // remove the added margin from the top margin

        this.pointsOfInterest.forEach((point) => {
            const currentGroup = this.pointsOfInterestGroup
                .append('g')
                .attr(
                    'transform',
                    `translate(${<number>(
                        this.scaleTimeX(middleOfDay(point.date))
                    )}, ${topMargin})`
                );
            currentGroup
                .append('text')
                .attr('dy', -4)
                .attr('dx', -4)
                .attr('class', 'point-of-interest-label')
                .text(point.pointNumber);
            currentGroup
                .append('line')
                .attr('x1', 0)
                .attr('y1', 0)
                .attr('x2', 0)
                .attr('y2', this.svg.height - topMargin - this.margin.bottom)
                .style('stroke-width', 1)
                .style('stroke-dasharray', '4 1')
                .style('stroke', 'black')
                .style('fill', 'none')
                .style('opacity', 0.5);
        });
    }

    protected drawBlocks(): void {
        this.blocksGroup.selectAll('.block').remove();
        this.blocks.forEach((block) => {
            const startPoint = this.scaleTimeX(middleOfDay(block.startDate));
            const endPoint = this.scaleTimeX(middleOfDay(block.endDate));
            const blockWidth = endPoint - startPoint;

            this.blocksGroup
                .append('rect')
                .attr('class', 'block')
                .attr('x', startPoint)
                .attr('y', this.margin.top)
                .attr('width', blockWidth)
                .attr(
                    'height',
                    this.scaleLinearY(this.domainMin ?? 0) - this.margin.top // subtract the top margin as the starting point is not 0 but the top margin
                )
                .attr('fill', block.color);
        });
    }
}

import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import {
    AfterViewInit,
    Component,
    EventEmitter,
    Inject,
    Input,
    NgZone,
    OnChanges,
    OnDestroy,
    Output,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import {
    area,
    BaseType,
    BrushBehavior,
    BrushSelection,
    brushX,
    CurveFactory,
    curveLinear,
    D3BrushEvent,
    select as d3Select,
    EnterElement,
    Line,
    line,
    scaleBand,
    ScaleBand,
    scaleLinear,
    ScaleLinear,
    scaleTime,
    ScaleTime,
    Selection,
    ValueFn
} from 'd3';
import { Subject } from 'rxjs';
import { isDefined } from '../../xternal-helpers/from-c19-commons/utils/is-defined.function';

import {
    COLOR_CHART_TICK_LINE,
    COLOR_CHART_TICK_TEXT
} from '../../commons/colors.const';

import { differenceInDays } from 'date-fns';
import i18next from 'i18next';
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
    PointOfInterest,
    PointOfInterestWithLabels,
    PointsOfInterestBlock
} from './base-histogram.model';

export interface DateSpanSelection {
    start: Date;
    end: Date;
}

export const dateKeyFn = (v: HistogramEntry) => v.date.getTime();

function isSameDate(date: Date, refDate: Date | undefined | null) {
    return date.getTime() === refDate?.getTime();
}

export const BRUSH_SELECTION_DEFAULT_MIN_DIFFERENCE_DAILY = 13; // start + diff = end = 14d
export const BRUSH_SELECTION_DEFAULT_MIN_DIFFERENCE_WEEKLY = 56;

export const BRUSH_SELECTION_DEFAULT_SELECTION_SPAN = 84; // default selection 12w (for every brush selection)

export interface BrushSelectionConfig {
    minDifferenceInDays: number;
}

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

    @Input() second_y_axis?: boolean = false;

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

    // enabled when the config is defined & an initial brushSelection is set
    get hasBrushSelection(): boolean {
        return !!this.brushSelectionConfig && isDefined(this.brushSelection);
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
    hideYLabels?: boolean = false;

    @Input()
    yLabelsMaxLength?: number;

    @Input() brushSelectionConfig: BrushSelectionConfig;

    @Input() set brushSelection(v: DateSpanSelection) {
        this._brushSelection = v;
    }

    get brushSelection(): DateSpanSelection {
        return this._brushSelection;
    }

    /** emits whenever the brush selection changes */
    @Output() readonly brushSelectionChange =
        new EventEmitter<DateSpanSelection>();
    /** emits after the user stopped dragging the brush selection */
    @Output() readonly brushSelectionEnd =
        new EventEmitter<DateSpanSelection>();

    @Input()
    pointsOfInterest: PointOfInterest[] = [];

    @Input()
    pointsOfInterestWithLabels: PointOfInterestWithLabels[] = [];

    @Input()
    pointsOfInterestBlocks: PointsOfInterestBlock[] = [];

    @Input()
    blocks: Block[] = [];

    @ViewChild(D3SvgComponent)
    svg: D3SvgComponent;

    firstDate: Date;
    lastDate: Date;

    private _brushSelection: DateSpanSelection;
    private prevBrush: DateSpanSelection | null = null;
    private prevBrushEnd: DateSpanSelection | null = null;

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
    protected yAxisGrp2: Selection<SVGGElement, void, null, undefined>;
    protected pointsOfInterestGroup: Selection<
        SVGGElement,
        void,
        null,
        undefined
    >;
    // TODO: needed?
    protected pointsOfInterestGroupWithLabels: Selection<
        SVGGElement,
        void,
        null,
        undefined
    >;

    protected brushGrp: Selection<SVGGElement, void, null, undefined>;
    protected brush: BrushBehavior<any>;

    protected blocksGroup: Selection<SVGGElement, void, null, undefined>;
    protected noDataBlocks: NoDataBlock<T>[];

    protected initialized = false;
    protected readonly onDestroy = new Subject<void>();

    private _data: T[];
    private calculatedYLabelsMaxLength: number;

    constructor(
        protected readonly platform: Platform,
        protected readonly ngZone: NgZone,
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
        if (
            changes['xSubLabelModifier'] &&
            !changes['xSubLabelModifier']?.previousValue &&
            this.xSubLabelModifier
        ) {
            this.margin = { ...this.margin, bottom: this.margin.bottom + 30 };
        } else if (
            changes['xSubLabelModifier'] &&
            changes['xSubLabelModifier']?.previousValue &&
            !this.xSubLabelModifier
        ) {
            this.margin = { ...this.margin, bottom: this.margin.bottom - 30 };
        }
        if (changes['pointsOfInterest'] && this.pointsOfInterest.length > 0) {
            this.margin = {
                ...this.margin,
                top:
                    this.margin.top +
                    BaseHistogramComponent.POINTS_OF_INTEREST_MARGIN
            };
        }
        if (changes['pointsOfInterestBlocks']) {
            this.drawPointsOfInterestBlocks();
        }
    }

    ngAfterViewInit(): void {
        this.setupChart();
        // repaint$ completes on destroy, no need for takeUntil
        this.svg.repaint$.subscribe(() => {
            this.createScales();
            this.drawBlocks();
            this.paint();
            //TODO: find better solution, they overwrite each other
            if (this.pointsOfInterest.length > 0) {
                this.drawPointsOfInterest();
            } else {
                this.drawPointsOfInterestWithLabels();
            }
            if (this.pointsOfInterestBlocks.length > 0) {
                this.drawPointsOfInterestBlocks();
            }
        });
        setTimeout(() => (this.initialized = true));
    }

    ngOnDestroy(): void {
        this.onDestroy.next();
        this.onDestroy.complete();
    }

    protected abstract paint(): void;

    protected setupChart(fontSize = 12): void {
        this.blocksGroup = this.svg.svg.append('g').attr('class', 'blocks');
        this.yAxisGrp = this.svg.svg
            .append('g')
            .attr('class', 'y-axis-1')
            .attr('text-anchor', 'end')
            .attr('font-size', fontSize)
            .attr('fill', COLOR_CHART_TICK_TEXT);

        if (this.second_y_axis) {
            this.yAxisGrp2 = this.svg.svg
                .append('g')
                .attr('class', 'y-axis-2')
                .attr('text-anchor', 'start')
                .attr('font-size', fontSize)
                .attr('fill', COLOR_CHART_TICK_TEXT);
        }

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

    protected drawFullXAxis(): void {
        const fontSize: number = 10;

        const actualTickItems: Date[] = this.data
            .filter((v, ix, arr) =>
                this.xLabelModifier.filter(v, ix, arr.length)
            )
            .map((v) => v.date);

        const axisGroups = this.xAxisGrp
            .selectAll('g')
            .data(actualTickItems, <any>((d: Date) => d.getTime()))
            .join(
                (group) => {
                    const g = group.append('g');
                    g.append('line').attr('stroke', '#333333').attr('y2', 4);
                    g.append('text')
                        .attr('class', 'tick-label')
                        .attr('dy', 18)
                        .attr('fill', '#333333')
                        .text((v: Date) => this.xLabelModifier.formatter(v));
                    // add second line label
                    if (this.xSubLabelModifier) {
                        g.append('text')
                            .attr('class', 'tick-sub-label')
                            .attr('dy', 31)
                            .attr('fill', '#333333')
                            .attr('font-size', fontSize)
                            .text(this.filterAndFormatSubLabelElement);
                    }
                    return g;
                },
                (elem) => {
                    const label = elem.select('.tick-label');
                    label.text((v: Date) => this.xLabelModifier.formatter(v));

                    const subLabel = elem.select('.tick-sub-label');
                    if (subLabel && this.xSubLabelModifier) {
                        subLabel.text(this.filterAndFormatSubLabelElement);
                    }
                    return elem;
                }
            )
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

    private filterAndFormatSubLabelElement: ValueFn<BaseType, Date, string> = (
        v,
        ix,
        arr
    ) => {
        const isStillValid = this.xSubLabelModifier!.filter(
            { date: v },
            ix,
            arr.length
        );
        return isStillValid ? this.xSubLabelModifier!.formatter(v) : '';
    };

    protected drawBrushSelection() {
        if (!this.brush) {
            this.setupBrushSelection();
        }

        // first we need to update the extent of the brush itself (similar to a scale)
        this.updateBrushAndBrushGroup();

        const [start, end] = [
            middleOfDay(this.brushSelection.start),
            middleOfDay(this.brushSelection.end)
        ];

        this.prevBrush = { start, end };
        this.moveBrushSelection({ start, end });
    }

    /** update the brush and it's svg group */
    private updateBrushAndBrushGroup() {
        const height = this.svg.height - this.margin.top;
        const [xMin, xMax] = this.scaleTimeX.range();
        this.brush.extent([
            [xMin, 0],
            [xMax, height]
        ]);
        this.brushGrp
            .attr('x1', this.margin.left)
            .attr('x2', xMax)
            .attr('transform', `translate(0, ${this.margin.top})`)
            .raise();
    }

    private setupBrushSelection() {
        this.brushGrp = this.svg.svg.append('g').attr('class', 'brush');
        this.brush = brushX();

        this.updateBrushAndBrushGroup();

        this.brush.on('start brush end', (ev: any) => {
            const event = <D3BrushEvent<any>>ev;
            if (event.sourceEvent && event.selection) {
                const [start0, end0] = this.invertBrushSelection(
                    event.selection
                );
                const [start, end] = this.validateBrushSelection(start0, end0);

                if (!isSameDate(start0, start) || !isSameDate(end0, end)) {
                    // something was invalid, we need to update the brush selection
                    this.moveBrushSelection({ start, end });
                }
                if (
                    !isSameDate(start, this.prevBrush?.start) ||
                    !isSameDate(end, this.prevBrush?.end)
                ) {
                    // actual change to previous SelectionChangeEvent
                    this.ngZone.run(() =>
                        this.emitBrushSelectionChange({ start, end })
                    );
                }
                // fixme: somehow the emitted EndEvent has a different time the previous emitted change event. should be the same time (mid of day)
                if (
                    event.type === 'end' &&
                    (!isSameDate(start, this.prevBrushEnd?.start) ||
                        !isSameDate(end, this.prevBrushEnd?.end))
                ) {
                    // actual change to previous SelectionEndEvent
                    this.ngZone.run(() =>
                        this.emitBrushSelectionEnd({ start, end })
                    );
                }

                // Update the position of the custom brush handles
                this.updateBrushHandles();
            }
        });

        this.brushGrp.call(this.brush);
        this.brushGrp
            .select('.selection')
            .attr('fill', 'rgba(89, 105, 120, .4)');
        this.setupBrushHandles();
    }

    private moveBrushSelection({ start, end }: DateSpanSelection) {
        const selection: BrushSelection = [
            <number>this.scaleTimeX(start),
            <number>this.scaleTimeX(end)
        ];
        this.brush.move(this.brushGrp, selection);
        this.updateBrushHandles();
    }

    private setupBrushHandles() {
        const handleColor = 'black';
        this.brushGrp
            .append('g')
            .attr('class', 'handle-visual handle-visual--w');
        this.brushGrp
            .append('g')
            .attr('class', 'handle-visual handle-visual--e');

        const handles = this.brushGrp
            .selectAll('.handle-visual')
            .attr('width', 6);

        // Add vertical lines
        const lineWidth = 1;
        handles
            .append('rect')
            .attr('fill', handleColor)
            .attr('width', lineWidth)
            .attr('height', '100%')
            .attr('x', -lineWidth / 2);

        // Add circles at bottom of handle
        const circleRadius = 3.5;
        const bottom = this.svg.height - this.margin.top - circleRadius;
        handles
            .append('circle')
            .attr('r', circleRadius)
            .attr('cy', bottom)
            .attr('fill', handleColor);

        // Raise the actual grabbable handle
        this.brushGrp.selectAll('.handle').raise();

        this.updateBrushHandles();
    }

    private updateBrushHandles() {
        const selection = this.brushGrp.select('.selection');
        const selectionStart = parseFloat(selection.attr('x'));
        const selectionEnd =
            parseFloat(selection.attr('width')) + selectionStart;

        this.brushGrp
            .select('.handle-visual--w')
            .style('transform', `translate(${selectionStart}px)`);
        this.brushGrp
            .select('.handle-visual--e')
            .style('transform', `translate(${selectionEnd}px)`);
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
        if (this.hideYLabels) return;
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
        if (this.hideYLabels) return g;
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
        if (this.hideYLabels) return 0;
        return this.yLabelsMaxLength || this.calculatedYLabelsMaxLength;
    }

    protected calcNoDataBlocks(
        skipValueTestFn: (v: T) => boolean
    ): NoDataBlock<T>[] {
        return this.data.reduce(
            (u, item, ix) => {
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
            },
            <NoDataBlock<T>[]>[]
        );
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

    private readonly invertBrushSelection = (
        selection: BrushSelection
    ): [start: Date, end: Date] => {
        // move selection to positions
        return [
            middleOfDay(this.scaleTimeX.invert(<any>selection[0])),
            middleOfDay(this.scaleTimeX.invert(<any>selection[1]))
        ];
    };

    private validateBrushSelection(
        start: Date,
        end: Date
    ): [start: Date, end: Date] {
        start =
            start < middleOfDay(this.firstDate)
                ? middleOfDay(this.firstDate)
                : start;
        end =
            end > middleOfDay(this.lastDate) ? middleOfDay(this.lastDate) : end;

        const diff = differenceInDays(end, start);

        if (diff < this.brushSelectionConfig.minDifferenceInDays) {
            return this.prevBrush
                ? [this.prevBrush.start, this.prevBrush.end]
                : [middleOfDay(this.firstDate), middleOfDay(this.lastDate)];
        }
        return [start, end];
    }

    private emitBrushSelectionChange(value: DateSpanSelection) {
        this.prevBrush = value;
        this.brushSelectionChange.next(value);
    }

    private emitBrushSelectionEnd(value: DateSpanSelection) {
        this.prevBrushEnd = value;
        this.brushSelectionEnd.next(value);
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

    // TODO: labels not really centered, simplify?
    protected drawPointsOfInterestWithLabels(): void {
        this.pointsOfInterestGroup?.remove();
        this.pointsOfInterestGroup = this.svg.svg
            .append('g')
            .attr('class', 'points-of-interest-with-labels');
        const topMargin: number =
            this.margin.top - BaseHistogramComponent.POINTS_OF_INTEREST_MARGIN;

        this.pointsOfInterestWithLabels.forEach((point) => {
            const x: number = this.scaleTimeX(middleOfDay(point.date));
            const y: number = topMargin;
            const height: number =
                this.svg.height - topMargin - this.margin.bottom;

            // properties
            let charWidth: number = 5;
            const labelMarginTop: number = 10;
            let labelMarginSide: number = 7;
            let fontSize: string = '11px';

            if (this.svg.width < 400) {
                fontSize = '8px';
                charWidth = 3.5;
                labelMarginSide = 3;
            }

            const currentGroup = this.pointsOfInterestGroup
                .append('g')
                .attr('transform', `translate(${x}, ${y})`);

            // draw line
            currentGroup
                .append('line')
                .attr('x1', 0)
                .attr('y1', 0)
                .attr('x2', 0)
                .attr('y2', height)
                .style('stroke-width', 1)
                .style('stroke-dasharray', '4 1')
                .style('stroke', 'black')
                .style('fill', 'none')
                .style('opacity', 0.75);

            // top label
            currentGroup
                .append('text')
                .attr('class', 'point-of-interest-top-label')
                .attr('dy', 0)
                .attr('dx', (point.topLabel.length * -charWidth) / 2)
                .attr('font-size', fontSize)
                .text(point.topLabel);

            // left label
            currentGroup
                .append('text')
                .attr('class', 'point-of-interest-left-label')
                .attr('dy', labelMarginTop)
                .attr(
                    'dx',
                    -point.leftLabel.length * charWidth - labelMarginSide
                )
                .attr('font-size', fontSize)
                .text(point.leftLabel);

            // right label
            currentGroup
                .append('text')
                .attr('class', 'point-of-interest-right-label')
                .attr('dy', labelMarginTop)
                .attr('dx', labelMarginSide)
                .attr('font-size', fontSize)
                .text(point.rightLabel);
        });
    }

    protected drawPointsOfInterestBlocks(): void {
        // select the element after the actual svg because if we select with the class selector, we take all of them in the DOM
        const svgNode = this.svg?.svg?.node();
        if (svgNode && svgNode.nextSibling) {
            const nextElement = svgNode.nextSibling as HTMLElement;
            let divContainer = d3Select(nextElement);

            // set the required height
            const rectHeight = 26;
            const legendItemMargin = 20;
            const numLegendItems = this.pointsOfInterestBlocks.length;
            const requiredHeight =
                rectHeight + legendItemMargin * numLegendItems;

            // Check if the SVG already exists
            if (
                divContainer
                    .select<HTMLElement>('svg.points-of-interest-blocks')
                    .empty()
            ) {
                // If it doesn't exist, append it
                divContainer = divContainer
                    .append<HTMLElement>('svg')
                    .attr('class', 'points-of-interest-blocks')
                    .attr('width', '100%')
                    .attr('position', 'absolute')
                    .attr('overflow', 'visible')
                    .attr(
                        'viewBox',
                        `0 0 ${divContainer.node()?.getBoundingClientRect()
                            .width} ${requiredHeight}`
                    );
            } else {
                // If it does exist, select it
                divContainer = divContainer.select<HTMLElement>(
                    'svg.points-of-interest-blocks'
                );
            }

            // remove blocks and legend if existing
            divContainer.selectAll('.blocks').remove();
            divContainer.selectAll('.legend').remove();

            const poiBlockContainer = divContainer
                .append('g')
                .attr('class', 'blocks');

            // add blocks
            this.pointsOfInterestBlocks.forEach((block, index) => {
                const startPoint = this.scaleTimeX(block.startDate);
                const endPoint = this.scaleTimeX(block.endDate);
                const blockWidth = endPoint - startPoint;

                poiBlockContainer
                    .append('rect')
                    .attr('x', startPoint)
                    .attr('y', 0)
                    .attr('width', blockWidth)
                    .attr('height', rectHeight)
                    .attr('fill', block.color);

                poiBlockContainer
                    .append('text')
                    .attr('x', startPoint + blockWidth / 2)
                    .attr('y', 18)
                    .attr('width', blockWidth)
                    .attr('fill', block.textColor || '#000000')
                    .attr('font-size', 14)
                    .attr('text-anchor', 'middle')
                    .attr('text-align', 'center')
                    .text(index + 1);

                // Draw line to the left of the box
                poiBlockContainer
                    .append('line')
                    .attr('x1', startPoint)
                    .attr('y1', rectHeight)
                    .attr('x2', startPoint)
                    .attr('y2', -block.startPosition)
                    .attr('stroke', 'black');

                // Draw line to the right of the box
                poiBlockContainer
                    .append('line')
                    .attr('x1', endPoint)
                    .attr('y1', rectHeight)
                    .attr('x2', endPoint)
                    .attr('y2', -block.endPosition)
                    .attr('stroke', 'black');
            });

            // draw the legend for the blocks
            const legendContainer = divContainer
                .append('g')
                .attr('class', 'legend')
                .attr('transform', `translate(0,30)`);

            this.pointsOfInterestBlocks.forEach((block, index) => {
                const legendItem = legendContainer
                    .append('g')
                    .attr(
                        'transform',
                        `translate(15,${index * legendItemMargin})`
                    );

                legendItem
                    .append('circle')
                    .attr('cy', 6)
                    .attr('cx', 6)
                    .attr('r', 8)
                    .attr('fill', '#D9D9D9');

                legendItem
                    .append('text')
                    .attr('x', 3)
                    .attr('y', 10)
                    .attr('font-size', 12)
                    .text(index + 1);

                legendItem
                    .append('text')
                    .attr('x', 20)
                    .attr('y', 10)
                    .attr('font-size', 10)
                    .attr('fill', '#636363')
                    .text(this.getYearRange(block.startDate, block.endDate));

                legendItem
                    .append('text')
                    .attr('x', 80)
                    .attr('y', 10)
                    .attr('font-size', 10)
                    .text(block.text);
            });
        }
    }

    getYearRange(start: Date, end: Date): string {
        const currentYear = new Date().getFullYear();
        const startYear = start.getFullYear();
        const endYear = end.getFullYear();

        if (startYear === currentYear) {
            return i18next.t('commons.from', { date: startYear.toString() });
        } else {
            return `${startYear} - ${endYear}`;
        }
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

import {
    AfterViewInit,
    Component,
    Input,
    OnChanges,
    SimpleChanges,
    ViewEncapsulation
} from '@angular/core';
import { isDefined } from '../../../xternal-helpers/from-c19-commons/utils/is-defined.function';

import { Line, Selection } from 'd3';
import { COLORS_HISTOGRAM_LINE } from '../../../commons/colors.const';
import { middleOfDay } from '../../../static-utils/date-utils';
import { createRangePathArea } from '../../utils';
import { Band, HistogramEntry } from '../base-histogram.model';
import { InteractiveHistogramComponent } from '../interactive-histogram.component';

export interface HistogramLineEntry extends HistogramEntry {
    values: (number | null)[];
    band?: Band | null;
}

@Component({
    selector: 'bfe-histogram-line',
    templateUrl: './histogram-line.component.html',
    styleUrls: ['./histogram-line.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HistogramLineComponent<T extends HistogramLineEntry>
    extends InteractiveHistogramComponent<T>
    implements AfterViewInit, OnChanges
{
    @Input()
    showNoData?: boolean;

    @Input()
    showNoDataKey = 'Commons.NoData';

    @Input()
    bandColor: string = '#0045AD';

    @Input()
    override set data(data: T[]) {
        super.data = data;
        let max = Math.max(
            ...data.reduce(
                (u, i) => [...u, ...i.values.map((v) => v || 0)],
                [0]
            )
        );
        var upperBands = data
            .map((x) => x.band)
            .map((x) => x?.upper)
            .filter((x) => x) as number[];
        if (upperBands.length > 0) {
            const upperBandMax = Math.max(...upperBands.map((o) => o), 0);
            if (upperBandMax > max) {
                max = upperBandMax;
            }
        }

        this.yMaxValue = max === 0 ? 1 : max;
        this.lineFunctions = new Array(
            this.data.reduce((u, i) => Math.max(u, i.values.length), 0)
        )
            .fill(0)
            .map((_, ix) => this.createLine((v) => v.values[ix]));
    }

    override get data() {
        return super.data;
    }

    @Input()
    set colors(value: string[]) {
        this._colors = value;
    }

    get colors() {
        return this._colors || COLORS_HISTOGRAM_LINE;
    }

    @Input()
    focusPosYCenter?: boolean;

    @Input()
    spanGaps?: boolean[];

    @Input()
    dashedLines?: Array<string | null>;

    @Input()
    disableNoDataBlocks: boolean;

    @Input()
    skipNoDataBlocksBefore: Date | null;

    @Input()
    skipNoDataBlocksAfter: Date | null;

    @Input()
    strokeWidths: number | number[];

    // REMARK: Was protected necessary?
    @Input()
    yTickCount = 4;

    @Input()
    maxHeight?: number | null;

    get svgMaxHeight(): string | null {
        return this.maxHeight ? `${this.maxHeight}px` : null;
    }

    get svgMinHeight(): string {
        const min = this.maxHeight ? Math.min(312, this.maxHeight) : 312;
        return `${min}px`;
    }

    get svgRatio(): [number, number] | null {
        return this.maxHeight ? null : [994, 312];
    }

    protected yMaxValue: number;
    @Input()
    override margin = { top: 20, bottom: 30, left: 0, right: 12 };
    protected focusGuideGroup: Selection<SVGGElement, void, null, undefined>;
    protected valueDomainRect: Selection<SVGRectElement, void, null, undefined>;
    protected lineFunctions: Array<Line<T>>;
    protected upperLowerRangePath: Selection<
        SVGPathElement,
        void,
        null,
        undefined
    >;

    protected _colors: string[];

    override ngOnChanges(changes: SimpleChanges) {
        if (this.data) {
            const testFn = (v: T): boolean =>
                v.values.some(isDefined) ||
                (!!this.skipNoDataBlocksBefore &&
                    v.date < this.skipNoDataBlocksBefore) ||
                (!!this.skipNoDataBlocksAfter &&
                    v.date > this.skipNoDataBlocksAfter);
            this.noDataBlocks = this.calcNoDataBlocks(testFn);
        }
        // super.ngOnChanges repaints, noDataBlocks need to be set before repaint
        super.ngOnChanges(changes);
    }

    protected override setupChart() {
        super.setupChart();
        // order matters since we call the raise() method, which moves the chosen element in the dom
        this.xAxisLine.attr('stroke', 'currentColor');

        this.dataGrp
            .attr('fill', 'none')
            .attr('stroke', 'none')
            .attr('stroke-linecap', 'round')
            .attr('stroke-linejoin', 'round')
            .raise();

        this.upperLowerRangePath = this.dataGrp
            .append('g')
            .attr('class', 'range')
            .append('path')
            .attr('fill', this.bandColor)
            .lower();

        this.focusGuideGroup = this.svg.svg
            .append('g')
            .attr('class', 'focus-guide');

        this.valueDomainRect = this.svg.svg
            .append('rect')
            .attr('fill', 'transparent')
            .attr('stroke', 'none')
            .raise();
    }

    protected override createScales() {
        const marginLeft = this.margin.left
            ? this.margin.left
            : 8 +
              this.getYLabelsMaxLength() *
                  HistogramLineComponent.ASSUMED_CHAR_WIDTH;

        this.margin = {
            ...this.margin,
            left: marginLeft
        };
        super.createScales();
    }

    protected paint() {
        if (!this.disableNoDataBlocks) {
            this.drawNoDataBlocks();
        }
        this.drawFullXAxis();
        this.drawFullYAxis();
        this.drawRange();
        this.drawLines();
        if (this.hasBrushSelection) {
            this.drawBrushSelection();
        }
        this.updateValueDomain(this.valueDomainRect);
    }

    protected drawLines() {
        const data = this.lineFunctions.map((lineFn, ix) => ({
            line: <string>(
                lineFn(
                    this.spanGaps && this.spanGaps[ix]
                        ? this.data.filter((e) => isDefined(e.values[ix]))
                        : this.data
                )
            ),
            color: this.colors[ix],
            strokeWidths: Array.isArray(this.strokeWidths)
                ? this.strokeWidths[ix]
                : this.strokeWidths ?? 4,
            strokeDashArray:
                this.dashedLines && this.dashedLines[ix]
                    ? this.dashedLines[ix]
                    : null
        }));

        this.dataGrp
            .selectAll('path.line')
            .data(data)
            .join('path')
            .attr('class', 'line')
            .attr('d', ({ line }) => line)
            .attr('stroke', ({ color }) => color)
            .attr('stroke-width', ({ strokeWidths }) => strokeWidths)
            .attr('stroke-dasharray', ({ strokeDashArray }) => strokeDashArray)
            .append('circle')
            .attr('cx', 10)
            .attr('cy', 10)
            .attr('r', 10)
            .style('fill', 'green');
    }

    protected drawRange() {
        this.upperLowerRangePath.attr(
            'd',
            createRangePathArea(this.data, this.scaleTimeX, this.scaleLinearY)
        );
    }

    protected mapToEventAndTooltipData([x, item]: [number, T]): [DOMPoint, T] {
        const range = this.scaleLinearY.range();

        const firstDefinedVal = item.values.find(isDefined);
        const y =
            this.focusPosYCenter || !isDefined(firstDefinedVal)
                ? (range[0] - range[1]) / 2
                : <number>this.scaleLinearY(firstDefinedVal);

        const point = this.svg.svgEl.createSVGPoint();
        point.x = x;
        point.y = y;
        const source: DOMPoint = point.matrixTransform(
            <DOMMatrixInit>this.svg.svgEl.getScreenCTM()
        );
        return [source, item];
    }

    protected override setElIntoFocus([source, data]: [DOMPoint, T]) {
        super.setElIntoFocus([source, data]);
        this.drawFocusGuide(data);
    }

    protected override focusLost() {
        super.focusLost();
        this.focusGuideGroup.attr('opacity', 0);
    }

    protected getFocusPointColor = (val: any, ix: number): string =>
        this.colors[ix] || 'black';

    protected drawFocusGuide(item: T) {
        const x = <number>this.scaleTimeX(middleOfDay(item.date));
        this.focusGuideGroup
            .attr('opacity', null)
            .attr('transform', `translate(${x}, 0)`);

        this.focusGuideGroup
            .selectAll('line')
            .data([1])
            .join((s) =>
                s
                    .append('line')
                    .attr('stroke', 'currentColor')
                    .attr('stroke-width', 2)
            )
            .attr('y1', this.margin.top)
            .attr('y2', this.svg.height - this.margin.bottom);

        this.focusGuideGroup
            .selectAll('circle')
            .data(item.values)
            .join((s) =>
                s.append('circle').attr('r', 5).attr('stroke-width', 3)
            )
            .attr('cy', (v) => <number>this.scaleLinearY(v || 0))
            .attr('opacity', (v) => (isDefined(v) ? null : 0))
            .attr('fill', this.getFocusPointColor);
    }

    protected drawHighlightYTickAt(val: number) {
        const idFn = (v: number) => v;

        const tickAt1 = this.yAxisGrp
            .selectAll('g')
            .data([val], <any>idFn)
            // important: empty 'exitFn' otherwise the existing lines would be removed
            .join(
                this.createFullYAxisTick,
                <any>this.updateFullYAxisTick,
                () => {}
            );

        tickAt1
            .select('line')
            .attr('stroke', '#000')
            .attr('stroke-dasharray', '8 2');
        tickAt1.select('text').attr('fill', '#000').attr('font-weight', 'bold');
    }
}

import {
    Component,
    Input,
    OnChanges,
    SimpleChanges,
    ViewEncapsulation
} from '@angular/core';
import { Line, Selection } from 'd3';
import { isSameDay } from 'date-fns';
import {
    COLORS_HISTOGRAM_DEFAULT,
    COLOR_CHART_NO_DATA
} from '../../../commons/colors.const';
import { isDefined } from '../../../xternal-helpers/from-c19-commons/utils/is-defined.function';
import { hexToRgb, rgbToHex } from '../../utils';
import {
    dateKeyFn,
    HistogramEntry,
    middleOfDay,
    NoDataBlock
} from '../base-histogram.component';
import { InteractiveHistogramComponent } from '../interactive-histogram.component';

export interface HistogramDetailEntry extends HistogramEntry {
    barValues: Array<number | null>;
    lineValues: Array<number | null>;
    exists?: boolean;
}

export type LineStyle = 'solid' | 'dashed';

const sum = (u: number, i: number | null | undefined): number => u + (i || 0);

@Component({
    selector: 'bfe-histogram-detail',
    templateUrl: './histogram-detail.component.html',
    styleUrls: ['./histogram-detail.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HistogramDetailComponent<T extends HistogramDetailEntry>
    extends InteractiveHistogramComponent<T>
    implements OnChanges
{
    @Input() titleKey?: string;

    @Input()
    override set data(data: T[]) {
        super.data = data;
        // create d3-lineFunction per line so we can iterate over them in the d3 `.data(...)` style
        this.lineFunctions = new Array(
            this.data.reduce((u, i) => Math.max(u, i.lineValues.length), 0)
        )
            .fill(0)
            .map((_, ix) => [ix, this.createLine((v) => v.lineValues[ix])]);
        this.yMaxValue =
            Math.max(
                ...data.reduce(
                    (u, i) => [
                        ...u,
                        i.barValues.reduce(sum, 0),
                        ...i.lineValues.map((v) => v || 0)
                    ],
                    <number[]>[]
                )
            ) || 1;
    }

    override get data() {
        return super.data;
    }

    @Input()
    set barColors(colors: string[]) {
        this._barColors = colors;
        this.barHoverColors = colors
            .map(
                (c) =>
                    <[number, number, number]>(
                        hexToRgb(c.startsWith('url') ? '#FFFFFF' : c).map((v) =>
                            Math.round(v * 0.85)
                        )
                    )
            )
            .map(rgbToHex);
    }

    get barColors(): string[] {
        return this._barColors;
    }

    @Input()
    patternBgColor?: string | null | undefined;

    barHoverColors: string[];

    @Input()
    lineColors: string[];

    @Input()
    lineThickness: number[];

    @Input()
    lineStyle: LineStyle[];

    @Input()
    override barchartAlignHoverOfBar: number = 0;
    // this is needed so that the hoover is in the middle of the bar and not at the start

    @Input()
    skipNoDataBlocksBefore: Date | null;

    @Input()
    skipNoDataBlocksAfter: Date | null;

    @Input()
    barOpacity = 0.8;

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
    override margin = { top: 20, bottom: 20, left: 0, right: 8 };

    protected linesGroup: Selection<SVGGElement, void, null, void>;
    protected valueDomainRect: Selection<SVGRectElement, void, null, undefined>;
    protected lineFunctions: Array<[number, Line<T>]>;

    private notExistingBlocks: NoDataBlock<T>[];
    private _barColors: string[] = COLORS_HISTOGRAM_DEFAULT;

    override ngOnChanges(changes: SimpleChanges) {
        if (this.data) {
            const doesExistsFn = (v: T): boolean => v.exists ?? true; // true if not set
            const hasDataFn = (v: T): boolean =>
                !doesExistsFn(v) || // exclude entries, which are displayed as not existing
                v.barValues.some(isDefined) ||
                (!!this.skipNoDataBlocksBefore &&
                    v.date < this.skipNoDataBlocksBefore) ||
                (!!this.skipNoDataBlocksAfter &&
                    v.date > this.skipNoDataBlocksAfter);

            this.noDataBlocks = this.calcNoDataBlocks(hasDataFn);
            this.notExistingBlocks = this.calcNoDataBlocks(doesExistsFn);
        }

        // super.ngOnChanges repaints, noDataBlocks need to be set before repaint
        super.ngOnChanges(changes);
    }

    protected override setupChart() {
        super.setupChart();

        this.dataGrp
            .attr('shape-rendering', 'crispEdges')
            .attr('opacity', this.barOpacity);

        this.xAxisLine.attr('stroke', 'currentColor');

        this.linesGroup = this.svg.svg
            .append('g')
            .attr('fill', 'none')
            .attr('stroke-linecap', 'round')
            .attr('stroke-linejoin', 'round')
            .attr(
                'transform',
                `translate(${this.barchartAlignHoverOfBar} , 0)`
            );

        this.valueDomainRect = this.svg.svg
            .append('rect')
            .attr('fill', 'transparent')
            .attr('stroke', 'none');
    }

    protected override createScales() {
        this.margin = {
            ...this.margin,
            left:
                this.getYLabelsMaxLength() *
                    HistogramDetailComponent.ASSUMED_CHAR_WIDTH +
                8
        };
        super.createScales();
    }

    protected paint() {
        this.drawNoDataBlocks();
        this.drawNoDataBlocks(
            this.notExistingBlocks,
            'not-exists',
            COLOR_CHART_NO_DATA
        );
        this.drawStackedBars((t: T) => t.barValues, this._barColors);
        this.updateBarColors();
        this.drawLines();
        this.drawFullYAxis();
        this.drawFullXAxis();
        this.updateValueDomain(this.valueDomainRect);
    }

    protected override drawStackedBars(
        barValuesFn: (v: T) => Array<number | null | undefined>,
        colors: readonly string[]
    ) {
        const cleanedColors = colors.map((c) =>
            c.startsWith('url') ? c.replace(')', `${this.svg.instanceNum})`) : c
        );
        this.dataGrp.attr(
            'fill',
            cleanedColors[0].startsWith('url') && cleanedColors.length > 1
                ? cleanedColors[1]
                : cleanedColors[0]
        );

        const preCalcStackStart = (
            val: number | null | undefined,
            ix: number,
            arr: Array<number | null | undefined>
        ) => ({
            val,
            start: Math.max(0, val ?? 0)
        });

        const translateOffset = this.bandOffsetX + this.barchartAlignHoverOfBar;
        const width = this.bandWithX * this.barchartWidth;

        let isFirst = true;
        this.dataGrp
            .selectAll('g')
            .data(this.data, <any>dateKeyFn)
            .join('g')
            .attr('transform', ({ date }, ix) => {
                const additionalOffset = ix === 0 ? 0 : width / 2;
                return `translate(${
                    <number>this.scaleBandX(middleOfDay(date)) +
                    translateOffset -
                    additionalOffset
                }, 0)`;
            })
            .selectAll('rect')
            .data((v: T) => barValuesFn(v).map(preCalcStackStart))
            .join('rect')
            .attr('width', () => {
                if (isFirst) {
                    isFirst = false;
                    return width / 2;
                }
                return width;
            })
            .attr('y', ({ start }) => <number>this.scaleLinearY(start))
            .attr('height', ({ val }) =>
                Math.abs(this.scaleLinearY(val ?? 0) - this.scaleLinearY(0))
            )
            .attr('fill', (_, ix) =>
                ix === 0
                    ? cleanedColors[ix].startsWith('url')
                        ? cleanedColors[ix]
                        : null
                    : cleanedColors[ix]
            );
    }

    protected drawLines() {
        this.linesGroup
            .selectAll('path')
            .data(this.lineFunctions)
            .join('path')
            .attr('d', ([, lineFn]) => <string>lineFn(this.data))
            .attr('stroke', ([ix]) => this.lineColors[ix])
            .attr('stroke-width', ([ix]) => this.lineThickness[ix])
            .attr('stroke-dasharray', ([ix]) =>
                !!this.lineStyle && this.lineStyle[ix] === 'dashed'
                    ? '2 2'
                    : '0 0 '
            );
    }

    protected mapToEventAndTooltipData([x, item]: [number, T]): [DOMPoint, T] {
        const total = item.barValues.reduce(sum, 0);
        const maxVal = Math.max(
            ...item.lineValues.filter(isDefined),
            total,
            this.domainMin
        );
        const y = <number>this.scaleLinearY(maxVal);

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
        const g = this.findBarGroup(data);
        g.selectAll('rect').attr('fill', (_, ix) =>
            this._barColors[ix].startsWith('url')
                ? this._barColors[0].replace(')', `${this.svg.instanceNum})`)
                : this.barHoverColors[ix]
        );
    }

    protected override setElOutFocus([source, data]: [DOMPoint, T]) {
        super.setElOutFocus([source, data]);
        const g = this.findBarGroup(data);
        g.selectAll('rect').attr('fill', (_, ix) =>
            ix === 0 ? null : this.barColors[ix]
        );
    }

    private findBarGroup(data: T) {
        const groups: Selection<SVGGElement, T, SVGGElement, void> =
            this.dataGrp.selectAll('g');
        return groups.filter((v) => isSameDay(v.date, data.date));
    }

    private updateBarColors() {
        this.dataGrp.attr(
            'fill',
            this._barColors[0].startsWith('url')
                ? this._barColors[0].replace(')', `${this.svg.instanceNum})`)
                : this._barColors[0]
        );
    }
}

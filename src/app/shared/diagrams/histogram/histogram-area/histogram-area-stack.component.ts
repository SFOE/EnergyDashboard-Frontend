import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnChanges,
    SimpleChanges,
    ViewEncapsulation
} from '@angular/core';
import { area, Area, Line } from 'd3';
import { isDefined } from '../../../xternal-helpers/from-c19-commons/utils/is-defined.function';
import { HistogramEntry, middleOfDay } from '../base-histogram.component';
import { HistogramAreaComponent } from './histogram-area.component';

export interface HistogramAreaEntry extends HistogramEntry {
    values: (number | null)[];
}

@Component({
    selector: 'bfe-histogram-area-stack',
    templateUrl: './histogram-area.component.html',
    styleUrls: ['./histogram-area.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistogramAreaStackComponent<T extends HistogramAreaEntry>
    extends HistogramAreaComponent<T>
    implements OnChanges
{
    @Input() lines: T[];
    @Input() focusPointColors: string[] = this.colors;
    @Input() focusPointBorder: boolean = false;
    @Input() margins: {
        top: number;
        bottom: number;
        left: number;
        right: number;
    };

    override ngOnChanges(changes: SimpleChanges): void {
        if (changes['margins'] && this.margins) {
            this.margin = this.margins;
        }
        super.ngOnChanges(changes);
    }

    protected override createAreaFunctions(): Array<Area<T>> {
        return new Array(
            this.data.reduce((u, i) => Math.max(u, i.values.length), 0)
        )
            .fill(0)
            .map((_, ix) => this.createArea((v) => v.values[ix], ix));
    }

    protected override createArea(
        valueFn: (v: T) => number | null | undefined,
        idx: number
    ) {
        const preCalcY0 = (
            val: number | null | undefined,
            ix: number,
            arr: Array<number | null | undefined>
        ) => {
            return (
                arr.slice(0, ix + 1).reduce((u: number, i) => u + (i || 0), 0) -
                (val || 0)
            );
        };

        const preCalcY1 = (
            val: number | null | undefined,
            ix: number,
            arr: Array<number | null | undefined>
        ) => {
            return arr
                .slice(0, ix + 1)
                .reduce((u: number, i) => u + (i || 0), 0);
        };

        return area<T>()
            .x(({ date }) => <number>this.scaleTimeX(middleOfDay(date)))
            .y0((entry) => {
                return <number>(
                    this.scaleLinearY(entry.values.map(preCalcY0)[idx])
                );
            })
            .y1((entry) => {
                return <number>(
                    this.scaleLinearY(entry.values.map(preCalcY1)[idx])
                );
            })
            .defined((entry) => isDefined(valueFn(entry)));
    }

    protected override drawLines(): void {
        if (this.lines) {
            this.lineFunctions = this.createLineFunctions();
            const data = this.lineFunctions.map((lineFn, ix) => ({
                line: <string>(
                    lineFn(
                        this.spanGaps && this.spanGaps[ix]
                            ? this.lines.filter((e) => isDefined(e.values[ix]))
                            : this.lines
                    )
                ),
                color: this.lineColors[ix],
                strokeWidths: Array.isArray(this.strokeWidths)
                    ? this.strokeWidths[ix]
                    : this.strokeWidths ?? 4
            }));
            this.dataGrp
                .selectAll('path.line')
                .data(data)
                .join('path')
                .attr('class', 'line')
                .attr('d', ({ line }) => line)
                .attr('stroke', 'black')
                .attr('stroke-width', ({ strokeWidths }) => strokeWidths);
        }
    }

    protected override createLineFunctions(): Array<Line<T>> {
        return new Array(
            this.lines.reduce((u, i) => Math.max(u, i.values.length), 0)
        )
            .fill(0)
            .map((_, ix) => this.createLine((v) => v.values[ix]));
    }

    protected override paint(): void {
        super.paint();
        this.yAxisGrp
            .selectAll('g')
            .filter((value) => value === 0)
            .selectAll('line')
            .attr('stroke', '#333333');

        this.yAxisGrp
            .append('line')
            .attr('stroke', '#CCCCCC')
            .attr('transform', 'translate(' + this.margin.left + ', 0)')
            .attr('y1', 0)
            .attr('y2', this.svg.height - this.margin.bottom);
    }

    protected override getFocusPointColor = (val: any, ix: number): string => {
        if (val !== 0) {
            return (
                this.focusPointColors.slice(0, this.areaFunctions.length)[ix] ||
                '#ccc'
            );
        }
        return 'transparent';
    };

    protected override drawFocusGuide(item: T) {
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

        const dotsData = item.values.slice();

        if (this.showLines && !this.hideFocusDots) {
            this.focusGuideGroup
                .selectAll('circle')
                .data(dotsData)
                .join((s) => {
                    if (this.focusPointBorder) {
                        return s
                            .append('circle')
                            .attr('r', 4)
                            .attr('stroke', 'white')
                            .attr('stroke-width', 1);
                    }

                    return s.append('circle').attr('r', 5);
                })
                .attr('cy', (value, pos) => {
                    let stackedValue: number = 0;
                    if (!!value && value !== 0) {
                        stackedValue = dotsData
                            .slice(0, pos + 1)
                            .reduce(
                                (accumulator: number, current) =>
                                    (accumulator += current ?? 0),
                                0
                            );
                    }
                    return <number>this.scaleLinearY(stackedValue);
                })
                .attr('opacity', (v) => (isDefined(v) ? null : 0))
                .attr('fill', this.getFocusPointColor);
        }
    }

    protected override setElIntoFocus([source, data]: [DOMPoint, T]) {
        const selectedLineDataValues =
            this.lines?.find(
                (line) => line.date.getTime() === data.date.getTime()
            )?.values ?? [];
        const areaAndLineData = {
            ...data,
            values: [...data.values, ...selectedLineDataValues]
        };
        super.setElIntoFocus([source, areaAndLineData]);
        this.drawFocusGuide(data);
    }

    protected override calculateMaxYValue(data: T[]): number {
        let max = 0;
        data.forEach((entry) => {
            const currentMax = entry.values.reduce(
                (accumulator: number, current) => (accumulator += current ?? 0),
                0
            );
            if (currentMax > max) {
                max = currentMax;
            }
        });
        return max;
    }
}

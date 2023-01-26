import { Component } from '@angular/core';
import { isDefined } from '../../../xternal-helpers/from-c19-commons/utils/is-defined.function';
import { Selection } from 'd3';
import { defineSteppedGradient } from '../../utils';
import { HistogramLineRefComponent } from './histogram-line-ref.component';
import { HistogramLineEntry } from './histogram-line.component';

@Component({ template: '' })
export abstract class HistogramLineRefGradientComponent<
    T extends HistogramLineEntry
> extends HistogramLineRefComponent<T> {
    protected gradient: Selection<
        SVGLinearGradientElement,
        void,
        null,
        undefined
    >;
    private readonly gradientId = `histogram-line-ref-gradient-${this.instanceId}`;
    protected abstract readonly ranges: number[];
    protected abstract readonly rangeColors: string[];

    // override super
    protected override setupChart() {
        super.setupChart();

        this.gradient = this.svg.svg
            .append('linearGradient')
            .attr('id', this.gradientId)
            .attr('gradientUnits', 'userSpaceOnUse');
    }

    protected override drawLines() {
        super.drawLines();
        this.dataGrp
            .selectAll('path.line')
            .attr('stroke', `url(#${this.gradientId})`);
    }

    protected defineGradient(ranges: number[], colors: string[]) {
        defineSteppedGradient(
            this.gradient,
            this.scaleLinearY,
            ranges,
            colors,
            this.margin,
            this.svg
        );
    }

    // override super
    protected override readonly getFocusPointColor = (
        val: number | undefined | null
    ): string => {
        if (!isDefined(val)) {
            return '#ccc';
        }
        const ix = this.ranges.findIndex((r) => val < r);
        return this.rangeColors[ix !== -1 ? ix : this.rangeColors.length - 1];
    };
}

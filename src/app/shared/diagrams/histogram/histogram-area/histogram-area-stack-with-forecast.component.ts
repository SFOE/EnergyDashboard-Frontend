import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnChanges,
    ViewEncapsulation
} from '@angular/core';
import { isDefined } from '../../../xternal-helpers/from-c19-commons/utils/is-defined.function';
import { HistogramEntry } from '../base-histogram.model';
import { HistogramAreaStackComponent } from './histogram-area-stack.component';

export interface HistogramAreaEntry extends HistogramEntry {
    values: (number | null)[];
}

@Component({
    selector: 'bfe-histogram-area-stack-with-forecast',
    templateUrl: './histogram-area.component.html',
    styleUrls: ['./histogram-area.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistogramAreaStackWithForecastComponent<
        T extends HistogramAreaEntry
    >
    extends HistogramAreaStackComponent<T>
    implements OnChanges
{
    @Input() turningPoint: number;

    protected override drawFullXAxis(): void {
        super.drawFullXAxis();

        // shift x-axis labels slightly to the left to prevent the last label from being cut off
        this.xAxisGrp.selectAll('text').attr('transform', 'translate(-3, 0)');

        // adjust font size for smaller screens
        const mobileLimit: number = 350;

        if (this.svg.width < mobileLimit) {
            this.xAxisGrp.selectAll('g').attr('font-size', 8.3);
            this.yAxisGrp.selectAll('g').attr('font-size', 10);
        }
    }

    // TODO: simplify
    protected override drawAreas(): void {
        this.areaFunctions = this.createAreaFunctions();

        let testData = this.data.slice(0, this.turningPoint + 1);

        const data = this.areaFunctions.map((areaFn, ix) => ({
            area: <string>(
                areaFn(
                    this.spanGaps && this.spanGaps[ix]
                        ? testData.filter((e) => isDefined(e.values[ix]))
                        : testData
                )
            ),
            color:
                this.colors[ix] && this.colors[ix].startsWith('url')
                    ? this.colors[ix].replace(')', `${this.svg.instanceNum})`)
                    : this.colors[ix],
            opacity: Array.isArray(this.areaOpacities)
                ? this.areaOpacities[ix]
                : this.areaOpacities ?? 1
        }));

        this.dataGrp
            .selectAll('path.area-part1')
            .data(data)
            .join('path')
            .attr('class', 'area area-part1')
            .attr('d', ({ area }) => area)
            .attr('fill', ({ color }) => color)
            .attr('opacity', ({ opacity }) => opacity)
            .lower();

        testData = this.data.slice(this.turningPoint);

        // Draw the second part with opacity = 0.5
        const restData = this.areaFunctions.map((areaFn, ix) => ({
            area: <string>(
                areaFn(
                    this.spanGaps && this.spanGaps[ix]
                        ? testData.filter((e) => isDefined(e.values[ix]))
                        : testData
                )
            ),
            color:
                this.colors[ix] && this.colors[ix].startsWith('url')
                    ? this.colors[ix].replace(')', `${this.svg.instanceNum})`)
                    : this.colors[ix],
            opacity: Array.isArray(this.areaOpacities)
                ? this.areaOpacities[ix]
                : this.areaOpacities ?? 0.5
        }));

        this.dataGrp
            .selectAll('path.area-part2')
            .data(restData)
            .join('path')
            .attr('class', 'area area-part2')
            .attr('d', ({ area }) => area)
            .attr('fill', ({ color }) => color)
            .attr('opacity', ({ opacity }) => opacity)
            .lower();
    }
}

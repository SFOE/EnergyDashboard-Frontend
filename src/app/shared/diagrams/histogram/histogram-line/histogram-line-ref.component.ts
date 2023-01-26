import { Component, Input, ViewEncapsulation } from '@angular/core';
import {
    HistogramLineComponent,
    HistogramLineEntry
} from './histogram-line.component';

@Component({
    selector: 'bfe-histogram-line-ref',
    templateUrl: './histogram-line.component.html',
    styleUrls: ['./histogram-line.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HistogramLineRefComponent<
    T extends HistogramLineEntry
> extends HistogramLineComponent<T> {
    @Input()
    set color(value: string) {
        super.colors = [value, value];
    }

    get color() {
        return super.colors[0];
    }

    // define colors setter/getter to disable the colors @Input() from super class
    override set colors(value: string[]) {}

    override get colors() {
        return super.colors;
    }

    protected override drawLines() {
        super.drawLines();
        this.dataGrp
            .selectAll('path.line')
            .attr('stroke-width', (_, ix) => 4 - ix * 2) // basically on 1 or 2 lines supported
            .filter((_, ix) => ix === 0)
            .raise()
            .attr(
                'filter',
                this.lineFunctions.length > 1 ? this.svg.whiteStroke : <any>null
            );
    }
}

import { Component, Input, OnChanges, ViewEncapsulation } from '@angular/core';
import {
    HistogramDetailComponent,
    HistogramDetailEntry
} from './histogram-detail.component';
import { middleOfDay } from '../../../static-utils/date-utils';
import { LabelFormatters } from '../../label.utils';
import { TranslationService } from '../../../../core/i18n/translation.service';

@Component({
    selector: 'bfe-histogram-detail-grouped',
    templateUrl: './histogram-detail.component.html',
    encapsulation: ViewEncapsulation.None
})
export class HistogramDetailGroupedComponent<T extends HistogramDetailEntry>
    extends HistogramDetailComponent<T>
    implements OnChanges
{
    @Input() xTicksItems: Date[];
    @Input() getOriginalDate: (date: Date) => Date;
    @Input() xLabelFormatter: (date: Date) => string[];
    @Input() transServ: TranslationService;

    protected override drawFullXAxis(): void {
        this.xAxisGrp
            .selectAll('g')
            .data(this.xTicksItems, <any>((d: Date) => d.getTime()))
            .join((group) => {
                // create an outer group for tick and label
                const tickAndLabelGroup = group.append('g');
                tickAndLabelGroup.attr('class', 'tickAndLabel');

                // append vertical line to tick
                const lineLength: number = 10;

                tickAndLabelGroup
                    .append('line')
                    .attr('stroke', '#333333')
                    .attr('y2', lineLength);

                // translation to the right
                let transR: number = 25;
                const y: number = 20;

                let fontSize: string = '10px';

                // used for mobile
                if (this.svg.width < 400) {
                    fontSize = '8px';
                    transR = 15;
                    // change the formatter to only show 2 digits for the years
                    this.xLabelFormatter = LabelFormatters.winter(
                        this.transServ.language,
                        '2-digit'
                    );
                }

                // append text below tick line
                // starting date
                tickAndLabelGroup
                    .append('text')
                    .attr('x', transR)
                    .attr('dy', y)
                    .attr('fill', '#333333')
                    .attr('font-size', fontSize)
                    .text(
                        (v: Date) =>
                            this.xLabelFormatter(this.getOriginalDate(v))[0] +
                            ' - '
                    );

                // ending date
                tickAndLabelGroup
                    .append('text')
                    .attr('x', transR)
                    .attr('dy', y + 15)
                    .attr('fill', '#333333')
                    .attr('font-size', fontSize)
                    .text(
                        (v: Date) =>
                            this.xLabelFormatter(this.getOriginalDate(v))[1]
                    );

                return tickAndLabelGroup;
            })
            .attr('transform', (v: Date) => {
                const offsetToCenter: number =
                    this.scaleBandX.bandwidth() / 2 - this.barWidth / 2;

                return `translate(${
                    <number>this.scaleBandX(middleOfDay(v)) + offsetToCenter
                }, ${this.svg.height - this.margin.bottom})`;
            })
            .attr('opacity', null);

        this.updateXAxisBaseLine();
    }
}

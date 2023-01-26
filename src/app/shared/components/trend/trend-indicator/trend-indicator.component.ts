import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Trend, TrendRating } from 'src/app/core/models/trend.enum';

const trendRatingColorMap = {
    positiv: '#69AD00',
    neutral: '#8C8C8C',
    negativ: '#DC0018'
};

@Component({
    selector: 'bfe-trend-indicator',
    templateUrl: './trend-indicator.component.html',
    styleUrls: ['./trend-indicator.component.scss']
})
export class TrendIndicatorComponent implements OnChanges {
    @Input() trend: Trend;
    @Input() rating?: TrendRating;
    @Input() customColor?: string;
    @Input() labelKey?: string;

    private baseSvgPath = '/assets/icon/trend_arrows';
    svgPath: string = this.getSvgPath(Trend.NEUTRAL);

    trends = Trend;
    arrowColor = trendRatingColorMap[TrendRating.NEUTRAL];

    ngOnChanges(changes: SimpleChanges): void {
        if (!!changes['trend']) {
            this.svgPath = this.getSvgPath(this.trend);
        }
        if (!!changes['rating'] && !this.customColor) {
            this.arrowColor =
                trendRatingColorMap[this.rating || TrendRating.NEUTRAL];
        }
        if (!!changes['customColor'] && this.customColor) {
            this.arrowColor = this.customColor;
        }
    }

    private getSvgPath(trend: Trend): string {
        return `${this.baseSvgPath}/${trend}.svg`;
    }
}

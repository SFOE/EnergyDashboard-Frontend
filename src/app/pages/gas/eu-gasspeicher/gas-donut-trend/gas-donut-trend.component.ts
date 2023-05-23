import { Component, Input } from '@angular/core';
import { FuellstandGasspeicherRegion } from '../../../../core/models/gas-fuellstand-gasspeicher';
import { Trend, TrendRating } from '../../../../core/models/trend.enum';
import { COLOR_CONTEXT } from '../../gas.consts';

@Component({
    selector: 'bfe-gas-donut-trend',
    templateUrl: './gas-donut-trend.component.html',
    styleUrls: ['./gas-donut-trend.component.scss']
})
export class GasDonutTrendComponent {
    @Input() region: FuellstandGasspeicherRegion;
    @Input() speicherstandProzent: number;
    @Input() speicherstandTwh: number;
    @Input() rating: TrendRating;
    @Input() trend: Trend;

    unit: string;
    spaceColor = COLOR_CONTEXT; //violett gas

    get regionKey() {
        return `commons.country.${this.region?.toLowerCase()}.short`;
    }

    get trendKey() {
        return `commons.trend.${this.trend?.toLowerCase()}`;
    }
}

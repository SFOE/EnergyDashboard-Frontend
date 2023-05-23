import { Component, Input } from '@angular/core';
import { DateModel } from '../../../core/models/base/date.model';

export interface PointOfInterestLegendEntry extends DateModel {
    pointNumber: number;
    labelKey: string;
    overrideDateLabel?: Date;
}

@Component({
    selector: 'bfe-points-of-interest-legend',
    templateUrl: './points-of-interest-legend.component.html',
    styleUrls: ['./points-of-interest-legend.component.scss']
})
export class PointsOfInterestLegendComponent {
    @Input() entries: PointOfInterestLegendEntry[];
}

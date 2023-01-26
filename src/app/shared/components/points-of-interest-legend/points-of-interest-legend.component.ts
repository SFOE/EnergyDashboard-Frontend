import { Component, Input } from '@angular/core';

export interface PointOfInterestLegendEntry {
    date: Date;
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

import { Component, Input } from '@angular/core';
import { SparzielEntry } from '../../../../core/models/sparziel';

export interface SparzielAndTrendModel {
    sparzielEntry: SparzielEntry;
    trendLabelKey: string;
    color: string;
}

@Component({
    selector: 'bfe-sparziel-overview',
    templateUrl: './sparziel-overview.component.html',
    styleUrls: ['./sparziel-overview.component.scss']
})
export class SparzielOverviewComponent {
    @Input() model: SparzielAndTrendModel;
    @Input() loading: boolean = false;
}

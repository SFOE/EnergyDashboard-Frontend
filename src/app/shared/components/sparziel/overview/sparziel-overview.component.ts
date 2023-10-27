import { Component, Input } from '@angular/core';
import { SparzielEntry } from '../../../../core/models/sparziel';

import { Sparziel } from '../../../diagrams/sparziel/sparziel-chart-tooltip/sparziel-chart-tooltip.component';

export interface SparzielAndTrendModel {
    sparzielEntry: SparzielEntry;
    trendLabelKey: string;
    color: string;
    addSparziel?: boolean;
    sparziel?: Sparziel;
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

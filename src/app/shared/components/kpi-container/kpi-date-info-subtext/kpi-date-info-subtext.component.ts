import { Component, Input } from '@angular/core';

export type UpdateInterval = 'weekly' | 'monthly' | 'endOfMonth';

@Component({
    selector: 'bfe-kpi-date-info-subtext',
    templateUrl: './kpi-date-info-subtext.component.html',
    styleUrls: ['./kpi-date-info-subtext.component.scss']
})
export class KpiDateInfoSubtextComponent {
    @Input() date: Date | string;
    @Input() updateInterval?: UpdateInterval;
}

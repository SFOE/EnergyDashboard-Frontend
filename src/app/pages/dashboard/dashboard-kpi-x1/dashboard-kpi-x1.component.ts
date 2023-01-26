import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Context } from '../../../core/models/context.enum';

@Component({
    selector: 'bfe-dashboard-kpi-x1',
    templateUrl: './dashboard-kpi-x1.component.html',
    styleUrls: ['./dashboard-kpi-x1.component.scss']
})
export class DashboardKpiX1Component {
    @Input() context: Context;
    @Input() sourceKey: string;
    @Input() link: string;

    constructor(private router: Router) {}

    navigateToLink(): void {
        if (this.link) {
            this.router.navigate([this.link]);
        }
    }
}
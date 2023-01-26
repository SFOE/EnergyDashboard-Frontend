import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardSpartippDisplay } from '../../../core/models/dashboard';
import { DashboardService } from '../../../services/dashboard/dashboard.service';

@Component({
    selector: 'bfe-dashboard-spartipps-card',
    templateUrl: './dashboard-spartipps-card.component.html',
    styleUrls: ['./dashboard-spartipps-card.component.scss']
})
export class DashboardSpartippsCardComponent implements OnInit {
    spartipp$: Observable<DashboardSpartippDisplay | undefined>;

    constructor(private dashboardService: DashboardService) {}

    ngOnInit() {
        this.spartipp$ = this.dashboardService.getRandomSpartipp();
    }
}

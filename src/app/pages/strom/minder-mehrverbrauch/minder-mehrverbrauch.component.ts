import { Component, OnInit } from '@angular/core';
import { SparzielEntry } from '../../../core/models/sparziel';
import { RoutePathFragments } from '../../../core/navigation/route-paths.enum';
import { StromService } from '../../../services/strom/strom.service';
import { COLOR_CONTEXT } from '../strom.consts';
@Component({
    selector: 'bfe-strom-minder-mehrverbrauch',
    templateUrl: './minder-mehrverbrauch.component.html',
    styleUrls: ['./minder-mehrverbrauch.component.scss']
})
export class StromMinderMehrverbrauchComponent implements OnInit {
    readonly primaryColor = COLOR_CONTEXT;
    readonly fragments = RoutePathFragments;

    trendData: SparzielEntry | undefined;
    isLoadingTrend: boolean = true;

    constructor(private stromService: StromService) {}

    ngOnInit(): void {
        this.stromService.getSparziel().subscribe({
            next: (data) => {
                this.trendData = data;
            },
            complete: () => (this.isLoadingTrend = false)
        });
    }
}

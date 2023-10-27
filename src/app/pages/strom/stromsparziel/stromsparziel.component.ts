import { Component, OnInit } from '@angular/core';
import { SparzielEntry } from '../../../core/models/sparziel';
import { StromService } from '../../../services/strom/strom.service';
import { COLOR_CONTEXT } from '../strom.consts';

@Component({
    selector: 'bfe-stromstromsparziel',
    templateUrl: './stromsparziel.component.html',
    styleUrls: ['./stromsparziel.component.scss']
})
export class StromsparzielComponent implements OnInit {
    readonly primaryColor = COLOR_CONTEXT;

    trendData?: SparzielEntry;
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

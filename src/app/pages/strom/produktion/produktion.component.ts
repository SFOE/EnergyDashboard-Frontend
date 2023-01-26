import { Component, OnInit } from '@angular/core';
import { Context } from '../../../core/models/context.enum';
import { StromProductionImportVerbrauchTrend } from '../../../services/strom/strom.model';
import { StromService } from '../../../services/strom/strom.service';
import { COLOR_CONTEXT } from '../strom.consts';

@Component({
    selector: 'bfe-produktion',
    templateUrl: './produktion.component.html',
    styleUrls: ['./produktion.component.scss']
})
export class ProduktionComponent implements OnInit {
    readonly spaceColor = COLOR_CONTEXT;

    currentEntry: StromProductionImportVerbrauchTrend;

    context = Context.STROM;

    isLoading: boolean = false;

    constructor(private stromService: StromService) {}

    ngOnInit(): void {
        this.stromService
            .getStromProductionImportVerbrauch()
            .subscribe((data) => {
                this.currentEntry = data.trend;
                this.isLoading = false;
            });
    }
}

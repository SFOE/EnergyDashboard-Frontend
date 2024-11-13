import { Component, OnInit } from '@angular/core';
import { Context } from '../../../core/models/context.enum';
import { StromService } from '../../../services/strom/strom.service';
import { COLOR_CONTEXT } from '../strom.consts';
import { StromProduktionPvTrend } from '../../../core/models/strom-produktion-pv-trend';

@Component({
    selector: 'bfe-produktion-pv',
    templateUrl: './produktion-pv.component.html',
    styleUrls: ['./produktion-pv.component.scss']
})
export class ProduktionPvComponent implements OnInit {
    protected readonly COLOR_SPACE = COLOR_CONTEXT;
    protected readonly Math: Math = Math;

    currentEntry: StromProduktionPvTrend;
    context: Context = Context.STROM;
    isLoading: boolean = true;

    constructor(private stromService: StromService) {}

    ngOnInit(): void {
        this.stromService
            .getProduktionPvTrend()
            .subscribe((data: StromProduktionPvTrend): void => {
                this.currentEntry = data;
                this.isLoading = false;
            });
    }
}

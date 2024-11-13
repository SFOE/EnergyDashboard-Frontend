import { Component, OnInit } from '@angular/core';
import { Context } from '../../../core/models/context.enum';
import { StromService } from '../../../services/strom/strom.service';
import { COLOR_CONTEXT, COLORS_WINTERPRODUKTION } from '../strom.consts';
import { StromWinterproduktionTrend } from '../../../core/models/strom-winterproduktion-trend';

interface BigNumberEntries {
    value: number;
    labelKey: string;
    color: string;
}

@Component({
    selector: 'bfe-winterproduktion',
    templateUrl: './winterproduktion.component.html',
    styleUrls: ['./winterproduktion.component.scss']
})
export class WinterproduktionComponent implements OnInit {
    currentEntry: StromWinterproduktionTrend;
    context: Context = Context.STROM;
    isLoading: boolean = true;
    winterproduktionInfo: BigNumberEntries;

    readonly COLOR_CONTEXT = COLOR_CONTEXT;
    protected readonly Math = Math;

    constructor(private stromService: StromService) {}

    ngOnInit(): void {
        this.stromService.getWinterproduktionTrend().subscribe((data) => {
            this.currentEntry = data;
            this.setBigNumberEntries();

            this.isLoading = false;
        });
    }

    private setBigNumberEntries(): void {
        if (this.currentEntry.importe !== 0) {
            this.winterproduktionInfo = {
                value: this.currentEntry.importe,
                labelKey: 'commons.strom.winterproduktion.import',
                color: COLORS_WINTERPRODUKTION.IMPORT
            };
        } else if (this.currentEntry.exporte !== 0) {
            this.winterproduktionInfo = {
                value: this.currentEntry.exporte,
                labelKey: 'commons.strom.winterproduktion.export',
                color: COLORS_WINTERPRODUKTION.EXPORT
            };
        }
    }
}

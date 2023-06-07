import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Context } from '../../../../core/models/context.enum';
import {
    StromKkwProductionData,
    StromKkwVerfuegbarkeitData
} from '../../../../services/strom/strom.model';
import { StromService } from '../../../../services/strom/strom.service';
import { COLOR_CONTEXT, kkwColors } from '../../strom.consts';

@Component({
    selector: 'bfe-kkw-fr',
    templateUrl: './kkw-fr.component.html',
    styleUrls: ['./kkw-fr.component.scss']
})
export class KkwFrComponent implements OnInit {
    readonly stromColor = COLOR_CONTEXT;
    readonly kkwColors = kkwColors;
    readonly context = Context.STROM;

    productionFr: Observable<StromKkwProductionData>;
    availabilityFr: Observable<StromKkwVerfuegbarkeitData>;

    constructor(private stromService: StromService) {}

    ngOnInit(): void {
        this.productionFr = this.stromService.getKkwProductionFr();
        this.availabilityFr = this.stromService.getKkwVerfuegbarkeitFr();
    }
}

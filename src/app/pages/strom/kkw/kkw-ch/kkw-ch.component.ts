import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Context } from '../../../../core/models/context.enum';
import {
    StromKkwProductionData,
    StromKkwVerfuegbarkeitData
} from '../../../../services/strom/strom.model';
import { StromService } from '../../../../services/strom/strom.service';
import { kkwColors } from '../../strom.consts';

@Component({
    selector: 'bfe-kkw-ch',
    templateUrl: './kkw-ch.component.html',
    styleUrls: ['./kkw-ch.component.scss']
})
export class KkwChComponent implements OnInit {
    readonly kkwColors = kkwColors;
    readonly context = Context.STROM;

    productionCh: Observable<StromKkwProductionData>;
    availabilityCh: Observable<StromKkwVerfuegbarkeitData>;

    constructor(private stromService: StromService) {}

    ngOnInit(): void {
        this.productionCh = this.stromService.getKkwProductionCh();
        this.availabilityCh = this.stromService.getKkwVerfuegbarkeitCh();
    }
}

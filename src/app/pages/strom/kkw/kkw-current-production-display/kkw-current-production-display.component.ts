import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
    StromKkwProductionData,
    StromKkwProductionEntry
} from '../../../../services/strom/strom.model';
import { COLOR_CONTEXT } from '../../strom.consts';
import { findLatestProductionEntry } from '../kkw.utils';

@Component({
    selector: 'bfe-kkw-current-production-display',
    templateUrl: './kkw-current-production-display.component.html',
    styleUrls: ['./kkw-current-production-display.component.scss']
})
export class KkwCurrentProductionDisplayComponent implements OnInit {
    @Input() productionData: Observable<StromKkwProductionData>;
    @Input() topLabelKey: string;

    readonly stromColor = COLOR_CONTEXT;

    private latestEntry?: StromKkwProductionEntry;
    isLoading: boolean = true;

    get latestProduction(): number {
        return this.latestEntry?.values[1] ?? 0;
    }

    ngOnInit(): void {
        this.productionData.subscribe((data) => {
            this.isLoading = false;
            this.latestEntry = findLatestProductionEntry(data.entries);
        });
    }
}

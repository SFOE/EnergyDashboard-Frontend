import { Component, HostListener, OnInit } from '@angular/core';
import { Observable, filter, map } from 'rxjs';
import { TranslationService } from '../../../core/i18n/translation.service';
import { HistogramAreaChartEntry } from '../../../core/models/charts';
import { Context } from '../../../core/models/context.enum';
import { GasImportEuropaTrend } from '../../../core/models/gas/gas-import-eruopa-trend';
import { Trend, TrendRating } from '../../../core/models/trend.enum';
import { GasService } from '../../../services/gas/gas.service';
import { StromProductionImportVerbrauchTrend } from '../../../services/strom/strom.model';
import { COLOR_CONTEXT } from './import-europa.consts';
@Component({
    selector: 'bfe-gas-import-europa',
    templateUrl: './import-europa.component.html',
    styleUrls: ['./import-europa.component.scss']
})
export class GasImportEuropaComponent implements OnInit {
    readonly spaceColor = COLOR_CONTEXT;

    currentEntry: StromProductionImportVerbrauchTrend;

    context = Context.GAS;

    barWidth: number = 22;
    isLoadingTrend: Observable<boolean>;
    gasImportEuropaTaeglich: HistogramAreaChartEntry[] = [];
    gasImportEuropaTrend: GasImportEuropaTrend = {
        date: new Date(),
        value: 1337,
        trend: Trend.NEUTRAL,
        rating: TrendRating.NEUTRAL
    };
    measuringUnit: string =
        this.translationService.returnTranslation('commons.unit.mioM3');

    constructor(
        private gasService: GasService,
        private translationService: TranslationService
    ) {}

    ngOnInit(): void {
        const a = this.gasService.getGasImportEuropaTrend();
        a.subscribe((data) => {
            this.gasImportEuropaTrend = data;
        });
        this.isLoadingTrend = a.pipe(
            filter((x) => x !== null && x !== undefined),
            map((x) => !x)
        );
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: Event) {
        this.setBarWidth();
    }

    private setBarWidth() {
        if (window.innerWidth > 1000) {
            this.barWidth = 22;
        } else {
            this.barWidth = 14;
        }
    }
}

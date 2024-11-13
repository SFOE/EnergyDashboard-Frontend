import { Component, Input } from '@angular/core';
import { BaseTooltipComponent } from '../../../../../shared/diagrams/tooltip/base-tooltip';
import { HistogramDetailEntry } from '../../../../../shared/diagrams/histogram/histogram-detail/histogram-detail.component';
import {
    LabelFilters,
    LabelFormatters
} from '../../../../../shared/diagrams/label.utils';
import { StromService } from '../../../../../services/strom/strom.service';
import { TranslationService } from '../../../../../core/i18n/translation.service';
import { ThousandCommaPipe } from '../../../../../shared/commons/thousand-comma.pipe';

@Component({
    selector: 'bfe-winterproduktion-charts-einzelne-energietraeger-tooltip',
    templateUrl:
        './winterproduktion-charts-einzelne-energietraeger-tooltip.component.html',
    styleUrls: [
        './winterproduktion-charts-einzelne-energietraeger-tooltip.component.scss'
    ]
})
export class WinterproduktionChartsEinzelneEnergietraegerTooltipComponent extends BaseTooltipComponent<HistogramDetailEntry> {
    @Input()
    barColors: string[];

    @Input()
    translationService: TranslationService;

    @Input()
    getOriginalDate: (adjustedDate: Date) => Date;

    protected labelFormatter: (date: Date) => string;

    ngOnInit(): void {
        this.labelFormatter = LabelFormatters.monthShortAndYear(
            this.translationService.language
        );
    }

    protected transformToOriginalDate(date: Date): string {
        return this.labelFormatter(this.getOriginalDate(date));
    }
}

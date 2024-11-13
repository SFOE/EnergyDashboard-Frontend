import { Component, Input } from '@angular/core';
import { BaseTooltipComponent } from '../../../../../shared/diagrams/tooltip/base-tooltip';
import { HistogramDetailEntry } from '../../../../../shared/diagrams/histogram/histogram-detail/histogram-detail.component';
import { TranslationService } from '../../../../../core/i18n/translation.service';
import { LabelFormatters } from '../../../../../shared/diagrams/label.utils';

@Component({
    selector: 'bfe-winterproduktion-charts-import-export-tooltip',
    templateUrl:
        './winterproduktion-charts-import-export-tooltip.component.html',
    styleUrls: [
        './winterproduktion-charts-import-export-tooltip.component.scss'
    ]
})
export class WinterproduktionChartsImportExportTooltipComponent extends BaseTooltipComponent<HistogramDetailEntry> {
    @Input()
    barColors: string[];

    @Input()
    lineColor: string[];

    @Input()
    domainRation: number;

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

    protected getOriginal(value: number | null): number | null {
        if (value === null) {
            return null;
        }

        const decimal: number = 10;
        return Math.round((value / this.domainRation) * decimal) / decimal;
    }
}

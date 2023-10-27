import { Component } from '@angular/core';
import { TranslationService } from '../../../../../core/i18n/translation.service';
import { HistogramAreaChartEntry } from '../../../../../core/models/charts';
import { BaseTooltipComponent } from '../../../../../shared/diagrams/tooltip/base-tooltip';
import {
    GasImportEuropaChartIndex,
    GasImportEuropaColors
} from '../../import-europa.consts';
@Component({
    selector: 'bfe-gas-import-europa-tooltip',
    templateUrl: './import-europa-taeglich-tooltip.component.html',
    styleUrls: ['./import-europa-taeglich-tooltip.component.scss']
})
export class GasImportEuropaTooltipComponent extends BaseTooltipComponent<HistogramAreaChartEntry> {
    readonly index = GasImportEuropaChartIndex;
    readonly colors = GasImportEuropaColors;
    readonly colorGas = GasImportEuropaColors[5];
    measuringUnit: string = ` ${this.translationService.returnTranslation(
        'commons.unit.mioM3'
    )}`;

    constructor(private translationService: TranslationService) {
        super();
    }
}

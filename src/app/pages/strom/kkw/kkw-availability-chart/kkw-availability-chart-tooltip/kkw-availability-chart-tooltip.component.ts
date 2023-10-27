import { Component } from '@angular/core';
import { TranslationService } from '../../../../../core/i18n/translation.service';
import { StromKkwVerfuegbarkeitEntry } from '../../../../../services/strom/strom.model';
import { BaseTooltipComponent } from '../../../../../shared/diagrams/tooltip/base-tooltip';
import { kkwColors } from '../../../strom.consts';
import { getAusfallColor } from '../../kkw.utils';

@Component({
    selector: 'bfe-kkw-availability-chart-tooltip',
    templateUrl: './kkw-availability-chart-tooltip.component.html',
    styleUrls: [
        '../../../../../shared/diagrams/tooltip/base-tooltip.scss',
        './kkw-availability-chart-tooltip.component.scss'
    ]
})
export class KkwAvailabilityChartTooltipComponent extends BaseTooltipComponent<StromKkwVerfuegbarkeitEntry> {
    kkwColors = kkwColors;

    constructor(private translationService: TranslationService) {
        super();
    }
    getAusfallColor(wasPlanned: boolean): string {
        return getAusfallColor(wasPlanned);
    }

    getAusfallText(
        wasPlanned: boolean,
        productionPlant: string | undefined,
        count: number | undefined
    ): string {
        const ausfallReason = wasPlanned
            ? this.translationService.returnOptionTranslation(
                  'dashboard.strom.kkw.maintenance'
              )
            : this.translationService.returnOptionTranslation(
                  'dashboard.strom.kkw.outage'
              );

        const ausfallPlant = productionPlant
            ? ' - ' +
              this.translationService.returnTranslation(
                  'dashboard.strom.kkw.' + productionPlant
              )
            : '';
        const ausfallCount = count
            ? ' - ' +
              this.translationService.returnOptionTranslation(
                  'dashboard.strom.kkw.count',
                  { count }
              )
            : '';
        return ausfallReason + ausfallPlant + ausfallCount;
    }
}

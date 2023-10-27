import { Component } from '@angular/core';
import { TranslationService } from '../../../../../core/i18n/translation.service';
import { StromKkwAusfall } from '../../../../../services/strom/strom.model';
import { COLOR_CHART_HISTOGRAM_AREA_MIN_MAX_DOT } from '../../../../../shared/commons/colors.const';
import { HistogramLineEntry } from '../../../../../shared/diagrams/histogram/histogram-line/histogram-line.component';
import { BaseTooltipComponent } from '../../../../../shared/diagrams/tooltip/base-tooltip';
import { kkwColors } from '../../../strom.consts';
import { getAusfallColor } from '../../kkw.utils';
export interface ProductionChartTooltipData extends HistogramLineEntry {
    ausfaelle?: StromKkwAusfall[];
}

@Component({
    selector: 'bfe-kkw-production-chart-tooltip',
    templateUrl: './kkw-production-chart-tooltip.component.html',
    styleUrls: [
        '../../../../../shared/diagrams/tooltip/base-tooltip.scss',
        './kkw-production-chart-tooltip.component.scss'
    ]
})
export class KkwProductionChartTooltipComponent extends BaseTooltipComponent<ProductionChartTooltipData> {
    readonly colorMinMax = COLOR_CHART_HISTOGRAM_AREA_MIN_MAX_DOT;
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

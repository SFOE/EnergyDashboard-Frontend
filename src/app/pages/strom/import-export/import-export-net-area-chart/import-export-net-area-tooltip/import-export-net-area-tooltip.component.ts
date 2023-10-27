import { Component, Input } from '@angular/core';
import { AreaMinMaxFocusEntry } from '../../../../../shared/diagrams/histogram/histogram-area-min-max/histogram-area-min-max.component';
import { BaseTooltipComponent } from '../../../../../shared/diagrams/tooltip/base-tooltip';
import { ImportExportConsts } from '../../../strom.consts';
import { CountryIndex } from '../import-export-net-area-chart.consts';
@Component({
    selector: 'bfe-import-export-net-area-tooltip',
    templateUrl: './import-export-net-area-tooltip.component.html',
    styleUrls: ['./import-export-net-area-tooltip.component.scss']
})
export class ImportExportNetAreaTooltipComponent extends BaseTooltipComponent<AreaMinMaxFocusEntry> {
    @Input() displayedCountries: CountryIndex[] | null;
    readonly consts = ImportExportConsts;
    readonly countryIndex = CountryIndex;
    readonly measuringUnit: string = ' GWh';
}

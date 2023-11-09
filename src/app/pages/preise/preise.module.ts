import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18NextModule } from 'angular-i18next';
import { CommonsModule } from '../../shared/commons/commons.module';
import { HideableTextSection } from '../../shared/components/hideable-text-section/hideable-text-section.component';
import { SharedComponentsModule } from '../../shared/components/shared-components.module';
import { DiagramLegendModule } from '../../shared/diagrams/diagram-legend/diagram-legend.module';
import { HistogramLineModule } from '../../shared/diagrams/histogram/histogram-line/histogram-line.module';
import { TooltipModule } from '../../shared/diagrams/tooltip/tooltip.module';
import { PreiseFuturesChartComponent } from './components/preise-futures-chart/preise-futures-chart.component';
import { PreiseTooltipComponent } from './components/preise-tooltip/preise-tooltip.component';
import { PreiseFernwaermeComponent } from './preise-fernwaerme/preise-fernwaerme.component';
import { PreiseGasDayaheadComponent } from './preise-gas/preise-gas-dayahead/preise-gas-dayahead.component';
import { PreiseGasEndverbrauchComponent } from './preise-gas/preise-gas-endverbrauch/preise-gas-endverbrauch.component';
import { PreiseGasComponent } from './preise-gas/preise-gas.component';
import { PreiseHolzComponent } from './preise-holz/preise-holz.component';
import { PreiseOelComponent } from './preise-oel/preise-oel.component';
import { PreiseRoutingModule } from './preise-routing.module';
import { PreiseStromBoerseComponent } from './preise-strom/preise-strom-boerse/preise-strom-boerse.component';
import { PreiseStromEndverbrauchComponent } from './preise-strom/preise-strom-endverbrauch/preise-strom-endverbrauch.component';
import { PreiseStromComponent } from './preise-strom/preise-strom.component';
import { PreiseTreibstoffBenzinComponent } from './preise-treibstoff/preise-treibstoff-benzin/preise-treibstoff-benzin.component';
import { PreiseTreibstoffDieselComponent } from './preise-treibstoff/preise-treibstoff-diesel/preise-treibstoff-diesel.component';
import { PreiseTreibstoffComponent } from './preise-treibstoff/preise-treibstoff.component';
import { PreiseComponent } from './preise.component';

@NgModule({
    declarations: [
        PreiseComponent,
        PreiseStromComponent,
        PreiseGasComponent,
        PreiseOelComponent,
        PreiseTreibstoffComponent,
        PreiseTooltipComponent,
        PreiseTreibstoffBenzinComponent,
        PreiseTreibstoffDieselComponent,
        PreiseGasDayaheadComponent,
        PreiseGasEndverbrauchComponent,
        PreiseStromBoerseComponent,
        PreiseStromEndverbrauchComponent,
        PreiseHolzComponent,
        PreiseFernwaermeComponent,
        PreiseFuturesChartComponent
    ],
    imports: [
        CommonModule,
        SharedComponentsModule,
        PreiseRoutingModule,
        CommonsModule,
        HistogramLineModule,
        DiagramLegendModule,
        I18NextModule,
        TooltipModule,
        HideableTextSection
    ]
})
export class PreiseModule {}

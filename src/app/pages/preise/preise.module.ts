import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18NextModule } from 'angular-i18next';
import { CommonsModule } from '../../shared/commons/commons.module';
import { SharedComponentsModule } from '../../shared/components/shared-components.module';
import { DiagramLegendModule } from '../../shared/diagrams/diagram-legend/diagram-legend.module';
import { HistogramLineModule } from '../../shared/diagrams/histogram/histogram-line/histogram-line.module';
import { PreiseRoutingModule } from './preise-routing.module';
import { PreiseComponent } from './preise.component';
import { PreiseStromComponent } from './preise-strom/preise-strom.component';
import { PreiseGasComponent } from './preise-gas/preise-gas.component';
import { PreiseOelComponent } from './preise-oel/preise-oel.component';
import { PreiseTreibstoffComponent } from './preise-treibstoff/preise-treibstoff.component';
import { PreiseTooltipComponent } from './preise-tooltip/preise-tooltip.component';
import { PreiseTreibstoffBenzinComponent } from './preise-treibstoff/preise-treibstoff-benzin/preise-treibstoff-benzin.component';
import { PreiseTreibstoffDieselComponent } from './preise-treibstoff/preise-treibstoff-diesel/preise-treibstoff-diesel.component';
import { PreiseGasBoerseComponent } from './preise-gas/preise-gas-boerse/preise-gas-boerse.component';
import { PreiseGasEndverbrauchComponent } from './preise-gas/preise-gas-endverbrauch/preise-gas-endverbrauch.component';
import { PreiseStromBoerseComponent } from './preise-strom/preise-strom-boerse/preise-strom-boerse.component';
import { PreiseStromEndverbrauchComponent } from './preise-strom/preise-strom-endverbrauch/preise-strom-endverbrauch.component';
import { PreiseHolzComponent } from './preise-holz/preise-holz.component';
import { PreiseFernwaermeComponent } from './preise-fernwaerme/preise-fernwaerme.component';

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
        PreiseGasBoerseComponent,
        PreiseGasEndverbrauchComponent,
        PreiseStromBoerseComponent,
        PreiseStromEndverbrauchComponent,
        PreiseHolzComponent,
        PreiseFernwaermeComponent
    ],
    imports: [
        CommonModule,
        SharedComponentsModule,
        PreiseRoutingModule,
        CommonsModule,
        HistogramLineModule,
        DiagramLegendModule,
        I18NextModule
    ]
})
export class PreiseModule {}

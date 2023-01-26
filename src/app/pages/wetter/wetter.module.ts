import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { I18NextModule } from 'angular-i18next';
import { CommonsModule } from '../../shared/commons/commons.module';
import { SharedComponentsModule } from '../../shared/components/shared-components.module';
import { TrendModule } from '../../shared/components/trend/trend.module';
import { DiagramLegendModule } from '../../shared/diagrams/diagram-legend/diagram-legend.module';
import { HistogramLineModule } from '../../shared/diagrams/histogram/histogram-line/histogram-line.module';
import { AktuellesWetterAktuelleTemperaturHistogramChartComponent } from './aktuelles-wetter/aktuelles-wetter-aktuelle-temperatur-histogram-chart/aktuelles-wetter-aktuelle-temperatur-histogram-chart.component';
import { AktuellesWetterPrognoseHistogramChartComponent } from './aktuelles-wetter/aktuelles-wetter-prognose-histogram-chart/aktuelles-wetter-prognose-histogram-chart.component';
import { AktuellesWetterRegionSelectComponent } from './aktuelles-wetter/aktuelles-wetter-region-select/aktuelles-wetter-region-select.component';
import { AktuellesWetterComponent } from './aktuelles-wetter/aktuelles-wetter.component';
import { WetterRoutingModule } from './wetter-routing.module';
import { WetterComponent } from './wetter.component';

@NgModule({
    declarations: [
        WetterComponent,
        AktuellesWetterComponent,
        AktuellesWetterAktuelleTemperaturHistogramChartComponent,
        AktuellesWetterPrognoseHistogramChartComponent,
        AktuellesWetterRegionSelectComponent
    ],
    imports: [
        CommonModule,
        SharedComponentsModule,
        WetterRoutingModule,
        CommonsModule,
        I18NextModule,
        ReactiveFormsModule,
        HistogramLineModule,
        DiagramLegendModule,
        TrendModule
    ]
})
export class WetterModule {}

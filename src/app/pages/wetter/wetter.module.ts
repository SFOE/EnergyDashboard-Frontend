import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { I18NextModule } from 'angular-i18next';
import { CommonsModule } from '../../shared/commons/commons.module';
import { SharedComponentsModule } from '../../shared/components/shared-components.module';
import { TrendModule } from '../../shared/components/trend/trend.module';
import { DiagramLegendModule } from '../../shared/diagrams/diagram-legend/diagram-legend.module';
import { HistogramLineModule } from '../../shared/diagrams/histogram/histogram-line/histogram-line.module';
import { HistogramDetailModule } from '../../shared/diagrams/histogram/histogram-detail/histogram-detail.module';
import { AktuellesWetterAktuelleTemperaturHistogramChartComponent } from './aktuelles-wetter/aktuelles-wetter-aktuelle-temperatur-histogram-chart/aktuelles-wetter-aktuelle-temperatur-histogram-chart.component';
import { AktuellesWetterPrognoseHistogramChartComponent } from './aktuelles-wetter/aktuelles-wetter-prognose-histogram-chart/aktuelles-wetter-prognose-histogram-chart.component';
import { AktuellesWetterRegionSelectComponent } from './aktuelles-wetter/aktuelles-wetter-region-select/aktuelles-wetter-region-select.component';
import { AktuellesWetterComponent } from './aktuelles-wetter/aktuelles-wetter.component';
import { WetterRoutingModule } from './wetter-routing.module';
import { WetterComponent } from './wetter.component';
import { NiederschlagComponent } from './niederschlag/niederschlag.component';
import { NiederschlagAktuellHistogramChartComponent } from './niederschlag/niederschlag-aktuell-histogram-chart/niederschlag-aktuell-histogram-chart.component';
import { NiederschlagKartenComponent } from './niederschlag/niederschlag-karten/niederschlag-karten.component';
import { NiederschlagAktuellHistogramChartTooltipComponent } from './niederschlag/niederschlag-aktuell-histogram-chart/niederschlag-aktuell-histogram-chart-tooltip/niederschlag-aktuell-histogram-chart-tooltip.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SchneereservenComponent } from './schneereserven/schneereserven.component';
import { SchneereservenAktuellesJahrChartComponent } from './schneereserven/schneereserven-aktuelles-jahr-chart/schneereserven-aktuelles-jahr-chart.component';
import { SchneereservenAktuellHistogramChartTooltipComponent } from './schneereserven/schneereserven-aktuelles-jahr-chart/schneereserven-aktuelles-jahr-chart-tooltip/schneereserven-aktuelles-jahr-chart-tooltip.component';

@NgModule({
    declarations: [
        WetterComponent,
        AktuellesWetterComponent,
        AktuellesWetterAktuelleTemperaturHistogramChartComponent,
        AktuellesWetterPrognoseHistogramChartComponent,
        AktuellesWetterRegionSelectComponent,
        NiederschlagComponent,
        NiederschlagAktuellHistogramChartComponent,
        NiederschlagKartenComponent,
        NiederschlagAktuellHistogramChartTooltipComponent,
        SchneereservenComponent,
        SchneereservenAktuellesJahrChartComponent,
        SchneereservenAktuellHistogramChartTooltipComponent
    ],
    imports: [
        CommonModule,
        SharedComponentsModule,
        WetterRoutingModule,
        CommonsModule,
        I18NextModule,
        ReactiveFormsModule,
        HistogramLineModule,
        HistogramDetailModule,
        DiagramLegendModule,
        FontAwesomeModule,
        TrendModule
    ]
})
export class WetterModule {}

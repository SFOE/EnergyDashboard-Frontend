import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { I18NextModule } from 'angular-i18next';
import { ImageSectionComponent } from 'src/app/shared/components/image-section/image-section.component';
import { TooltipModule } from 'src/app/shared/diagrams/tooltip/tooltip.module';
import { CommonsModule } from '../../shared/commons/commons.module';
import { SharedComponentsModule } from '../../shared/components/shared-components.module';
import { TrendModule } from '../../shared/components/trend/trend.module';
import { DiagramLegendModule } from '../../shared/diagrams/diagram-legend/diagram-legend.module';
import { HistogramDetailModule } from '../../shared/diagrams/histogram/histogram-detail/histogram-detail.module';
import { HistogramLineModule } from '../../shared/diagrams/histogram/histogram-line/histogram-line.module';
import { AktuellesWetterAktuelleTemperaturHistogramChartComponent } from './aktuelles-wetter/aktuelles-wetter-aktuelle-temperatur-histogram-chart/aktuelles-wetter-aktuelle-temperatur-histogram-chart.component';
import { AktuellesWetterPrognoseHistogramChartComponent } from './aktuelles-wetter/aktuelles-wetter-prognose-histogram-chart/aktuelles-wetter-prognose-histogram-chart.component';
import { AktuellesWetterRegionSelectComponent } from './aktuelles-wetter/aktuelles-wetter-region-select/aktuelles-wetter-region-select.component';
import { AktuellesWetterComponent } from './aktuelles-wetter/aktuelles-wetter.component';
import { NiederschlagAktuellHistogramChartTooltipComponent } from './niederschlag/niederschlag-aktuell-histogram-chart/niederschlag-aktuell-histogram-chart-tooltip/niederschlag-aktuell-histogram-chart-tooltip.component';
import { NiederschlagAktuellHistogramChartComponent } from './niederschlag/niederschlag-aktuell-histogram-chart/niederschlag-aktuell-histogram-chart.component';
import { NiederschlagKartenComponent } from './niederschlag/niederschlag-karten/niederschlag-karten.component';
import { NiederschlagComponent } from './niederschlag/niederschlag.component';
import { SchneereservenAktuellHistogramChartTooltipComponent } from './schneereserven/schneereserven-aktuelles-jahr-chart/schneereserven-aktuelles-jahr-chart-tooltip/schneereserven-aktuelles-jahr-chart-tooltip.component';
import { SchneereservenAktuellesJahrChartComponent } from './schneereserven/schneereserven-aktuelles-jahr-chart/schneereserven-aktuelles-jahr-chart.component';
import { SchneereservenComponent } from './schneereserven/schneereserven.component';
import { WetterRoutingModule } from './wetter-routing.module';
import { WetterComponent } from './wetter.component';
import { HideableTextSection } from '../../shared/components/hideable-text-section/hideable-text-section.component';

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
        TrendModule,
        ImageSectionComponent,
        TooltipModule,
        HideableTextSection
    ]
})
export class WetterModule {}

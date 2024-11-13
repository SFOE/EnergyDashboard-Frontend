import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutePaths } from '../../core/navigation/route-paths.enum';
import { FuellstaendeSpeicherseenComponent } from './fuellstaende-speicherseen/fuellstaende-speicherseen.component';
import { ImportExportComponent } from './import-export/import-export.component';
import { KkwChComponent } from './kkw/kkw-ch/kkw-ch.component';
import { KkwFrComponent } from './kkw/kkw-fr/kkw-fr.component';
import { StromMinderMehrverbrauchComponent } from './minder-mehrverbrauch/minder-mehrverbrauch.component';
import { ProduktionComponent } from './produktion/produktion.component';
import { StromComponent } from './strom.component';
import { StromverbrauchComponent } from './stromverbrauch/stromverbrauch.component';
import { ProduktionPvComponent } from './produktion-photovoltaik/produktion-pv.component';
import { EnergieverbrauchComponent } from './energieverbrauch/energieverbrauch.component';
import { WinterproduktionComponent } from './winterproduktion/winterproduktion.component';

const routes: Routes = [
    {
        path: '',
        component: StromComponent,
        children: [
            {
                path: RoutePaths.DASHBOARD_STROM_STROMVERBRAUCH,
                component: StromverbrauchComponent
            },
            {
                path: RoutePaths.DASHBOARD_STROM_ENERGIEVERBRAUCH,
                component: EnergieverbrauchComponent
            },
            {
                path: RoutePaths.DASHBOARD_STROM_PRODUKTION,
                component: ProduktionComponent
            },
            {
                path: RoutePaths.DASHBOARD_STROM_FUELLSTAENDE_SPEICHERSEEN,
                component: FuellstaendeSpeicherseenComponent
            },
            {
                path: RoutePaths.DASHBOARD_STROM_IMPORT_EXPORT,
                component: ImportExportComponent
            },
            {
                path: RoutePaths.DASHBOARD_STROM_KKW_CH,
                component: KkwChComponent
            },
            {
                path: RoutePaths.DASHBOARD_STROM_KKW_FR,
                component: KkwFrComponent
            },
            {
                path: RoutePaths.DASHBOARD_STROM_PRODUKTION_PHOTOVOLTAIK,
                component: ProduktionPvComponent
            },
            {
                path: RoutePaths.DASHBOARD_STROM_SPARZIEL,
                redirectTo: RoutePaths.DASHBOARD_STROM_MINDER_MEHRVERBRAUCH,
                pathMatch: 'full'
            },
            {
                path: RoutePaths.DASHBOARD_STROM_MINDER_MEHRVERBRAUCH,
                component: StromMinderMehrverbrauchComponent
            },
            {
                path: RoutePaths.DASHBOARD_STROM_WINTERPRODUKTION,
                component: WinterproduktionComponent
            },
            {
                path: '**',
                redirectTo: RoutePaths.DASHBOARD_STROM_STROMVERBRAUCH
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StromRoutingModule {}

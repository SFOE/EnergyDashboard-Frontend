import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutePaths } from '../../core/navigation/route-paths.enum';
import { EuGasspeicherComponent } from './eu-gasspeicher/eu-gasspeicher.component';
import { GasImportComponent } from './gas-import/gas-import.component';
import { GasComponent } from './gas.component';
import { GassparzielComponent } from './gassparziel/gassparziel.component';

const routes: Routes = [
    {
        path: '',
        component: GasComponent,
        children: [
            {
                path: RoutePaths.DASHBOARD_GAS_IMPORT,
                component: GasImportComponent
            },
            {
                path: RoutePaths.DASHBOARD_GAS_EU_GASSPEICHER,
                component: EuGasspeicherComponent
            },
            {
                path: RoutePaths.DASHBOARD_GAS_SPARZIEL,
                component: GassparzielComponent
            },
            {
                path: '**',
                redirectTo: RoutePaths.DASHBOARD_GAS_IMPORT
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GasRoutingModule {}

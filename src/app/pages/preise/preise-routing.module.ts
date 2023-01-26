import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutePaths } from '../../core/navigation/route-paths.enum';
import { PreiseGasComponent } from './preise-gas/preise-gas.component';
import { PreiseOelComponent } from './preise-oel/preise-oel.component';
import { PreiseStromComponent } from './preise-strom/preise-strom.component';
import { PreiseTreibstoffComponent } from './preise-treibstoff/preise-treibstoff.component';
import { PreiseComponent } from './preise.component';
import { PreiseHolzComponent } from './preise-holz/preise-holz.component';
import { PreiseFernwaermeComponent } from './preise-fernwaerme/preise-fernwaerme.component';

const routes: Routes = [
    {
        path: '',
        component: PreiseComponent,
        children: [
            {
                path: RoutePaths.DASHBOARD_PREISE_STROM,
                component: PreiseStromComponent
            },
            {
                path: RoutePaths.DASHBOARD_PREISE_GAS,
                component: PreiseGasComponent
            },
            {
                path: RoutePaths.DASHBOARD_PREISE_OEL,
                component: PreiseOelComponent
            },
            {
                path: RoutePaths.DASHBOARD_PREISE_TREIBSTOFF,
                component: PreiseTreibstoffComponent
            },
            {
                path: RoutePaths.DASHBOARD_PREISE_BRENNHOLZ,
                component: PreiseHolzComponent
            },
            {
                path: RoutePaths.DASHBOARD_PREISE_FERNWAERME,
                component: PreiseFernwaermeComponent
            },
            {
                path: '**',
                redirectTo: RoutePaths.DASHBOARD_PREISE_STROM
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PreiseRoutingModule {}

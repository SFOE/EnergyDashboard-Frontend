import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutePaths } from '../../core/navigation/route-paths.enum';
import { AktuellesWetterComponent } from './aktuelles-wetter/aktuelles-wetter.component';
import { WetterComponent } from './wetter.component';
import { NiederschlagComponent } from './niederschlag/niederschlag.component';
import { SchneereservenComponent } from './schneereserven/schneereserven.component';
import { HeizgradtageComponent } from './heizgradtage/heizgradtage.component';

const routes: Routes = [
    {
        path: '',
        component: WetterComponent,
        children: [
            {
                path: RoutePaths.DASHBOARD_WETTER_AKTUELL,
                component: AktuellesWetterComponent
            },
            {
                path: RoutePaths.DASHBOARD_WETTER_NIEDERSCHLAG,
                component: NiederschlagComponent
            },
            {
                path: RoutePaths.DASHBOARD_WETTER_SCHNEERESERVEN,
                component: SchneereservenComponent
            },
            {
                path: RoutePaths.DASHBOARD_WETTER_HEIZGRADTAGE,
                component: HeizgradtageComponent
            },
            {
                path: '**',
                redirectTo: RoutePaths.DASHBOARD_WETTER_AKTUELL
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WetterRoutingModule {}

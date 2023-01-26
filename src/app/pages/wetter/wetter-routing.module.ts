import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutePaths } from '../../core/navigation/route-paths.enum';
import { AktuellesWetterComponent } from './aktuelles-wetter/aktuelles-wetter.component';
import { WetterComponent } from './wetter.component';

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

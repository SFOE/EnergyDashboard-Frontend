import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutePaths } from '../core/navigation/route-paths.enum';
import { AxStatementComponent } from '../pages/ax-statement/ax-statement.component';
import { MainApplicationComponent } from './main-application.component';
import { IntegrationGuideComponent } from '../pages/integration-guide/integration-guide.component';
import { DataProtectionComponent } from '../pages/data-protection/data-protection.component';

const routes: Routes = [
    {
        path: '',
        component: MainApplicationComponent,
        children: [
            {
                path: RoutePaths.DASHBOARD_OVERVIEW,
                loadChildren: () =>
                    import('../pages/dashboard/dashboard.module').then(
                        (m) => m.DashboardModule
                    )
            },
            {
                path: RoutePaths.DASHBOARD_STROM,
                loadChildren: () =>
                    import('../pages/strom/strom.module').then(
                        (m) => m.StromModule
                    )
            },
            {
                path: RoutePaths.DASHBOARD_GAS,
                loadChildren: () =>
                    import('../pages/gas/gas.module').then((m) => m.GasModule)
            },
            {
                path: RoutePaths.DASHBOARD_PREISE,
                loadChildren: () =>
                    import('../pages/preise/preise.module').then(
                        (m) => m.PreiseModule
                    )
            },
            {
                path: RoutePaths.DASHBOARD_WETTER,
                loadChildren: () =>
                    import('../pages/wetter/wetter.module').then(
                        (m) => m.WetterModule
                    )
            },
            {
                path: RoutePaths.DASHBOARD_AX,
                component: AxStatementComponent
            },
            {
                path: RoutePaths.DASHBOARD_INTEGRATION_GUIDE,
                component: IntegrationGuideComponent
            },
            {
                path: RoutePaths.DASHBOARD_DATA_PROTECTION,
                component: DataProtectionComponent
            },
            {
                path: '',
                redirectTo: RoutePaths.DASHBOARD_OVERVIEW,
                pathMatch: 'full'
            },
            {
                path: '**',
                redirectTo: RoutePaths.DASHBOARD_OVERVIEW,
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainApplicationRoutingModule {}

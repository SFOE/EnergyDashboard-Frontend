import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutePaths } from './core/navigation/route-paths.enum';
import { AxStatementComponent } from './pages/ax-statement/ax-statement.component';

const routes: Routes = [
    {
        path: RoutePaths.DASHBOARD_OVERVIEW,
        loadChildren: () =>
            import('./pages/dashboard/dashboard.module').then(
                (m) => m.DashboardModule
            )
    },
    {
        path: RoutePaths.DASHBOARD_STROM,
        loadChildren: () =>
            import('./pages/strom/strom.module').then((m) => m.StromModule)
    },
    {
        path: RoutePaths.DASHBOARD_GAS,
        loadChildren: () =>
            import('./pages/gas/gas.module').then((m) => m.GasModule)
    },
    {
        path: RoutePaths.DASHBOARD_PREISE,
        loadChildren: () =>
            import('./pages/preise/preise.module').then((m) => m.PreiseModule)
    },
    {
        path: RoutePaths.DASHBOARD_WETTER,
        loadChildren: () =>
            import('./pages/wetter/wetter.module').then((m) => m.WetterModule)
    },
    {
        path: RoutePaths.DASHBOARD_AX,
        component: AxStatementComponent
    },
    { path: '', redirectTo: RoutePaths.DASHBOARD_OVERVIEW, pathMatch: 'full' },
    { path: '**', redirectTo: RoutePaths.DASHBOARD_OVERVIEW, pathMatch: 'full' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}

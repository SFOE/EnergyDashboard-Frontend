import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutePaths } from './core/navigation/route-paths.enum';

const routes: Routes = [
    {
        path: RoutePaths.EMBED,
        loadChildren: () =>
            import('./pages/embed/embed.module').then((m) => m.EmbedModule)
    },
    {
        path: '',
        loadChildren: () =>
            import('./main-application/main-application.module').then(
                (m) => m.MainApplicationModule
            )
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            scrollPositionRestoration: 'enabled',
            anchorScrolling: 'enabled',
            scrollOffset: [0, 100] // [x, y]
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}

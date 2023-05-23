import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmbedComponent } from './embed.component';

const routes: Routes = [
    {
        path: '',
        component: EmbedComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmbedRoutingModule {}

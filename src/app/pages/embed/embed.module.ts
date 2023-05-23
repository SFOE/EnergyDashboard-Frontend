import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmbedComponent } from './embed.component';
import { DashboardModule } from '../dashboard/dashboard.module';
import { EmbedRoutingModule } from './embed-routing.module';
import { SharedComponentsModule } from '../../shared/components/shared-components.module';

@NgModule({
    declarations: [EmbedComponent],
    imports: [
        CommonModule,
        EmbedRoutingModule,
        DashboardModule,
        SharedComponentsModule
    ]
})
export class EmbedModule {}

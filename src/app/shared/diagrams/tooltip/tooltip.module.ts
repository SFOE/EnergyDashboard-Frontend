import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { I18NextModule } from 'angular-i18next';
import { IconsModule } from '../../../core/icons/icons.module';
import { TooltipContainerComponent } from './tooltip-container/tooltip-container.component';
import { TooltipDiffDividerComponent } from './tooltip-diff-divider/tooltip-diff-divider.component';
import { TooltipDividerComponent } from './tooltip-divider/tooltip-divider.component';
import { TooltipHeaderComponent } from './tooltip-header/tooltip-header.component';
import { TooltipIconRowComponent } from './tooltip-icon-row/tooltip-icon-row.component';
import { TooltipRowComponent } from './tooltip-row/tooltip-row.component';
@NgModule({
    imports: [CommonModule, I18NextModule, IconsModule, FontAwesomeModule],
    declarations: [
        TooltipContainerComponent,
        TooltipHeaderComponent,
        TooltipRowComponent,
        TooltipDividerComponent,
        TooltipDiffDividerComponent,
        TooltipIconRowComponent
    ],
    exports: [
        TooltipContainerComponent,
        TooltipHeaderComponent,
        TooltipRowComponent,
        TooltipDividerComponent,
        TooltipDiffDividerComponent,
        TooltipIconRowComponent
    ]
})
export class TooltipModule {}

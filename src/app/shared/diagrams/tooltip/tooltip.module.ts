import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18NextModule } from 'angular-i18next';
import { TooltipRowComponent } from 'src/app/shared/diagrams/tooltip/tooltip-row/tooltip-row.component';

@NgModule({
    imports: [CommonModule, I18NextModule],
    declarations: [TooltipRowComponent],
    exports: [TooltipRowComponent]
})
export class TooltipModule {}

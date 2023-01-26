import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18NextModule } from 'angular-i18next';
import { FullDonutComponent } from './full-donut.component';

@NgModule({
    imports: [CommonModule, I18NextModule],
    declarations: [FullDonutComponent],
    exports: [FullDonutComponent]
})
export class FullDonutModule {}

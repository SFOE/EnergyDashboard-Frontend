import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18NextModule } from 'angular-i18next';
import { CommonsModule } from '../../commons/commons.module';
import { SharedComponentsModule } from '../shared-components.module';
import { TrendAndNumberComponent } from './trend-and-number/trend-and-number.component';
import { TrendIndicatorComponent } from './trend-indicator/trend-indicator.component';

@NgModule({
    imports: [
        CommonModule,
        CommonsModule,
        SharedComponentsModule,
        I18NextModule
    ],
    declarations: [TrendIndicatorComponent, TrendAndNumberComponent],
    exports: [TrendIndicatorComponent, TrendAndNumberComponent]
})
export class TrendModule {}

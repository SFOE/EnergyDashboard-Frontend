import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { I18NextModule } from 'angular-i18next';
import { CommonsModule } from '../../commons/commons.module';
import { BarDiagramComponent } from './bar-diagram.component';

@NgModule({
    imports: [CommonModule, CommonsModule, I18NextModule, FontAwesomeModule],
    declarations: [BarDiagramComponent],
    exports: [BarDiagramComponent]
})
export class BarDiagramModule {}

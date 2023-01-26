import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { D3SvgComponent } from './d3-svg.component';

@NgModule({
    imports: [CommonModule],
    declarations: [D3SvgComponent],
    exports: [D3SvgComponent]
})
export class D3SvgModule {}

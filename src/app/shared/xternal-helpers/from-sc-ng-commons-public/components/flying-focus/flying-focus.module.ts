import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlyingFocusComponent } from './flying-focus.component';

@NgModule({
    declarations: [FlyingFocusComponent],
    imports: [CommonModule],
    exports: [FlyingFocusComponent]
})
export class FlyingFocusModule {}

import { Component } from '@angular/core';

@Component({
    selector: 'bfe-brush-explanation',
    template: '<p class="label-thin label-small label-teaser">{{"commons.brush.explanation" | i18next }}</p>',
    styleUrls: ['brush-explanation.component.scss']
})
export class BrushExplanationComponent {}

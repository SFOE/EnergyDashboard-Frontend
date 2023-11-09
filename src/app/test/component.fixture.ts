import { Component, Input } from '@angular/core';

@Component({
    selector: 'bfe-hideable-text-section',
    template: '<div></div>'
})
export class MockHideableTextSectionComponent {
    @Input() textTranslationKey: string;
    @Input() context: 'chart' | 'trend' = 'trend';
}

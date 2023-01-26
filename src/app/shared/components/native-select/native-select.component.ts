import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation
} from '@angular/core';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'select[bfe-select]',
    template: `<ng-content></ng-content>`,
    styleUrls: ['./native-select.component.scss'],
    encapsulation: ViewEncapsulation.None,
    // tslint:disable-next-line:no-host-metadata-property
    host: {
        '[class.bfe-native-select]': 'true'
    }
})
export class NativeSelectComponent {}

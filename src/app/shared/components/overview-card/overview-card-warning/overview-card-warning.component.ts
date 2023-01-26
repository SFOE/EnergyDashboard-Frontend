import {
    ChangeDetectionStrategy,
    Component,
    Input,
    ViewEncapsulation
} from '@angular/core';

@Component({
    selector: 'bfe-overview-card-warning',
    template: `
        <!--    <sc-svg url="/assets/icon/ic_alert.svg"></sc-svg>-->
        <p [translate]="key"></p>
    `,
    styleUrls: ['./overview-card-warning.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class OverviewCardWarningComponent {
    @Input() key: string;
}

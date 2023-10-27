import { Component, Input } from '@angular/core';

@Component({
    selector: 'bfe-loading-spinner',
    templateUrl: './loading-spinner.component.html',
    styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent {
    @Input() placeholder: 'chart' | 'trend' = 'trend';
}

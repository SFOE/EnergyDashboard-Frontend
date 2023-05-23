import { Component, Input } from '@angular/core';

@Component({
    selector: 'bfe-info-page',
    templateUrl: './info-page.component.html',
    styleUrls: ['./info-page.component.scss']
})
export class InfoPageComponent {
    @Input() title: string;
}

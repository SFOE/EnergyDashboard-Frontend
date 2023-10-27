import { Component, Input } from '@angular/core';

@Component({
    selector: 'bfe-tooltip-header',
    template: ` <div *ngIf="title" class="header">
        <section>{{ title | i18next }}</section>
    </div>`,
    styleUrls: ['./tooltip-header.component.scss']
})
export class TooltipHeaderComponent {
    @Input() title: string | null;
}

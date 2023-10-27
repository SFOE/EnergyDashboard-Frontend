import { Component, Input } from '@angular/core';

@Component({
    selector: 'bfe-tooltip-container',
    template: `
        <div
            class="tooltip-container"
            [class.position-relative]="positionRelative"
        >
            <ng-content select="[header]"></ng-content>

            <div class="content">
                <!-- Tooltip content goes here -->
                <ng-content></ng-content>
            </div>
        </div>
    `,
    styleUrls: ['./tooltip-container.component.scss']
})
export class TooltipContainerComponent {
    @Input() positionRelative: boolean = false;
}

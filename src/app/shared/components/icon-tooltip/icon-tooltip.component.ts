import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IconName, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { NgxTippyProps } from 'ngx-tippy-wrapper';

@Component({
    selector: 'bfe-icon-tooltip',
    template: `
        <div class="icon-tooltip-container">
            <fa-icon
                tabindex="0"
                [icon]="icon"
                [size]="iconSize"
                [tippyProps]="tippyProps"
                [ngxTippy]="tooltipTemplate"
                [style.color]="iconColor"
            ></fa-icon>

            <ng-template #tooltipTemplate>
                <ng-content></ng-content>
            </ng-template>
        </div>
    `,
    styleUrls: ['./icon-tooltip.component.scss']
})
export class IconTooltipComponent implements OnChanges {
    @Input() icon: IconName = 'info-circle';
    @Input() iconSize: SizeProp = 'lg';
    @Input() iconColor: string = '#000';

    private defaulTippyProps: NgxTippyProps = {
        trigger: 'click mouseenter focus',
        hideOnClick: true,
        allowHTML: true,
        role: 'tooltip',
        interactive: true,
        interactiveBorder: 50,
        placement: 'bottom'
    };

    @Input() tippyProps?: NgxTippyProps = this.defaulTippyProps;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['tippyProps'] && !!this.tippyProps) {
            this.tippyProps = { ...this.defaulTippyProps, ...this.tippyProps };
        }
    }
}

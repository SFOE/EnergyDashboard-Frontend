import { Component, Input } from '@angular/core';

@Component({
    selector: 'bfe-produktion-verbrauch-historgram-chart-tooltip-row',
    template: ` <div class="tooltip-row-container">
        <span class="dot" [style.backgroundColor]="color"></span>
        <span class="country-label">{{ textKey | i18next }}</span>
        <span class="value teaser">
            {{ data ?? 0 }}
            <span class="value-label">GWh</span>
        </span>
    </div>`,
    styles: [
        '.tooltip-row-container { display: flex; justify-content: flex-start; align-items: center; }',
        '.country-label { margin-right: 22px; }',
        '.dot { height: 8px; width: 8px; border-radius: 50%; display: inline-block; margin-right: 6px; }',
        '.value { justify-content: flex-end; align-items: baseline; column-gap: 4px; margin-left: auto }',
        '.value-label { font-style: normal; font-weight: 400; font-size: 7px; line-height: 8px; }'
    ]
})
export class ProduktionVerbrauchHistogramTooltipRowComponent {
    @Input() textKey: string;
    @Input() color: string;
    @Input() data: number | null;
}

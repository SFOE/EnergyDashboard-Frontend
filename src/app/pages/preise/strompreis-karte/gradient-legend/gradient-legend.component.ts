import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18NextModule } from 'angular-i18next';

@Component({
    selector: 'bfe-gradient-legend',
    standalone: true,
    templateUrl: './gradient-legend.component.html',
    styleUrls: ['./gradient-legend.component.scss'],
    imports: [CommonModule, I18NextModule]
})
export class GradientLegend {
    @Input() labels: string[] | null;
    @Input() colors: string[] | null;

    calcGradients(): string {
        if (this.colors) {
            var steps = +(100 / (this.colors.length - 1));
            let gradient = '';
            for (let i = 0; i < this.colors.length; i++) {
                var percent = (i * steps).toFixed(2);
                gradient += `${this.colors[i]} ${percent}%`;
                if (i < this.colors.length - 1) {
                    gradient += ', ';
                }
            }

            return gradient;
        }

        return '';
    }
}

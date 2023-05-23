import { Component, Input } from '@angular/core';
import { SparzielZielNachBereichAktuellerMonat } from '../../../../../core/models/sparziel';

@Component({
    selector: 'bfe-stromsparziel-aktueller-monat-details-tooltip',
    templateUrl:
        './stromsparziel-aktueller-monat-details-tooltip.component.html',
    styleUrls: [
        './stromsparziel-aktueller-monat-details-tooltip.component.scss'
    ]
})
export class StromsparzielAktuellerMonatDetailsTooltipComponent {
    @Input()
    data: SparzielZielNachBereichAktuellerMonat;

    @Input()
    industryColor: string;

    @Input()
    kmuColor: string;

    @Input()
    privateColor: string;
}

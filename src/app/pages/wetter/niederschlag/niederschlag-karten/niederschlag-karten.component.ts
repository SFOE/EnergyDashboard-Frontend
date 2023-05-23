import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { getYesterday } from '../../../../shared/static-utils/date-utils';

@Component({
    selector: 'bfe-niederschlag-karten',
    templateUrl: './niederschlag-karten.component.html',
    styleUrls: ['./niederschlag-karten.component.scss']
})
export class NiederschlagKartenComponent implements OnInit {
    @Input() loading: boolean = true;

    dateOfLastUpdate = getYesterday();
    isLoading = true;
    mapIndexToShow: number = -1;
    imageRelativeLinks: string[] = [];

    constructor() {}

    ngOnInit(): void {
        if (environment.stage === 'local') {
            this.imageRelativeLinks.push(
                './assets/karten/kpi-wetter-3_meteoswiss-niederschlag-karte-aktuellermonat-absolut.svg'
            );
            this.imageRelativeLinks.push(
                './assets/karten/kpi-wetter-3_meteoswiss-niederschlag-karte-aktuellermonat-anomalie.svg'
            );
            this.imageRelativeLinks.push(
                './assets/karten/kpi-wetter-3_meteoswiss-niederschlag-karte-letztermonat-absolut.svg'
            );
            this.imageRelativeLinks.push(
                './assets/karten/kpi-wetter-3_meteoswiss-niederschlag-karte-letztermonat-anomalie.svg'
            );
        } else {
            this.imageRelativeLinks.push(
                '/images/kpi-wetter-3_meteoswiss-niederschlag-karte-aktuellermonat-absolut.svg'
            );
            this.imageRelativeLinks.push(
                '/images/kpi-wetter-3_meteoswiss-niederschlag-karte-aktuellermonat-anomalie.svg'
            );
            this.imageRelativeLinks.push(
                '/images/kpi-wetter-3_meteoswiss-niederschlag-karte-letztermonat-absolut.svg'
            );
            this.imageRelativeLinks.push(
                '/images/kpi-wetter-3_meteoswiss-niederschlag-karte-letztermonat-anomalie.svg'
            );
        }
    }

    showMap(index: number) {
        this.mapIndexToShow = index;
    }

    closeMap() {
        this.mapIndexToShow = -1;
    }
}

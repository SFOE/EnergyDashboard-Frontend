import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import {
    convertToDate,
    monthToTranslationKey
} from '../../../../shared/static-utils/date-utils';
import { WetterService } from '../../../../services/wetter/wetter.service';

@Component({
    selector: 'bfe-niederschlag-karten',
    templateUrl: './niederschlag-karten.component.html',
    styleUrls: ['./niederschlag-karten.component.scss']
})
export class NiederschlagKartenComponent implements OnInit {
    @Input() loading: boolean = true;

    dateOfLastUpdate: Date;
    isLoading = true;
    mapIndexToShow: number = -1;
    imageRelativeLinks: string[] = [];
    currentMonthTranslationKey: string;
    lastMonthTranslationKey: string;

    constructor(private wetterService: WetterService) {}

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

        this.wetterService.getNiederschlagKartenMonths().subscribe({
            next: (data) => {
                this.dateOfLastUpdate = convertToDate(data.date.toString());
                this.currentMonthTranslationKey = monthToTranslationKey(
                    data.thisMonth - 1
                );
                this.lastMonthTranslationKey = monthToTranslationKey(
                    data.lastMonth - 1
                );
            },
            error: (error) => {
                console.error(error);
            }
        });
    }

    showMap(index: number) {
        this.mapIndexToShow = index;
    }

    closeMap() {
        this.mapIndexToShow = -1;
    }
}

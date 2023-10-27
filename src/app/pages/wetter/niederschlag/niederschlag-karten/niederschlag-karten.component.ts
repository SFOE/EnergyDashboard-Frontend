import { Component, Input, OnInit } from '@angular/core';
import { ImageSection } from 'src/app/shared/components/image-section/image-section.component';
import { WetterService } from '../../../../services/wetter/wetter.service';
import {
    convertToDate,
    monthToTranslationKey
} from '../../../../shared/static-utils/date-utils';

@Component({
    selector: 'bfe-niederschlag-karten',
    templateUrl: './niederschlag-karten.component.html',
    styleUrls: ['niederschlag-karten.component.scss']
})
export class NiederschlagKartenComponent implements OnInit {
    @Input() isLoading: boolean = true;

    imageSectionCurrentMonth: ImageSection;
    imageSectionLastMonth: ImageSection;

    constructor(private wetterService: WetterService) {}

    ngOnInit(): void {
        this.wetterService.getNiederschlagKartenMonths().subscribe({
            next: (data) => {
                const dateOfLastUpdate = convertToDate(data.date.toString());
                const currentMonthTranslationKey = monthToTranslationKey(
                    data.thisMonth - 1
                );
                const lastMonthTranslationKey = monthToTranslationKey(
                    data.lastMonth - 1
                );

                this.imageSectionCurrentMonth = {
                    dateOfLastUpdate: dateOfLastUpdate,
                    updateInterval: 'daily',
                    titleKey:
                        'dynamic:kpi-wetter-3_niederschlag-karten.currentmonth.titel',
                    longTextKey: '',
                    images: [
                        {
                            imageRelativeLink:
                                '/images/kpi-wetter-3_meteoswiss-niederschlag-karte-aktuellermonat-absolut.svg',
                            titleKey: currentMonthTranslationKey,
                            subTitleKey:
                                'dashboard.wetter.niederschlag.total-precipitation-in-mm'
                        },
                        {
                            imageRelativeLink:
                                '/images/kpi-wetter-3_meteoswiss-niederschlag-karte-aktuellermonat-anomalie.svg',
                            titleKey: currentMonthTranslationKey,
                            subTitleKey:
                                'dashboard.wetter.niederschlag.anomaly-to-norm'
                        }
                    ]
                };

                this.imageSectionLastMonth = {
                    dateOfLastUpdate: dateOfLastUpdate,
                    updateInterval: 'daily',
                    titleKey:
                        'dynamic:kpi-wetter-3_niederschlag-karten.lastmonth.titel',
                    longTextKey: '',
                    images: [
                        {
                            imageRelativeLink:
                                '/images/kpi-wetter-3_meteoswiss-niederschlag-karte-letztermonat-absolut.svg',
                            titleKey: lastMonthTranslationKey,
                            subTitleKey:
                                'dashboard.wetter.niederschlag.total-precipitation-in-mm'
                        },
                        {
                            imageRelativeLink:
                                '/images/kpi-wetter-3_meteoswiss-niederschlag-karte-letztermonat-anomalie.svg',
                            titleKey: lastMonthTranslationKey,
                            subTitleKey:
                                'dashboard.wetter.niederschlag.anomaly-to-norm'
                        }
                    ]
                };
            },
            error: (error) => {
                console.error(error);
            }
        });
    }
}

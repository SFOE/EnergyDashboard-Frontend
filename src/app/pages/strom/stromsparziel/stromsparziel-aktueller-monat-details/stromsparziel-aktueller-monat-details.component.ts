import { Component, OnInit } from '@angular/core';
import { SparzielZielNachBereichAktuellerMonat } from '../../../../core/models/sparziel';
import { StromService } from '../../../../services/strom/strom.service';
import { COLOR_CHART_HISTOGRAM_AREA_SECONDARY } from '../../../../shared/commons/colors.const';
import { COLOR_CONTEXT } from '../../strom.consts';

@Component({
    selector: 'bfe-stromsparziel-aktueller-monat-details',
    templateUrl: './stromsparziel-aktueller-monat-details.component.html',
    styleUrls: ['./stromsparziel-aktueller-monat-details.component.scss']
})
export class StromsparzielAktuellerMonatDetailsComponent implements OnInit {
    isLoading: boolean = true;
    lastUpdated: Date = new Date();
    data: SparzielZielNachBereichAktuellerMonat;

    readonly industryColor: string = COLOR_CHART_HISTOGRAM_AREA_SECONDARY;
    readonly privateColor: string = COLOR_CONTEXT + '80';
    readonly kmuColor: string = COLOR_CONTEXT;

    constructor(private stromService: StromService) {}

    ngOnInit(): void {
        this.stromService.getSparzielZielNachBereichAktuellerMonat().subscribe({
            next: (data) => {
                this.data = data;
            },
            error: (error) => {
                console.error(error);
            },
            complete: () => {
                this.isLoading = false;
            }
        });
    }

    getKmuHeight(): string {
        const percent = this.getKmuPercent();
        return Math.round((140 / 100) * percent) + 'px';
    }

    getKmuPercent(): number {
        return Math.round(
            (100 / this.data.nationalSavingsGWh) * this.data.anteilKMU
        );
    }

    getPrivateHeight(): string {
        const percent = this.getPrivatePercent();
        return Math.round((140 / 100) * percent) + 'px';
    }

    getPrivatePercent(): number {
        return Math.round(
            (100 / this.data.nationalSavingsGWh) * this.data.anteilPrivate
        );
    }

    getIndustryHeight(): string {
        const percent = this.getIndustryPercent();
        return Math.round((140 / 100) * percent) + 'px';
    }

    getIndustryPercent(): number {
        return Math.round(
            (100 / this.data.nationalSavingsGWh) * this.data.anteilIndustrie
        );
    }
}

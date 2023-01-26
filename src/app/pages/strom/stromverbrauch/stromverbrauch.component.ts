import { Component, OnInit } from '@angular/core';
import { HistogramAreaChartEntry } from '../../../core/models/charts';
import { Context } from '../../../core/models/context.enum';
import { StromVerbrauchLandesverbrauchMitPrognoseCurrentEntryApi } from '../../../core/models/strom-verbrauch.landesverbrauch-mit-prognose';
import { StromService } from '../../../services/strom/strom.service';
import { mapStromVerbrauchLandesverbrauchMitPrognoseToChartEntry } from '../../../services/strom/strom.util';
import { COLOR_CONTEXT } from '../strom.consts';

@Component({
    selector: 'bfe-stromverbrauch',
    templateUrl: './stromverbrauch.component.html',
    styleUrls: ['./stromverbrauch.component.scss']
})
export class StromverbrauchComponent implements OnInit {
    readonly COLOR_SPACE = COLOR_CONTEXT;
    readonly context = Context.STROM;

    currentEntry: StromVerbrauchLandesverbrauchMitPrognoseCurrentEntryApi;
    landesverbrauchMitPrognoseChartEntries: HistogramAreaChartEntry[];
    aktuellerEndverbrauchChartEntries: HistogramAreaChartEntry[];
    landesverbrauchVergleichChartEntries: HistogramAreaChartEntry[];
    isLoading: boolean = true;
    isLoadingAktuellerEndverbrauch: boolean = true;
    isLoadingLandesverbrauchVergleich: boolean = true;

    constructor(private stromService: StromService) {}

    ngOnInit(): void {
        this.stromService
            .getStromVerbrauchLandesverbrauchMitPrognose()
            .subscribe({
                next: (data) => {
                    this.currentEntry = data.currentEntry;
                    const chartEntries =
                        mapStromVerbrauchLandesverbrauchMitPrognoseToChartEntry(
                            data.entries
                        );
                    this.landesverbrauchMitPrognoseChartEntries =
                        this.filterCurrentTwentyTwoWeeks(chartEntries);
                    this.isLoading = false;
                },
                complete: () => {
                    this.isLoading = false;
                }
            });

        this.stromService.getStromVerbrauchEndverbrauch().subscribe({
            next: (data) => {
                this.aktuellerEndverbrauchChartEntries =
                    this.filterCurrentTwentyTwoWeeks(data);
                this.isLoadingAktuellerEndverbrauch = false;
            },
            complete: () => {
                this.isLoadingAktuellerEndverbrauch = false;
            }
        });

        this.stromService
            .getStromVerbrauchLandesverbrauchVergleich()
            .subscribe({
                next: (data) => {
                    this.landesverbrauchVergleichChartEntries = data;
                    this.isLoadingLandesverbrauchVergleich = false;
                },
                complete: () => {
                    this.isLoadingLandesverbrauchVergleich = false;
                }
            });
    }

    filterCurrentTwentyTwoWeeks(chartEntries: HistogramAreaChartEntry[]) {
        const past18weeks = new Date(
            new Date().getTime() - 18 * 7 * 24 * 60 * 60 * 1000
        ).getTime();
        const inFourWeeks = new Date(
            new Date().getTime() + 4 * 7 * 24 * 60 * 60 * 1000
        ).getTime();

        return chartEntries.filter(
            (entry) =>
                entry.date.getTime() > past18weeks &&
                entry.date.getTime() < inFourWeeks
        );
    }
}

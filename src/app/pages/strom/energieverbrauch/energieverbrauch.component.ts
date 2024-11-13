import { Component, OnInit } from '@angular/core';
import { EndenergieverbrauchMitPrognoseData } from 'src/app/core/models/energie-verbrauch.endenergieverbrauch-mit-prognose';
import { StromEntkoppelungEndenergieverbrauchBIP } from 'src/app/core/models/strom-entkoppelung-endenergieverbrauch-bip';
import { EnergieverbrauchMitPrognoseData } from 'src/app/core/models/strom-verbrauch.energieverbrauch-mit-prognose';
import { HistogramLineEntry } from 'src/app/shared/diagrams/histogram/histogram-line/histogram-line.component';
import { HistogramAreaChartEntry } from '../../../core/models/charts';
import { Context } from '../../../core/models/context.enum';
import { StromService } from '../../../services/strom/strom.service';
import { COLOR_CONTEXT } from '../strom.consts';

@Component({
    selector: 'bfe-energieverbrauch',
    templateUrl: './energieverbrauch.component.html',
    styleUrls: ['./energieverbrauch.component.scss']
})
export class EnergieverbrauchComponent implements OnInit {
    readonly COLOR_SPACE = COLOR_CONTEXT;
    readonly context = Context.STROM;

    energieverbrauchMitPrognoseData: EnergieverbrauchMitPrognoseData;
    endenergieverbrauchMitPrognoseData: EndenergieverbrauchMitPrognoseData;
    chartData: HistogramLineEntry[];
    /** The year to which the data is compared to */
    baseYear: number;
    lastUpdate?: Date;
    isLoadingEnergieverbrauchMitPrognose: boolean = true;
    isLoadingEndenergieverbrauchMitPrognose: boolean = true;
    isLoadingEnergieverbrauchBIP: boolean = true;

    constructor(private stromService: StromService) {}

    ngOnInit(): void {
        this.stromService.getEnergieverbrauchMitPrognose().subscribe({
            next: (data) => {
                this.energieverbrauchMitPrognoseData = data;
                this.isLoadingEnergieverbrauchMitPrognose = false;
            },
            complete: () => {
                this.isLoadingEnergieverbrauchMitPrognose = false;
            }
        });

        this.stromService.getEndenergieverbrauchMitPrognose().subscribe({
            next: (data) => {
                this.endenergieverbrauchMitPrognoseData = data;
                this.isLoadingEndenergieverbrauchMitPrognose = false;
            },
            complete: () => {
                this.isLoadingEndenergieverbrauchMitPrognose = false;
            }
        });

        this.stromService.getEntkoppelungEndenergieverbrauchBIP().subscribe({
            next: (entries) => {
                this.chartData =
                    this.mapEntkoppelungEndenergieverbrauchBIPToEntries(
                        entries
                    );
                this.baseYear = this.getBaseYear(this.chartData);
            },
            complete: () => (this.isLoadingEnergieverbrauchBIP = false)
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

    private mapEntkoppelungEndenergieverbrauchBIPToEntries(
        data: StromEntkoppelungEndenergieverbrauchBIP[]
    ): HistogramLineEntry[] {
        return data.map((entry) => ({
            values: [
                this.getPercentRounded(entry.endenergieverbrauchIndex),
                this.getPercentRounded(entry.heizgradtageIndex),
                this.getPercentRounded(entry.bevoelkerungIndex),
                this.getPercentRounded(entry.bipIndex)
            ],
            date: this.getDateOfYear(entry.year)
        }));
    }

    private getBaseYear(entries: HistogramLineEntry[]): number {
        const baseYearIndex = entries.findIndex((entry) =>
            entry.values.every((x) => x === 100)
        );
        if (baseYearIndex === -1) {
            console.error(
                "Couldn't infer start year of indexing (base year) from chart data"
            );
            return 0;
        }
        return entries[baseYearIndex].date.getFullYear();
    }

    private getPercentRounded(value: number, precision = 1): number {
        return Math.round(value * 10 ** (2 + precision)) / 10 ** precision;
    }

    private getDateOfYear(year: number): Date {
        // We assume it to be the last day of the year
        return new Date(`${year}-12-31`);
    }
}

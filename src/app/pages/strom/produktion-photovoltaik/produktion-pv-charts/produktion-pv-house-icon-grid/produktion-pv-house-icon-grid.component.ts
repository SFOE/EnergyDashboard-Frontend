import { Component, Input, OnInit } from '@angular/core';
import { house } from '../../../../../shared/diagrams/icon-grid/icons/house-drawing';
import { COLOR_CONTEXT } from '../../../strom.consts';
import { StromProduktionPvEntry } from '../../../../../core/models/strom-produktion-pv';
import i18next from 'i18next';

@Component({
    selector: 'bfe-produktion-pv-house-icon-grid',
    templateUrl: './produktion-pv-house-icon-grid.component.html',
    styleUrls: ['./produktion-pv-house-icon-grid.component.scss']
})
export class ProduktionPvHouseIconGridComponent implements OnInit {
    @Input() loading: boolean = true;
    @Input() gridData: StromProduktionPvEntry[];

    protected readonly house = house;
    protected readonly COLOR_CONTEXT = COLOR_CONTEXT;

    rows1: number[] = [1];
    rows2: number[] = [];

    haushalte1: number;
    haushalte2: number;

    einheit1: string;
    einheit2: string;

    // icons per line
    nbrElementsPerRow: number = 11;

    // width and height of one individual icon, taken from the svg in 'house'
    iconSize: any = {
        width: 23,
        height: 21
    };

    ngOnInit(): void {
        this.calculateNbrIcons();

        this.haushalte1 = this.formatHaushalteProJahr(
            this.gridData[0].haushalteProJahr
        );
        this.einheit1 = this.getUnit(this.gridData[0].haushalteProJahr);

        this.haushalte2 = this.formatHaushalteProJahr(
            this.gridData[1].haushalteProJahr
        );
        this.einheit2 = this.getUnit(this.gridData[1].haushalteProJahr);
    }

    private formatHaushalteProJahr(num: number): number {
        if (num >= 1_000_000) {
            return Math.round((num / 1_000_000) * 10) / 10;
        } else {
            return Math.round(num / 1_000);
        }
    }

    private getUnit(haushalteProJahr: number): string {
        return haushalteProJahr < 10 ** 6
            ? i18next.t('commons.unit.k')
            : i18next.t('commons.unit.mio');
    }

    private calculateModuloAndQuotient(
        dividend: number,
        divisor: number
    ): { remainder: number; quotient: number } {
        let remainder: number = dividend % divisor;
        let quotient: number = Math.floor(dividend / divisor);

        return { remainder, quotient };
    }

    calculateNbrIcons(): void {
        const ratio: number = Math.floor(
            this.gridData[1].haushalteProJahr /
                this.gridData[0].haushalteProJahr
        );

        let res: { remainder: number; quotient: number } =
            this.calculateModuloAndQuotient(ratio, this.nbrElementsPerRow);

        // create arrays for icon grid
        this.rows2 = new Array(res.quotient)
            .fill(this.nbrElementsPerRow)
            .concat([res.remainder]);
    }
}

import { Component, Input, OnInit } from '@angular/core';
import { Context } from '../../../../core/models/context.enum';
import { ImportExportCountryEnum } from '../../../../core/models/import-export-country.enum';

export enum ImportExportBoxOrientation {
    HORIZONTAL = 'HORIZONTAL',
    VERTICAL = 'VERTICAL'
}

@Component({
    selector: 'bfe-import-export-box',
    templateUrl: './import-export-box.component.html',
    styleUrls: ['./import-export-box.component.scss']
})
export class ImportExportBoxComponent implements OnInit {
    @Input() context: Context;
    @Input() country: ImportExportCountryEnum;
    @Input() import: number;
    @Input() export: number;
    @Input() orientation: ImportExportBoxOrientation =
        ImportExportBoxOrientation.HORIZONTAL;
    @Input() inverse = false;

    constructor() {}

    ngOnInit(): void {}

    get orientationClass() {
        return `import-export-box-${this.orientation.toLowerCase()}`;
    }

    get contextClass() {
        return `import-export-box-context-${this.context.toLowerCase()}`;
    }

    get arrowAsset() {
        if (this.context === Context.GAS) {
            return 'assets/icon/arrow_purple.svg';
        }
        return 'assets/icon/arrow_orange.svg';
    }

    get countryClass() {
        return `import-export-box-country-${this.country.toLowerCase()}`;
    }

    get countryKey() {
        return `commons.country.${this.country.toLowerCase()}`;
    }
}

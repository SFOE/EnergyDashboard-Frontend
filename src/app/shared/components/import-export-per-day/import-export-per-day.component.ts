import { Component, Input, OnInit } from '@angular/core';
import { Context } from '../../../core/models/context.enum';
import { ImportExportEntry } from '../../../core/models/import-export';
import { ImportExportCountryEnum } from '../../../core/models/import-export-country.enum';
import { ImportExportBoxOrientation } from './import-export-box/import-export-box.component';

@Component({
    selector: 'bfe-import-export-per-day',
    templateUrl: './import-export-per-day.component.html',
    styleUrls: ['./import-export-per-day.component.scss']
})
export class ImportExportPerDayComponent implements OnInit {
    @Input() context: Context;
    @Input() currentEntry: ImportExportEntry;

    readonly countries = ImportExportCountryEnum;
    readonly orientation = ImportExportBoxOrientation;

    constructor() {}

    ngOnInit(): void {}
}

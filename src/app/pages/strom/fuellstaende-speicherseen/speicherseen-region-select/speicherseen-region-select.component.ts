import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SpeicherseeRegions } from '../../strom.consts';

@Component({
    selector: 'bfe-speicherseen-region-select',
    templateUrl: './speicherseen-region-select.component.html',
    styles: ['select {width: 100%}']
})
export class SpeicherseenRegionSelectComponent {
    readonly regions = SpeicherseeRegions;
    readonly regionSelectionControl = new FormControl('totalCH');

    @Output() selectedRegion = new EventEmitter<string>();

    constructor() {
        this.regionSelectionControl.valueChanges.subscribe(
            (value) => !!value && this.selectedRegion.emit(value)
        );
    }
}

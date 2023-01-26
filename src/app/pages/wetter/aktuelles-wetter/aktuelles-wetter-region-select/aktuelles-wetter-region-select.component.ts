import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { WetterRegions } from '../../wetter.consts';

@Component({
    selector: 'bfe-aktuelles-wetter-region-select',
    templateUrl: './aktuelles-wetter-region-select.component.html',
    styles: ['select {width: 100%}']
})
export class AktuellesWetterRegionSelectComponent {
    readonly regions = WetterRegions;
    readonly regionSelectionControl = new FormControl('Schweiz');

    @Output() selectedRegion = new EventEmitter<string>();

    constructor() {
        this.regionSelectionControl.valueChanges.subscribe(
            (value) => !!value && this.selectedRegion.emit(value)
        );
    }
}

import { CommonModule } from '@angular/common';
import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { I18NextModule } from 'angular-i18next';
import { SharedComponentsModule } from '../../../shared/components/shared-components.module';

@Component({
    selector: 'bfe-select',
    templateUrl: './select.component.html',
    styles: ['select {width: 100%}'],
    standalone: true,
    imports: [
        CommonModule,
        I18NextModule,
        ReactiveFormsModule,
        SharedComponentsModule
    ]
})
// TODO: combine NativeSelectComponent and this one, replace all other more specific selects with a general one (this?)
export class SelectComponent implements OnChanges {
    @Input() options: { key: string; value: string }[] = [];
    @Input() selectedOptionKey: string;

    @Output() selectedValue = new EventEmitter<string>();

    regionSelectionControl: FormControl = new FormControl('test');

    ngOnChanges(changes: SimpleChanges): void {
        if (this.selectedOptionKey) {
            this.regionSelectionControl = new FormControl(
                this.selectedOptionKey
            );

            this.regionSelectionControl.valueChanges.subscribe(
                (value) => !!value && this.selectedValue.emit(value)
            );
        }
    }
}

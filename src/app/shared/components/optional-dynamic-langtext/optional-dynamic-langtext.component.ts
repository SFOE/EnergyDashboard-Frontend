import { Component, Input, OnChanges } from '@angular/core';
import { TranslationService } from '../../../core/i18n/translation.service';
import {take} from "rxjs";

@Component({
    selector: 'bfe-optional-dynamic-langtext',
    templateUrl: './optional-dynamic-langtext.component.html',
    styleUrls: ['./optional-dynamic-langtext.component.scss']
})
export class OptionalDynamicLangtextComponent implements OnChanges {
    @Input() text?: string;
    isEmpty: boolean;

    existingDynamicText = this.getTranslation();

    constructor(private translationService: TranslationService) {}

    ngOnChanges() {
        this.translationService.isTranslationLoaded.pipe(take(1)).subscribe(() => {
            this.existingDynamicText = this.getTranslation();

            if (!this.existingDynamicText) {
                this.isEmpty = false;
                return;
            }
            if (this.existingDynamicText == this.text) {
                this.isEmpty = false;
                return;
            }
            if (this.existingDynamicText.length == 0) {
                this.isEmpty = false;
                return;
            }
        });
    }



    private getTranslation() {
        if (!this.text) {
            return '';
        }

        return this.translationService.returnTranslation(
            `dynamic:${this.text}`
        );
    }
}

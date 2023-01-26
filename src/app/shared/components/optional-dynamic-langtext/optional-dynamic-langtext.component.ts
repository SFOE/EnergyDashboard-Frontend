import { Component, Input, OnChanges } from '@angular/core';
import { TranslationService } from '../../../core/i18n/translation.service';

@Component({
    selector: 'bfe-optional-dynamic-langtext',
    templateUrl: './optional-dynamic-langtext.component.html',
    styleUrls: ['./optional-dynamic-langtext.component.scss']
})
export class OptionalDynamicLangtextComponent implements OnChanges {
    @Input() text: string;
    isEmpty: boolean;

    existingDynamicText = this.getTranslation();

    constructor(private translationService: TranslationService) {}

    getTranslation() {
        if (!this.text) {
            return '';
        }

        return this.translationService.returnTranslation(
            `dynamic:${this.text}`
        );
    }

    ngOnChanges() {
        this.existingDynamicText = this.getTranslation();
        if (this.getTranslation() == this.text) {
            this.isEmpty = false;
        }
        if (this.getTranslation().length == 0) {
            this.isEmpty = false;
        }
    }
}

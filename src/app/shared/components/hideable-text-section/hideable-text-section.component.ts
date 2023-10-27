import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { I18NextModule } from 'angular-i18next';
import { take } from 'rxjs';
import { TranslationService } from 'src/app/core/i18n/translation.service';
import { SelectComponent } from 'src/app/shared/components/select/select.component';
import { CommonsModule } from '../../commons/commons.module';

@Component({
    standalone: true,
    selector: 'bfe-hideable-text-section',
    templateUrl: './hideable-text-section.component.html',
    styleUrls: ['./hideable-text-section.component.scss'],
    imports: [
        I18NextModule,
        CommonModule,
        SelectComponent,
        CommonsModule,
        FontAwesomeModule
    ]
})
export class HideableTextSection implements OnInit, OnChanges {
    @Input() context: 'chart' | 'trend' = 'trend';
    @Input() textTranslationKey: string;

    hide: boolean = true;
    titleTranslationKey: string;
    hideTitleTranslationKey: string;
    showTitleTranslationKey: string;

    isEmpty: boolean;

    titleTranslationKeys = {
        chart: {
            show: 'hideable.text.section.chart.title.show',
            hide: 'hideable.text.section.chart.title.hide'
        },
        trend: {
            show: 'hideable.text.section.trend.title.show',
            hide: 'hideable.text.section.trend.title.hide'
        }
    };

    existingDynamicText = this.getTranslation();

    constructor(private translationService: TranslationService) {}

    ngOnInit(): void {
        this.titleTranslationKey = this.getTitleTranslationKey(this.hide);
    }

    ngOnChanges() {
        this.translationService.isTranslationLoaded
            .pipe(take(1))
            .subscribe(() => {
                this.existingDynamicText = this.getTranslation();

                if (!this.existingDynamicText) {
                    this.isEmpty = false;
                    return;
                }
                if (this.existingDynamicText == this.textTranslationKey) {
                    this.isEmpty = false;
                    return;
                }
                if (this.existingDynamicText.length == 0) {
                    this.isEmpty = false;
                    return;
                }
            });
    }

    toggleTextSection(): void {
        this.hide = !this.hide;
        this.titleTranslationKey = this.getTitleTranslationKey(this.hide);
        this.hideTitleTranslationKey = this.getTitleTranslationKey(true);
        this.showTitleTranslationKey = this.getTitleTranslationKey(false);
    }

    private getTitleTranslationKey(hide: boolean): string {
        var key = this.titleTranslationKeys[this.context];

        if (key === undefined) {
            return '';
        }

        if (hide) {
            return key.show;
        } else {
            return key.hide;
        }
    }

    private getTranslation() {
        if (!this.textTranslationKey) {
            return '';
        }

        return this.translationService.returnTranslation(
            `${this.textTranslationKey}`
        );
    }
}

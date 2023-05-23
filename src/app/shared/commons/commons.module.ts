import { NgModule } from '@angular/core';
import { ThousandCommaPipe } from './thousand-comma.pipe';
import { AbsoluteNumberPipe } from './absolute-number.pipe';
import { AdminNumPipe } from './admin-num.pipe';
import { FmtDatePipe } from './fmt-date.pipe';
import { FmtIsoWeekPipePipe } from './fmt-iso-week.pipe';
import { I18nextDynamicPipe } from './i18next-dynamic.pipe';
import { IntersectionDirective } from './intersection.directive';
import { IsDefinedPipe } from './is-defined.pipe';
import { ParseIsoDatePipe } from './parse-iso-date.pipe';
import { PercentDisplayPipe } from './percent-display.pipe';
import { ReplaceHyphenWithEnDashPipe } from './replace-hyphen-with-en-dash.pipe';
import { RoundNumberPipe } from './roundNumber.pipe';
import { SvgAnimateDirective } from './svg-animate.directive';
import { ToDatePipe } from './to-date.pipe';

@NgModule({
    imports: [],
    declarations: [
        // I18nPipe,
        // I18nCheckKeyPipe,
        ToDatePipe,
        IntersectionDirective,
        AdminNumPipe,
        RoundNumberPipe,
        // TranslateDirective,
        FmtDatePipe,
        ParseIsoDatePipe,
        FmtIsoWeekPipePipe,
        IsDefinedPipe,
        SvgAnimateDirective,
        ReplaceHyphenWithEnDashPipe,
        PercentDisplayPipe,
        I18nextDynamicPipe,
        AbsoluteNumberPipe,
        ThousandCommaPipe
    ],
    exports: [
        // I18nPipe,
        // I18nCheckKeyPipe,
        ToDatePipe,
        IntersectionDirective,
        AdminNumPipe,
        RoundNumberPipe,
        // TranslateDirective,
        FmtDatePipe,
        ParseIsoDatePipe,
        FmtIsoWeekPipePipe,
        IsDefinedPipe,
        SvgAnimateDirective,
        ReplaceHyphenWithEnDashPipe,
        PercentDisplayPipe,
        I18nextDynamicPipe,
        AbsoluteNumberPipe,
        ThousandCommaPipe
    ]
})
export class CommonsModule {}

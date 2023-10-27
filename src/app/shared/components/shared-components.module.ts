import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
    FaIconLibrary,
    FontAwesomeModule
} from '@fortawesome/angular-fontawesome';
import {
    IconDefinition,
    faBolt,
    faExclamation,
    faExclamationTriangle,
    faInfoCircle,
    faUpRightFromSquare,
    faXmark
} from '@fortawesome/free-solid-svg-icons';
import { faFireFlame } from '@fortawesome/pro-solid-svg-icons';
import { I18NextModule } from 'angular-i18next';
import { NgxResize } from 'ngx-resize';
import { NgxTippyModule } from 'ngx-tippy-wrapper';
import { CommonsModule } from '../commons/commons.module';
import { HistogramChartTooltipComponent } from '../diagrams/tooltip/histogram-chart-tooltip/histogram-chart-tooltip.component';
import { TooltipModule } from '../diagrams/tooltip/tooltip.module';
import { ContextIconComponent } from './context-icon/context-icon.component';
import { ContextTitleComponent } from './context-title/context-title.component';
import { DividerComponent } from './divider/divider.component';
import { ExpandableComponent } from './expandable/expandable.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NavBoardComponent } from './header/nav-board/nav-board.component';
import { IconTooltipComponent } from './icon-tooltip/icon-tooltip.component';
import { ImportExportBoxComponent } from './import-export-per-day/import-export-box/import-export-box.component';
import { ImportExportPerDayComponent } from './import-export-per-day/import-export-per-day.component';
import { InfoPageComponent } from './info-page/info-page.component';
import { KpiContainerRowComponent } from './kpi-container/kpi-container-row/kpi-container-row.component';
import { KpiContainerComponent } from './kpi-container/kpi-container.component';
import { KpiDateInfoSubtextComponent } from './kpi-container/kpi-date-info-subtext/kpi-date-info-subtext.component';
import { KpiFooterComponent } from './kpi-container/kpi-footer/kpi-footer.component';
import { KpiSubtitleComponent } from './kpi-container/kpi-subtitle/kpi-subtitle.component';
import { LargeNumberUnitComponent } from './large-number-unit/large-number-unit.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { MasterDetailComponent } from './master-detail/master-detail.component';
import { MasterDetailDirective } from './master-detail/master-detail.directive';
import { NativeSelectComponent } from './native-select/native-select.component';
import { OptionalDynamicLangtextComponent } from './optional-dynamic-langtext/optional-dynamic-langtext.component';
import { OverviewCardHintDirective } from './overview-card/overview-card-hint.directive';
import { OverviewCardInfoDirective } from './overview-card/overview-card-info.directive';
import { OverviewCardWarningDirective } from './overview-card/overview-card-warning.directive';
import { OverviewCardWarningComponent } from './overview-card/overview-card-warning/overview-card-warning.component';
import { OverviewCardComponent } from './overview-card/overview-card.component';
import { PageTitleComponent } from './page-title/page-title.component';
import { PageTopNavigationComponent } from './page-top-navigation/page-top-navigation.component';
import { PointsOfInterestLegendComponent } from './points-of-interest-legend/points-of-interest-legend.component';
import { StatusAmpelComponent } from './status-ampel/status-ampel.component';
import { TabItemDirective } from './tab-list/tab-item.directive';
import { TabListComponent } from './tab-list/tab-list.component';

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        NavBoardComponent,
        PageTitleComponent,
        PageTopNavigationComponent,
        TabListComponent,
        TabItemDirective,
        OverviewCardComponent,
        OverviewCardInfoDirective,
        OverviewCardWarningDirective,
        OverviewCardHintDirective,
        OverviewCardWarningComponent,
        MasterDetailComponent,
        MasterDetailDirective,
        NativeSelectComponent,
        LoadingSpinnerComponent,
        LargeNumberUnitComponent,
        KpiFooterComponent,
        KpiSubtitleComponent,
        KpiContainerRowComponent,
        KpiContainerComponent,
        HistogramChartTooltipComponent,
        ImportExportBoxComponent,
        ImportExportPerDayComponent,
        StatusAmpelComponent,
        IconTooltipComponent,
        ContextIconComponent,
        OptionalDynamicLangtextComponent,
        KpiDateInfoSubtextComponent,
        ContextTitleComponent,
        PointsOfInterestLegendComponent,
        InfoPageComponent,
        ExpandableComponent
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        NavBoardComponent,
        PageTitleComponent,
        PageTopNavigationComponent,
        TabListComponent,
        TabItemDirective,
        OverviewCardComponent,
        OverviewCardInfoDirective,
        OverviewCardWarningDirective,
        OverviewCardHintDirective,
        OverviewCardWarningComponent,
        MasterDetailComponent,
        MasterDetailDirective,
        NativeSelectComponent,
        LoadingSpinnerComponent,
        LargeNumberUnitComponent,
        KpiFooterComponent,
        KpiSubtitleComponent,
        KpiContainerRowComponent,
        KpiContainerComponent,
        HistogramChartTooltipComponent,
        ImportExportBoxComponent,
        ImportExportPerDayComponent,
        StatusAmpelComponent,
        IconTooltipComponent,
        ContextIconComponent,
        OptionalDynamicLangtextComponent,
        KpiDateInfoSubtextComponent,
        ContextTitleComponent,
        PointsOfInterestLegendComponent,
        InfoPageComponent,
        DividerComponent
    ],
    imports: [
        TooltipModule,
        CommonModule,
        A11yModule,
        CommonsModule,
        I18NextModule,
        RouterModule,
        FontAwesomeModule,
        NgxTippyModule,
        NgxResize,
        DividerComponent
    ]
})
export class SharedComponentsModule {
    constructor(library: FaIconLibrary) {
        library.addIcons(
            faExclamation,
            faExclamationTriangle,
            faInfoCircle,
            faFireFlame as IconDefinition,
            faBolt,
            faUpRightFromSquare,
            faXmark
        );
    }
}

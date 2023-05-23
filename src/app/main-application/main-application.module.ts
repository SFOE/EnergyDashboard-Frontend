import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainApplicationComponent } from './main-application.component';
import { MainApplicationRoutingModule } from './main-application-routing.module';
import { SharedComponentsModule } from '../shared/components/shared-components.module';
import { FlyingFocusModule } from '../shared/xternal-helpers/from-sc-ng-commons-public/components/flying-focus/flying-focus.module';
import { AxStatementComponent } from '../pages/ax-statement/ax-statement.component';
import { IntegrationGuideComponent } from '../pages/integration-guide/integration-guide.component';
import { I18NextModule } from 'angular-i18next';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    declarations: [
        MainApplicationComponent,
        AxStatementComponent,
        IntegrationGuideComponent
    ],
    imports: [
        CommonModule,
        MainApplicationRoutingModule,
        SharedComponentsModule,
        FlyingFocusModule,
        I18NextModule,
        FontAwesomeModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MainApplicationModule {}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntkoppelungEndenergieverbrauchBipChartComponent } from './entkoppelung-endenergieverbrauch-bip-chart.component';
import { I18NextModule } from 'angular-i18next';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonsModule } from 'src/app/shared/commons/commons.module';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { MockHideableTextSectionComponent } from 'src/app/test/component.fixture';

describe('EntkoppelungEndenergieverbrauchBipChartComponent', () => {
    let component: EntkoppelungEndenergieverbrauchBipChartComponent;
    let fixture: ComponentFixture<EntkoppelungEndenergieverbrauchBipChartComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                EntkoppelungEndenergieverbrauchBipChartComponent,
                MockHideableTextSectionComponent
            ],
            imports: [
                I18NextModule.forRoot(),
                HttpClientTestingModule,
                CommonsModule,
                SharedComponentsModule
            ]
        });
        fixture = TestBed.createComponent(
            EntkoppelungEndenergieverbrauchBipChartComponent
        );
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

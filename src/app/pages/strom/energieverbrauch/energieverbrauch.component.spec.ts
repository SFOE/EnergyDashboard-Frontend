import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18NextModule } from 'angular-i18next';
import { CommonsModule } from '../../../shared/commons/commons.module';
import { SharedComponentsModule } from '../../../shared/components/shared-components.module';

import { MockHideableTextSectionComponent } from '../../../test/component.fixture';
import { mockActivatedRouteProvider } from '../../../test/queryParamService.fixture';
import { EnergieverbrauchComponent } from './energieverbrauch.component';

describe('EnergieverbrauchComponent', () => {
    let component: EnergieverbrauchComponent;
    let fixture: ComponentFixture<EnergieverbrauchComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                I18NextModule.forRoot(),
                HttpClientTestingModule,
                CommonsModule,
                SharedComponentsModule
            ],
            providers: [mockActivatedRouteProvider],
            declarations: [
                EnergieverbrauchComponent,
                MockHideableTextSectionComponent
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(EnergieverbrauchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

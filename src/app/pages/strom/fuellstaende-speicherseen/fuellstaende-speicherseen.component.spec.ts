import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { I18NextModule } from 'angular-i18next';
import { CommonsModule } from '../../../shared/commons/commons.module';
import { SharedComponentsModule } from '../../../shared/components/shared-components.module';

import { mockActivatedRouteProvider } from '../../../test/queryParamService.fixture';
import { FuellstaendeSpeicherseenComponent } from './fuellstaende-speicherseen.component';
import { SpeicherseenRegionSelectComponent } from './speicherseen-region-select/speicherseen-region-select.component';

describe('FuellstaendeSpeicherseenComponent', () => {
    let component: FuellstaendeSpeicherseenComponent;
    let fixture: ComponentFixture<FuellstaendeSpeicherseenComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                I18NextModule.forRoot(),
                HttpClientTestingModule,
                CommonsModule,
                SharedComponentsModule,
                ReactiveFormsModule
            ],
            declarations: [
                FuellstaendeSpeicherseenComponent,
                SpeicherseenRegionSelectComponent
            ],
            providers: [mockActivatedRouteProvider]
        }).compileComponents();

        fixture = TestBed.createComponent(FuellstaendeSpeicherseenComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

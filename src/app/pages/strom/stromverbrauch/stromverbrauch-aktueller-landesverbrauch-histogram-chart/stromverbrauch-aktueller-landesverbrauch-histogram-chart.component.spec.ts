import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18NextModule } from 'angular-i18next';
import { CommonsModule } from '../../../../shared/commons/commons.module';
import { SharedComponentsModule } from '../../../../shared/components/shared-components.module';
import { StromverbrauchAktuellerLandesverbrauchHistogramChartComponent } from './stromverbrauch-aktueller-landesverbrauch-histogram-chart.component';

describe('StromverbrauchAktuellerLandesverbrauchHistogramChartComponent', () => {
    let component: StromverbrauchAktuellerLandesverbrauchHistogramChartComponent;
    let fixture: ComponentFixture<StromverbrauchAktuellerLandesverbrauchHistogramChartComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                I18NextModule.forRoot(),
                HttpClientTestingModule,
                CommonsModule,
                SharedComponentsModule
            ],
            declarations: [
                StromverbrauchAktuellerLandesverbrauchHistogramChartComponent
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(
            StromverbrauchAktuellerLandesverbrauchHistogramChartComponent
        );
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

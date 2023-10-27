import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18NextModule } from 'angular-i18next';
import { Trend, TrendRating } from '../../../core/models/trend.enum';
import { CommonsModule } from '../../../shared/commons/commons.module';
import { SharedComponentsModule } from '../../../shared/components/shared-components.module';
import { mockActivatedRouteProvider } from '../../../test/queryParamService.fixture';
import { GasImportComponent } from './gas-import.component';

describe('GasImportComponent', () => {
    let component: GasImportComponent;
    let fixture: ComponentFixture<GasImportComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                I18NextModule.forRoot(),
                HttpClientTestingModule,
                CommonsModule,
                SharedComponentsModule
            ],
            declarations: [GasImportComponent],
            providers: [mockActivatedRouteProvider]
        }).compileComponents();

        fixture = TestBed.createComponent(GasImportComponent);
        component = fixture.componentInstance;
        component.currentEntry = {
            date: new Date(),
            import: { at: 1, de: 1, fr: 1, it: 1 },
            export: { at: 1, de: 1, fr: 1, it: 1 },
            nettoImportCH: 1,
            trend: Trend.NEUTRAL,
            trendRating: TrendRating.NEUTRAL
        };
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

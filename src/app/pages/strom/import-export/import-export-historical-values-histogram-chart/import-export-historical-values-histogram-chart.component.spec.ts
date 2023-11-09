import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18NextModule } from 'angular-i18next';
import { Trend, TrendRating } from '../../../../core/models/trend.enum';
import { CommonsModule } from '../../../../shared/commons/commons.module';
import { SharedComponentsModule } from '../../../../shared/components/shared-components.module';
import { MockHideableTextSectionComponent } from '../../../../test/component.fixture';
import { ImportExportHistoricalValuesHistogramChartComponent } from './import-export-historical-values-histogram-chart.component';

describe('ImportExportHistoricalValuesHistogramChartComponent', () => {
    let component: ImportExportHistoricalValuesHistogramChartComponent;
    let fixture: ComponentFixture<ImportExportHistoricalValuesHistogramChartComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                I18NextModule.forRoot(),
                HttpClientTestingModule,
                CommonsModule,
                SharedComponentsModule
            ],
            declarations: [
                ImportExportHistoricalValuesHistogramChartComponent,
                MockHideableTextSectionComponent
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(
            ImportExportHistoricalValuesHistogramChartComponent
        );
        component = fixture.componentInstance;
        component.currentEntry = {
            date: new Date(),
            import: { at: 1, de: 1, fr: 1, it: 1 },
            export: { at: 1, de: 1, fr: 1, it: 1 },
            nettoImportCH: 1,
            trend: Trend.NEUTRAL,
            trendRating: TrendRating.NEUTRAL
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

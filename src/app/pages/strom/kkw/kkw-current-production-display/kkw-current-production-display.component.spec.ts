import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18NextModule } from 'angular-i18next';
import { of } from 'rxjs';
import { StromKkwProductionData } from '../../../../services/strom/strom.model';
import { SharedComponentsModule } from '../../../../shared/components/shared-components.module';
import { MockHistogramLineEntry } from '../../../../test/histogram.fixture';
import { KkwCurrentProductionDisplayComponent } from './kkw-current-production-display.component';
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

describe('KkwCurrentProductionDisplayComponent', () => {
    let component: KkwCurrentProductionDisplayComponent;
    let fixture: ComponentFixture<KkwCurrentProductionDisplayComponent>;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [KkwCurrentProductionDisplayComponent],
            imports: [
                CommonModule,
                SharedComponentsModule,
                I18NextModule.forRoot()
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
    });

    const mockProductionData: StromKkwProductionData = {
        entries: [
            MockHistogramLineEntry({ dateOptions: { year: 2022 } }),
            MockHistogramLineEntry({ dateOptions: { year: 2023 } })
        ],
        ausfaelle: []
    };

    beforeEach(() => {
        fixture = TestBed.createComponent(KkwCurrentProductionDisplayComponent);
        component = fixture.componentInstance;
    });

    describe('before OnInit', () => {
        it('should set loading to true initially', () => {
            expect(component.isLoading).toBeTruthy();
        });
    });

    describe('after OnInit', () => {
        beforeEach(() => {
            component.productionData = of(mockProductionData);
            fixture.detectChanges();
        });

        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('should display the latest production entry as latestEntry', () => {
            expect(component.latestProduction).toEqual(
                mockProductionData.entries[1].values[1]
            );
        });

        it('should set loading to false on data', () => {
            expect(component.isLoading).toBeFalsy();
        });
    });
});

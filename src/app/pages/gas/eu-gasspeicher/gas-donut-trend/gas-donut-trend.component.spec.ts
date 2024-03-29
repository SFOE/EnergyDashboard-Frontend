import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18NextModule } from 'angular-i18next';
import { CommonsModule } from '../../../../shared/commons/commons.module';
import { SharedComponentsModule } from '../../../../shared/components/shared-components.module';
import { TrendModule } from '../../../../shared/components/trend/trend.module';
import { SemiDonutModule } from '../../../../shared/diagrams/semi-donut/semi-donut.module';

import { GasDonutTrendComponent } from './gas-donut-trend.component';

describe('GasDonutTrendComponent', () => {
    let component: GasDonutTrendComponent;
    let fixture: ComponentFixture<GasDonutTrendComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                I18NextModule.forRoot(),
                CommonsModule,
                SharedComponentsModule,
                SemiDonutModule,
                TrendModule
            ],
            declarations: [GasDonutTrendComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(GasDonutTrendComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

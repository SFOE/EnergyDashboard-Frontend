/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18NextModule } from 'angular-i18next';
import { Trend, TrendRating } from '../../../../core/models/trend.enum';
import { CommonsModule } from '../../../commons/commons.module';
import { SharedComponentsModule } from '../../shared-components.module';
import { TrendIndicatorComponent } from '../trend-indicator/trend-indicator.component';

import { TrendAndNumberComponent } from './trend-and-number.component';

describe('TrendAndNumberComponent', () => {
    let component: TrendAndNumberComponent;
    let fixture: ComponentFixture<TrendAndNumberComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                I18NextModule.forRoot(),
                CommonsModule,
                SharedComponentsModule
            ],
            declarations: [TrendAndNumberComponent, TrendIndicatorComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TrendAndNumberComponent);
        component = fixture.componentInstance;
        component.model = {
            color: 'green',
            bigNumber: {
                value: 1,
                postfix: 'postfix',
                subTextKeys: []
            },
            trend: {
                value: Trend.NEUTRAL,
                rating: TrendRating.NEUTRAL,
                subTextKeys: []
            }
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

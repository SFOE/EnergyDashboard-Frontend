import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { I18NextModule } from 'angular-i18next';
import { CommonsModule } from '../../../../shared/commons/commons.module';
import { SharedComponentsModule } from '../../../../shared/components/shared-components.module';
import { DiagramLegendModule } from '../../../../shared/diagrams/diagram-legend/diagram-legend.module';
import { MockHideableTextSectionComponent } from '../../../../test/component.fixture';
import { ProduktionStrommixDonutMarsComponent } from './produktion-strommix-donut-mars.component';

describe('ProduktionStrommixDonutMarsComponent', () => {
    let component: ProduktionStrommixDonutMarsComponent;
    let fixture: ComponentFixture<ProduktionStrommixDonutMarsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                I18NextModule.forRoot(),
                HttpClientTestingModule,
                CommonsModule,
                SharedComponentsModule,
                DiagramLegendModule,
                FontAwesomeModule
            ],
            declarations: [
                ProduktionStrommixDonutMarsComponent,
                MockHideableTextSectionComponent
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ProduktionStrommixDonutMarsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

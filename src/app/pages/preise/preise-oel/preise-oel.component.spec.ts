import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18NextModule } from 'angular-i18next';
import { AppModule } from '../../../app.module';
import { CommonsModule } from '../../../shared/commons/commons.module';
import { SharedComponentsModule } from '../../../shared/components/shared-components.module';
import { MockHideableTextSectionComponent } from '../../../test/component.fixture';
import { PreiseOelComponent } from './preise-oel.component';

describe('PreiseOelComponent', () => {
    let component: PreiseOelComponent;
    let fixture: ComponentFixture<PreiseOelComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                I18NextModule.forRoot(),
                HttpClientTestingModule,
                AppModule,
                CommonsModule,
                SharedComponentsModule
            ],
            declarations: [PreiseOelComponent, MockHideableTextSectionComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(PreiseOelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

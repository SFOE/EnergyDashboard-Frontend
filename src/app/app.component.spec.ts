import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { I18NextModule } from 'angular-i18next';
import { AppComponent } from './app.component';
import { CommonsModule } from './shared/commons/commons.module';
import { NavBoardService } from './shared/components/header/nav-board/nav-board.service';
import { SharedComponentsModule } from './shared/components/shared-components.module';
import { FlyingFocusModule } from './shared/xternal-helpers/from-sc-ng-commons-public/components/flying-focus/flying-focus.module';

describe('AppComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                I18NextModule.forRoot(),
                CommonsModule,
                SharedComponentsModule,
                HttpClientTestingModule,
                OverlayModule,
                RouterTestingModule,
                FlyingFocusModule
            ],
            providers: [NavBoardService],
            declarations: [AppComponent]
        }).compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});

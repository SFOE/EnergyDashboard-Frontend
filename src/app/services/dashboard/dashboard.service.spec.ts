/* tslint:disable:no-unused-variable */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { I18NextModule } from 'angular-i18next';
import { DashboardService } from './dashboard.service';

describe('Service: Dashboard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [I18NextModule.forRoot(), HttpClientTestingModule],
            providers: [DashboardService]
        });
    });

    it('should ...', inject([DashboardService], (service: DashboardService) => {
        expect(service).toBeTruthy();
    }));
});

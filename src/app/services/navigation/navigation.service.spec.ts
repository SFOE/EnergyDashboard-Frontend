/* tslint:disable:no-unused-variable */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { I18NextModule } from 'angular-i18next';
import { NavigationService } from './navigation.service';

describe('Service: Navigation', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [I18NextModule.forRoot(), HttpClientTestingModule],
            providers: [NavigationService]
        });
    });
    it('should ...', inject(
        [NavigationService],
        (service: NavigationService) => {
            expect(service).toBeTruthy();
        }
    ));
});

/* tslint:disable:no-unused-variable */

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {inject, TestBed} from '@angular/core/testing';
import {I18NextModule} from 'angular-i18next';
import {StromService} from './strom.service';

describe('Service: Strom', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [I18NextModule.forRoot(), HttpClientTestingModule],
            providers: [StromService]
        });
    });

    it('should ...', inject([StromService], (service: StromService) => {
        expect(service).toBeTruthy();
    }));
});

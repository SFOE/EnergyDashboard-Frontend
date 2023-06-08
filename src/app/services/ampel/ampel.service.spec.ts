/* tslint:disable:no-unused-variable */

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { I18NextModule } from 'angular-i18next';
import { AmpelService } from './ampel.service';

describe('Service: Ampel', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [I18NextModule.forRoot(), HttpClientTestingModule],
            providers: [AmpelService]
        });
    });

    it('should ...', inject([AmpelService], (service: AmpelService) => {
        expect(service).toBeTruthy();
    }));
});

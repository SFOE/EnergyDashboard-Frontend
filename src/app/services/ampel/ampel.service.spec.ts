/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AmpelService } from './ampel.service';

describe('Service: Ampel', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AmpelService]
        });
    });

    it('should ...', inject([AmpelService], (service: AmpelService) => {
        expect(service).toBeTruthy();
    }));
});

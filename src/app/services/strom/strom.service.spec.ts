/* tslint:disable:no-unused-variable */

import { inject, TestBed } from '@angular/core/testing';
import { StromService } from './strom.service';

describe('Service: Strom', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [StromService]
        });
    });

    it('should ...', inject([StromService], (service: StromService) => {
        expect(service).toBeTruthy();
    }));
});

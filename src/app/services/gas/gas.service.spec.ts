import { TestBed } from '@angular/core/testing';

import { GasService } from './gas.service';

describe('GasService', () => {
    let service: GasService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(GasService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});

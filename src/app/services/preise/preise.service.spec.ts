import { TestBed } from '@angular/core/testing';

import { PreiseService } from './preise.service';

describe('PreiseService', () => {
    let service: PreiseService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PreiseService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});

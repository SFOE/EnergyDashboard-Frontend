import { TestBed } from '@angular/core/testing';

import { WetterService } from './wetter.service';

describe('WetterService', () => {
    let service: WetterService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(WetterService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});

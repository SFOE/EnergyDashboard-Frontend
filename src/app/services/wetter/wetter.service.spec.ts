import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { I18NextModule } from 'angular-i18next';

import { WetterService } from './wetter.service';

describe('WetterService', () => {
    let service: WetterService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [I18NextModule.forRoot(), HttpClientTestingModule]
        });
        service = TestBed.inject(WetterService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});

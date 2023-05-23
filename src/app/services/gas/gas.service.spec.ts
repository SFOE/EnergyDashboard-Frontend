import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { I18NextModule } from 'angular-i18next';

import { GasService } from './gas.service';

describe('GasService', () => {
    let service: GasService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [I18NextModule.forRoot(), HttpClientTestingModule]
        });
        service = TestBed.inject(GasService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});

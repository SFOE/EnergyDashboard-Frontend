/* tslint:disable:no-unused-variable */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { I18NextModule } from 'angular-i18next';
import { BehaviorSubject } from 'rxjs';
class ActivatedRouteMock {
    private queryParamSubject = new BehaviorSubject({});
    private paramMapSubject = new BehaviorSubject(convertToParamMap({}));

    queryParams = this.queryParamSubject.asObservable();
    params = this.queryParamSubject.asObservable();
    queryParamMap = this.queryParamSubject.asObservable();
    paramMap = this.paramMapSubject.asObservable();

    setQueryParam(paramName: string, paramValue: string): void {
        const paramMap = convertToParamMap({ [paramName]: paramValue });
        this.paramMapSubject.next(paramMap);
    }
    setParamMap(params: any) {
        this.paramMapSubject.next(params);
    }
    getParam() {
        return this.paramMapSubject.getValue();
    }
}

describe('Service: QueryParams', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [I18NextModule.forRoot(), HttpClientTestingModule],
            providers: [
                {
                    provide: ActivatedRoute,
                    useClass: ActivatedRouteMock
                }
            ]
        });
    });
    it('should ...', inject([ActivatedRoute], (service: ActivatedRoute) => {
        expect(service).toBeTruthy();
    }));
});

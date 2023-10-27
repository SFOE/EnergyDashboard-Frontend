import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { QueryParamService } from '../services/queryparams/queryparams.service';

export const mockActivatedRoute = {
    snapshot: {
        queryParamMap: convertToParamMap({ viewtype: 'default' }) // Set your desired parameters here
    }
};

export const mockActivatedRouteProvider = {
    provide: ActivatedRoute,
    useValue: mockActivatedRoute
};

export class QueryParamServiceMock {
    isAppView(): boolean {
        return false;
    }
}

export const mockQueryParamServiceProvider = {
    provide: QueryParamService,
    useClass: QueryParamServiceMock
};

export class RouterMock {
    navigate(): boolean {
        return false;
    }
}

export const mockRouterProvider = {
    provide: Router,
    useClass: RouterMock
};

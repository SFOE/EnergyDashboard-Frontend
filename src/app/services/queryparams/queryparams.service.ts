import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlatformParam } from '../../core/navigation/query-params.const';
@Injectable({
    providedIn: 'root'
})
export class QueryParamService {
    constructor(private route: ActivatedRoute) {}

    getQueryParam(paramName: string): string | null {
        const queryParams = this.route.snapshot.queryParamMap;
        return queryParams.get(paramName);
    }

    getViewType(): PlatformParam {
        const queryParams = this.route.snapshot.queryParamMap;
        return (
            (queryParams.get('viewtype') as PlatformParam) ||
            (PlatformParam.WEB as PlatformParam)
        );
    }

    isAppView(): boolean {
        const queryParams = this.route.snapshot.queryParamMap;
        return queryParams.get('viewtype') === PlatformParam.APP;
    }
    isEmbedView(): boolean {
        const queryParams = this.route.snapshot.queryParamMap;
        return queryParams.get('viewtype') === PlatformParam.EMBED;
    }
}

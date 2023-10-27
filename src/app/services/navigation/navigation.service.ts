import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { PlatformParam } from '../../core/navigation/query-params.const';

@Injectable({
    providedIn: 'root'
})
export class NavigationService {
    constructor(private router: Router) {}

    navigateToLink(link: string, viewType?: PlatformParam) {
        switch (viewType) {
            case PlatformParam.EMBED:
                // Open the link in a new tab
                window.open(`${environment.rootUrl}/${link}`);
                break;
            case PlatformParam.APP:
                const urlWithParams = this.router
                    .createUrlTree([`${link}`], {
                        queryParamsHandling: 'merge'
                    })
                    .toString();
                window.open(`${environment.rootUrl}/${urlWithParams}`, '_self');
                break;
            default:
                this.router.navigate([link], {
                    queryParamsHandling: 'merge'
                });
        }
    }
}

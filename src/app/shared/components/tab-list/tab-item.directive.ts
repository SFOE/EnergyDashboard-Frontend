import { Directive, Input, TemplateRef } from '@angular/core';

// tslint:disable:directive-selector
@Directive({ selector: '[tabItem]' })
export class TabItemDirective {
    /** the route as it is used for a routerLink */
    @Input('tabItem')
    routeArgs: any[];

    constructor(readonly template: TemplateRef<any>) {}
}

import { TemplateRef } from '@angular/core';
import { Context } from '../../../core/models/context.enum';
import { MasterDetailMenuItem } from './master-detail-configuration.model';
import { MasterDetailContext } from './master-detail-menu-item-context.type';

export interface MasterDetailData<
    T extends MasterDetailMenuItem = MasterDetailMenuItem
> {
    space?: Context;
    items: T[];
    alertTemplate?: TemplateRef<any>;
    templateRef: TemplateRef<MasterDetailContext<T>>;
    stickyHeaderEl: HTMLElement | null;
}

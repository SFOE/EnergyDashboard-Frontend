import { Context } from '../../../core/models/context.enum';
export interface MasterDetailMenuItem {
    title: string;
    pathArgs: any[];
    fragment?: string;
    children?: MasterDetailMenuItem[];
}

export interface MasterDetailConfiguration<T extends MasterDetailMenuItem> {
    context?: Context;
    menuItems: T[];
}

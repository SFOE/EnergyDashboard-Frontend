import { Context } from '../../../core/models/context.enum';
import { IsNewModel } from '../../../core/navigation/nav-links.const';

export interface MasterDetailMenuItem {
    title: string;
    pathArgs: any[];
    fragment?: string;
    children?: MasterDetailMenuItem[];
    isNew?: IsNewModel;
}

export interface MasterDetailConfiguration<T extends MasterDetailMenuItem> {
    context?: Context;
    menuItems: T[];
}

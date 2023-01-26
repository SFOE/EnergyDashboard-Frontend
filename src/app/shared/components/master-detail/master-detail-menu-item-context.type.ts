import { MasterDetailMenuItem } from './master-detail-configuration.model';

export interface MasterDetailContext<
    T extends MasterDetailMenuItem = MasterDetailMenuItem
> {
    $implicit: T;
}

import { InjectionToken } from '@angular/core';
import { MasterDetailData } from './master-detail-data.type';

export const MASTER_DETAIL_DATA = new InjectionToken<MasterDetailData>(
    'MASTER_DETAIL_DATA'
);

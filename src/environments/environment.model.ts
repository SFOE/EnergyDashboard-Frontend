import { environment } from './environment';

export interface Environment {
    stage: Stage;
    production: boolean;
    baseUrl: string;
    rootUrl: string;
    gaTrackingId?: string;
    appleAppId?: string;
}

export type Stage = 'production' | 'development' | 'local';

export const isProductionEnvironment = (): boolean => {
    return environment.stage === 'production';
};

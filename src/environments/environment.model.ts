import { environment } from './environment';

export interface Environment {
    stage: Stage;
    production: boolean;
    baseUrl: string;
    gaTrackingId?: string;
}

export type Stage = 'production' | 'development' | 'local';

export const isProductionEnvironment = (): boolean => {
    return environment.stage === 'production';
};

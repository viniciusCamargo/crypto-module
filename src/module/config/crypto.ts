import { InjectionToken } from '@hapiness/core';
import { ModuleConfiguration } from 'pem';

export const CRYPTO_CONFIG = new InjectionToken('CRYPTO_CONFIG');

export interface CryptoConfig {
    pem: ModuleConfiguration;
}

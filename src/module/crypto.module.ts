import { CoreModuleWithProviders, HapinessModule } from '@hapiness/core';
import { RandomstringService, AESService, PEMService, RSAService, HashService } from './services';
import { CRYPTO_CONFIG, CryptoConfig } from './config';

@HapinessModule({
    version: '1.0.0-rc.6',
    exports: [
        RandomstringService,
        AESService,
        PEMService,
        RSAService,
        HashService
    ]
})
export class CryptoModule {
    static setConfig(config: CryptoConfig): CoreModuleWithProviders {
        return {
            module: CryptoModule,
            providers: [{ provide: CRYPTO_CONFIG, useValue: config }]
        };
    }
}

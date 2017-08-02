import { CoreModuleWithProviders, HapinessModule } from '@hapiness/core';
import { RandomstringService, AESService, PEMService, RSAService, HashService, JWTService } from './services';
import { CRYPTO_CONFIG, CryptoConfig } from './config';

@HapinessModule({
    version: '1.0.0-rc.6.2',
    exports: [
        RandomstringService,
        AESService,
        PEMService,
        RSAService,
        HashService,
        JWTService
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

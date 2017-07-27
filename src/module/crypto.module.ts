import { CoreModuleWithProviders, HapinessModule } from '@hapiness/core';
import { RandomstringService, AesService, PemService, RSAService, HashService } from './services';
import { CRYPTO_CONFIG, CryptoConfig } from './config';

@HapinessModule({
    version: '1.0.0',
    exports: [
        RandomstringService,
        AesService,
        PemService,
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

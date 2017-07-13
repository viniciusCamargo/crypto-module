import { HapinessModule } from '@hapiness/core';
import { RandomstringService, AesService, PemService, RsaService } from './services';

@HapinessModule({
    version: '1.0.0',
    providers: [
        RandomstringService,
        AesService,
        PemService,
        RsaService
    ],
    exports: [
        RandomstringService,
        AesService,
        PemService,
        RsaService
    ]
})
export class CryptoModule {}

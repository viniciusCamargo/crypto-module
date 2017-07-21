import { HapinessModule } from '@hapiness/core';
import { RandomstringService, AesService, PemService, RSAService } from './services';

@HapinessModule({
    version: '1.0.0',
    providers: [
        RandomstringService,
        AesService,
        PemService,
        RSAService
    ],
    exports: [
        RandomstringService,
        AesService,
        PemService,
        RSAService
    ]
})
export class CryptoModule {}

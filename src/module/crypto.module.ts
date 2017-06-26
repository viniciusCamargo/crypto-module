import { HapinessModule } from '@hapiness/core';
import { RandomstringService, AesService, PemService } from './services';

@HapinessModule({
    version: '1.0.0',
    providers: [
        RandomstringService,
        AesService,
        PemService
    ],
    exports: [
        RandomstringService,
        AesService,
        PemService
    ]
})
export class CryptoModule {}

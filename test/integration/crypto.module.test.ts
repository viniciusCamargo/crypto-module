/**
 * @see https://github.com/pana-cc/mocha-typescript
 */
import { test, suite, only } from 'mocha-typescript';

/**
 * @see http://unitjs.com/
 */
import * as unit from 'unit.js';

import { Hapiness, HapinessModule, Lib, OnStart } from '@hapiness/core';
import { Observable } from 'rxjs/Observable';

// element to test
import { CryptoModule, RandomstringService, AesService, PemService } from '../../src';

declare const Buffer;

const encrypt_me = `'Space... The final frontier...These are the voyages of the Starship Enterprise.
                      Its continuing mission: To explore strange new worlds... To seek out new life;
                      new civilisations... To boldly go where no one has gone before!'`;

@suite('- Integration CryptoModuleTest file')
class CryptoModuleIntegrationTest {

    /**
     * Class constructor
     * New lifecycle
     */
    constructor() {}

    /**
     * Function executed before each test
     */
    before() {}

    /**
     * Function executed after each test
     */
    after() {}

    @test('- Injected `RandomstringService` must have `generate` function')
    testInjectableRandomstringServiceGenerate(done) {
        @Lib()
        class CryptoLib {
            constructor(private _helloWorldService: RandomstringService) {
                unit.object(this._helloWorldService).isInstanceOf(RandomstringService);
                unit.function(this._helloWorldService.generate);
                this._helloWorldService.generate().subscribe(str => unit.string(str).when(_ => done()));
            }
        }

        @HapinessModule({
            version: '1.0.0',
            imports: [
                CryptoModule
            ],
            declarations: [
                CryptoLib
            ]
        })
        class CryptoModuleTest {}

        Hapiness.bootstrap(CryptoModuleTest);
    }

    @test('- Test injected `AesService`')
    testInjectableAesService(done) {
        @Lib()
        class CryptoLib {
            constructor(private _helloWorldService: AesService) {
                unit.function(this._helloWorldService.generateKey);
                unit.function(this._helloWorldService.encrypt);
                unit.function(this._helloWorldService.decrypt);
                const obs = this._helloWorldService.generateKey({ password: 'hello', salt: 'world' });
                unit.object(obs).isInstanceOf(Observable);
                obs.map(m => {
                    unit.object(m).hasProperties(['key', 'iv']);
                    unit.string(m.key).is('c1555303da309f6b7d1e8fe45636bfdd');
                    unit.string(m.iv).is('dc4bf56405e7e94e');
                    return m;
                })
                .switchMap(aesKey => this._helloWorldService.encrypt({ aesKey, input: encrypt_me }).map((encrypted) => {
                    unit.object(encrypted).isInstanceOf(Buffer);
                    return ({ aesKey, encrypted });
                }))
                .switchMap(({ aesKey, encrypted }) => {
                    return this._helloWorldService.decrypt({ input: encrypted, aesKey: aesKey }).map(decrypted => {
                        unit.object(decrypted).isInstanceOf(Buffer);
                    });
                })
                .subscribe(decrypted => {
                    done();
                });
            }
        }

        @HapinessModule({
            version: '1.0.0',
            imports: [
                CryptoModule
            ],
            declarations: [
                CryptoLib
            ]
        })
        class CryptoModuleTest {}

        Hapiness.bootstrap(CryptoModuleTest);
    }

    @test('- Test injected `PemService`')
    testInjectablePemService(done) {
        @Lib()
        class CryptoLib {
            constructor(private _helloWorldService: PemService) {
                unit.function(this._helloWorldService.generatePrivateKey);
                unit.function(this._helloWorldService.getPublicKey);
                unit.function(this._helloWorldService.generatePair);
                const obs = this._helloWorldService.generatePair();
                unit.object(obs).isInstanceOf(Observable);
                obs.subscribe(m => {
                    unit.object(m).hasProperties(['privateKey', 'publicKey']);
                    unit.string(m.privateKey);
                    unit.string(m.publicKey);
                    done();
                });
            }
        }

        @HapinessModule({
            version: '1.0.0',
            imports: [
                CryptoModule
            ],
            declarations: [
                CryptoLib
            ]
        })
        class CryptoModuleTest {}

        Hapiness.bootstrap(CryptoModuleTest);
    }

}

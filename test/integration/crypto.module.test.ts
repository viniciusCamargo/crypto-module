/**
 * @see https://github.com/pana-cc/mocha-typescript
 */
import { test, suite } from 'mocha-typescript';

/**
 * @see http://unitjs.com/
 */
import * as unit from 'unit.js';

import { Hapiness, HapinessModule, OnStart } from '@hapiness/core';

// element to test
import { CryptoModule, PemService, AesService, RSAService, RandomstringService } from '../../src';

@suite('- Integration CryptoModuleTest file')
class CryptoModuleTest {
    /**
     * Class constructor
     */
    constructor() {
    }

    /**
     * Function executed before each test
     */
    before() {}

    /**
     * Function executed after each test
     */
    after() {}

    /**
     * Test if `PemService.createPrivateKey()` Observable returns an error if openSSL path is wrong
     */
    @test('- check if `PemService.createPrivateKey()` Observable returns an error if openSSL path is wrong')
    testPemServiceFunctionErrorWithWrongConfig(done) {
        @HapinessModule({
            version: '1.0.0',
            imports: [
                CryptoModule.setConfig({ pem: { pathOpenSSL: '' } })
            ]
        })
        class ModuleTest implements OnStart {
            constructor(private _pemService: PemService) {}

            onStart(): void {
                this._pemService.createPrivateKey().subscribe(null, e => unit.error(e))
            }
        }

        Hapiness.bootstrap(ModuleTest).then(_ => done());
    }

    /**
     * Test if injected `_pemService` is an instance of `PemService`
     */
    @test('- check if injected `_pemService` is an instance of `PemService`')
    testPemServiceInjected(done) {
        @HapinessModule({
            version: '1.0.0',
            imports: [
                CryptoModule
            ]
        })
        class ModuleTest implements OnStart {
            constructor(private _pemService: PemService) {}

            onStart(): void {
                unit.object(this._pemService).isInstanceOf(PemService);
            }
        }

        Hapiness.bootstrap(ModuleTest).then(_ => done());
    }

    /**
     * Test if injected `_aesService` is an instance of `AesService`
     */
    @test('- check if injected `_aesService` is an instance of `AesService`')
    testAesServiceInjected(done) {
        @HapinessModule({
            version: '1.0.0',
            imports: [
                CryptoModule
            ]
        })
        class ModuleTest implements OnStart {
            constructor(private _aesService: AesService) {}

            onStart(): void {
                unit.object(this._aesService).isInstanceOf(AesService);
            }
        }

        Hapiness.bootstrap(ModuleTest).then(_ => done());
    }

    /**
     * Test if injected `_rsaService` is an instance of `RSAService`
     */
    @test('- check if injected `_rsaService` is an instance of `RSAService`')
    testRsaServiceInjected(done) {
        @HapinessModule({
            version: '1.0.0',
            imports: [
                CryptoModule
            ]
        })
        class ModuleTest implements OnStart {
            constructor(private _rsaService: RSAService) {}

            onStart(): void {
                unit.object(this._rsaService).isInstanceOf(RSAService);
            }
        }

        Hapiness.bootstrap(ModuleTest).then(_ => done());
    }

    /**
     * Test if injected `_randomstringService` is an instance of `RandomstringService`
     */
    @test('- check if injected `_randomstringService` is an instance of `RandomstringService`')
    testRandomstringServiceInjected(done) {
        @HapinessModule({
            version: '1.0.0',
            imports: [
                CryptoModule
            ]
        })
        class ModuleTest implements OnStart {
            constructor(private _randomstringService: RandomstringService) {}

            onStart(): void {
                unit.object(this._randomstringService).isInstanceOf(RandomstringService);
            }
        }

        Hapiness.bootstrap(ModuleTest).then(_ => done());
    }
}

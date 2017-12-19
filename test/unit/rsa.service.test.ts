/**
 * @see https://github.com/pana-cc/mocha-typescript
 */
import { suite, test } from 'mocha-typescript';

/**
 * @see http://unitjs.com/
 */
import * as unit from 'unit.js';

import { Observable } from 'rxjs/Observable';

// element to test
import { RSAService } from '../../src';
import '../../src/rsa/add/operator/importKey';
import '../../src/rsa/add/operator/exportKey';
import '../../src/rsa/add/operator/isPrivate';
import '../../src/rsa/add/operator/isPublic';
import '../../src/rsa/add/operator/generateKeyPair';
import '../../src/rsa/add/operator/isEmptyKey';
import '../../src/rsa/add/operator/getKeySize';
import '../../src/rsa/add/operator/getMaxMessageSize';
import '../../src/rsa/add/operator/encryptPublic';
import '../../src/rsa/add/operator/encryptPrivate';
import '../../src/rsa/add/operator/decryptPrivate';
import '../../src/rsa/add/operator/decryptPublic';
import '../../src/rsa/add/operator/sign';
import '../../src/rsa/add/operator/verify';
import {
    importKey,
    exportKey,
    isPrivate,
    isPublic,
    generateKeyPair,
    isEmptyKey,
    getKeySize,
    getMaxMessageSize,
    encryptPublic,
    encryptPrivate,
    decryptPublic,
    decryptPrivate,
    sign,
    verify
} from '../../src/rsa/operators';

@suite('- Unit RSAServiceTest file')
export class RSAServiceTest {
    // private property to store service instance
    private _rsaService: RSAService;

    /**
     * Class constructor
     */
    constructor() {
    }

    /**
     * Function executed before each test
     */
    before() {
        this._rsaService = new RSAService();
    }

    /**
     * Function executed after each test
     */
    after() {
        this._rsaService = undefined;
    }

    /**
     * Test if `RSAService` as a `generate` function
     */
    @test('- `RSAService` must have `createKey` function')
    testRsaServiceCreateKey() {
        unit.function(this._rsaService.createKey);
    }

    /**
     * Test if `RSAService.createKey()` function returns an Observable
     */
    @test('- `RSAService.createKey()` function must return an Observable')
    testRsaServiceCreateKeyObservable() {
        unit.object(this._rsaService.createKey()).isInstanceOf(Observable);
    }

    /**
     * Test if `RSAService` as a `generate` function
     */
    @test('- `RSAService` must have `loadKey` function')
    testRsaServiceLoadKey() {
        unit.function(this._rsaService.loadKey);
    }

    /**
     * Test if `RSAService.loadKey()` function returns an Observable
     */
    @test('- `RSAService.loadKey()` function must return an Observable')
    testRsaServiceLoadKeyObservable() {
        unit.object(this._rsaService.loadKey(null)).isInstanceOf(Observable);
    }

    /**
     * Test if `RSAService.createKey().importKey()` function returns an Observable
     */
    @test('- `RSAService.createKey().importKey()` function must return an Observable')
    testRsaServiceImportKeyObservable() {
        unit.object(this._rsaService.createKey().importKey(null)).isInstanceOf(Observable);
    }

    /**
     * Test if `RSAService.createKey().importKey()` lettable operator returns an Observable
     */
    @test('- `RSAService.createKey().importKey()` lettable operator must return an Observable')
    testRsaServiceLettableImportKeyObservable() {
        unit.object(this._rsaService.createKey()
            .pipe(
                importKey(null)
            )
        ).isInstanceOf(Observable);
    }

    /**
     * Test if `RSAService.createKey().generateKeyPair()` function returns an Observable
     */
    @test('- `RSAService.createKey().generateKeyPair()` function must return an Observable')
    testRsaServiceGenerateKeyPairObservable() {
        unit.object(this._rsaService.createKey().generateKeyPair()).isInstanceOf(Observable);
    }

    /**
     * Test if `RSAService.createKey().generateKeyPair()` lettable operator returns an Observable
     */
    @test('- `RSAService.createKey().generateKeyPair()` lettable operator must return an Observable')
    testRsaServiceLettableGenerateKeyPairObservable() {
        unit.object(this._rsaService.createKey()
            .pipe(
                generateKeyPair()
            )
        ).isInstanceOf(Observable);
    }

    /**
     * Test if `RSAService.loadKey().exportKey()` function returns an Observable
     */
    @test('- `RSAService.loadKey().exportKey()` function must return an Observable')
    testRsaServiceExportKeyObservable() {
        unit.object(this._rsaService.loadKey(null).exportKey(null)).isInstanceOf(Observable);
    }

    /**
     * Test if `RSAService.loadKey().exportKey()` lettable operator returns an Observable
     */
    @test('- `RSAService.loadKey().exportKey()` lettable operator must return an Observable')
    testRsaServiceLettableExportKeyObservable() {
        unit.object(this._rsaService.loadKey(null)
            .pipe(
                exportKey(null)
            )
        ).isInstanceOf(Observable);
    }

    /**
     * Test if `RSAService.loadKey().isPrivate()` function returns an Observable
     */
    @test('- `RSAService.loadKey().isPrivate()` function must return an Observable')
    testRsaServiceIsPrivateKeyObservable() {
        unit.object(this._rsaService.loadKey(null).isPrivate()).isInstanceOf(Observable);
    }

    /**
     * Test if `RSAService.loadKey().isPrivate()` lettable operator returns an Observable
     */
    @test('- `RSAService.loadKey().isPrivate()` lettable operator must return an Observable')
    testRsaServiceLettableIsPrivateKeyObservable() {
        unit.object(this._rsaService.loadKey(null)
            .pipe(
                isPrivate()
            )
        ).isInstanceOf(Observable);
    }

    /**
     * Test if `RSAService.loadKey().isPublic()` function returns an Observable
     */
    @test('- `RSAService.loadKey().isPublic()` function must return an Observable')
    testRsaServiceIsPublicKeyObservable() {
        unit.object(this._rsaService.loadKey(null).isPublic()).isInstanceOf(Observable);
    }

    /**
     * Test if `RSAService.loadKey().isPublic()` lettable operator returns an Observable
     */
    @test('- `RSAService.loadKey().isPublic()` lettable operator must return an Observable')
    testRsaServiceLettableIsPublicKeyObservable() {
        unit.object(this._rsaService.loadKey(null)
            .pipe(
                isPublic()
            )
        ).isInstanceOf(Observable);
    }

    /**
     * Test if `RSAService.loadKey().isEmptyKey()` function returns an Observable
     */
    @test('- `RSAService.loadKey().isEmptyKey()` function must return an Observable')
    testRsaServiceIsEmptyKeyObservable() {
        unit.object(this._rsaService.loadKey(null).isEmptyKey()).isInstanceOf(Observable);
    }

    /**
     * Test if `RSAService.loadKey().isEmptyKey()` lettable operator returns an Observable
     */
    @test('- `RSAService.loadKey().isEmptyKey()` lettable operator must return an Observable')
    testRsaServiceLettableIsEmptyKeyObservable() {
        unit.object(this._rsaService.loadKey(null)
            .pipe(
                isEmptyKey()
            )
        ).isInstanceOf(Observable);
    }

    /**
     * Test if `RSAService.loadKey().getKeySize()` function returns an Observable
     */
    @test('- `RSAService.loadKey().getKeySize()` function must return an Observable')
    testRsaServiceKeySizeObservable() {
        unit.object(this._rsaService.loadKey(null).getKeySize()).isInstanceOf(Observable);
    }

    /**
     * Test if `RSAService.loadKey().getKeySize()` lettable operator returns an Observable
     */
    @test('- `RSAService.loadKey().getKeySize()` lettable operator must return an Observable')
    testRsaServiceLettableKeySizeObservable() {
        unit.object(this._rsaService.loadKey(null)
            .pipe(
                getKeySize()
            )
        ).isInstanceOf(Observable);
    }

    /**
     * Test if `RSAService.loadKey().getMaxMessageSize()` function returns an Observable
     */
    @test('- `RSAService.loadKey().getMaxMessageSize()` function must return an Observable')
    testRsaServiceMaxMessageSizeObservable() {
        unit.object(this._rsaService.loadKey(null).getMaxMessageSize()).isInstanceOf(Observable);
    }

    /**
     * Test if `RSAService.loadKey().getMaxMessageSize()` lettable operator returns an Observable
     */
    @test('- `RSAService.loadKey().getMaxMessageSize()` lettable operator must return an Observable')
    testRsaServiceLettableMaxMessageSizeObservable() {
        unit.object(this._rsaService.loadKey(null)
            .pipe(
                getMaxMessageSize()
            )
        ).isInstanceOf(Observable);
    }

    /**
     * Test if `RSAService.loadKey().encryptPublic()` function returns an Observable
     */
    @test('- `RSAService.loadKey().encryptPublic()` function must return an Observable')
    testRsaServiceEncryptPublicObservable() {
        unit.object(this._rsaService.loadKey(null).encryptPublic(null)).isInstanceOf(Observable);
    }

    /**
     * Test if `RSAService.loadKey().encryptPublic()` lettable operator returns an Observable
     */
    @test('- `RSAService.loadKey().encryptPublic()` lettable operator must return an Observable')
    testRsaServiceLettableEncryptPublicObservable() {
        unit.object(this._rsaService.loadKey(null)
            .pipe(
                encryptPublic(null)
            )
        ).isInstanceOf(Observable);
    }

    /**
     * Test if `RSAService.loadKey().encryptPrivate()` function returns an Observable
     */
    @test('- `RSAService.loadKey().encryptPrivate()` function must return an Observable')
    testRsaServiceEncryptPrivateObservable() {
        unit.object(this._rsaService.loadKey(null).encryptPrivate(null)).isInstanceOf(Observable);
    }

    /**
     * Test if `RSAService.loadKey().encryptPrivate()` lettable operator returns an Observable
     */
    @test('- `RSAService.loadKey().encryptPrivate()` lettable operator must return an Observable')
    testRsaServiceLettableEncryptPrivateObservable() {
        unit.object(this._rsaService.loadKey(null)
            .pipe(
                encryptPrivate(null)
            )
        ).isInstanceOf(Observable);
    }

    /**
     * Test if `RSAService.loadKey().decryptPrivate()` function returns an Observable
     */
    @test('- `RSAService.loadKey().decryptPrivate()` function must return an Observable')
    testRsaServiceDecryptPrivateObservable() {
        unit.object(this._rsaService.loadKey(null).decryptPrivate(null)).isInstanceOf(Observable);
    }

    /**
     * Test if `RSAService.loadKey().decryptPrivate()` lettable operator returns an Observable
     */
    @test('- `RSAService.loadKey().decryptPrivate()` lettable operator must return an Observable')
    testRsaServiceLettableDecryptPrivateObservable() {
        unit.object(this._rsaService.loadKey(null)
            .pipe(
                decryptPrivate(null)
            )
        ).isInstanceOf(Observable);
    }

    /**
     * Test if `RSAService.loadKey().decryptPublic()` function returns an Observable
     */
    @test('- `RSAService.loadKey().decryptPublic()` function must return an Observable')
    testRsaServiceDecryptPublicObservable() {
        unit.object(this._rsaService.loadKey(null).decryptPublic(null)).isInstanceOf(Observable);
    }

    /**
     * Test if `RSAService.loadKey().decryptPublic()` lettable operator returns an Observable
     */
    @test('- `RSAService.loadKey().decryptPublic()` lettable operator must return an Observable')
    testRsaServiceLettableDecryptPublicObservable() {
        unit.object(this._rsaService.loadKey(null)
            .pipe(
                decryptPublic(null)
            )
        ).isInstanceOf(Observable);
    }

    /**
     * Test if `RSAService.loadKey().sign()` function returns an Observable
     */
    @test('- `RSAService.loadKey().sign()` function must return an Observable')
    testRsaServiceSignObservable() {
        unit.object(this._rsaService.loadKey(null).sign(null)).isInstanceOf(Observable);
    }

    /**
     * Test if `RSAService.loadKey().sign()` lettable operator returns an Observable
     */
    @test('- `RSAService.loadKey().sign()` lettable operator must return an Observable')
    testRsaServiceLettableSignObservable() {
        unit.object(this._rsaService.loadKey(null)
            .pipe(
                sign(null)
            )
        ).isInstanceOf(Observable);
    }

    /**
     * Test if `RSAService.loadKey().verify()` function returns an Observable
     */
    @test('- `RSAService.loadKey().verify()` function must return an Observable')
    testRsaServiceVerifyObservable() {
        unit.object(this._rsaService.loadKey(null).verify(null, null)).isInstanceOf(Observable);
    }

    /**
     * Test if `RSAService.loadKey().verify()` lettable operator returns an Observable
     */
    @test('- `RSAService.loadKey().verify()` lettable operator must return an Observable')
    testRsaServiceLettableVerifyObservable() {
        unit.object(this._rsaService.loadKey(null)
            .pipe(
                verify(null, null)
            )
        ).isInstanceOf(Observable);
    }
}

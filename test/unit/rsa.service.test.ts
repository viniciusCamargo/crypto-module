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
import '../../src/observable/add/rsa/importKey';
import '../../src/observable/add/rsa/exportKey';
import '../../src/observable/add/rsa/isPrivate';
import '../../src/observable/add/rsa/isPublic';
import '../../src/observable/add/rsa/generateKeyPair';
import '../../src/observable/add/rsa/isEmptyKey';
import '../../src/observable/add/rsa/getKeySize';
import '../../src/observable/add/rsa/getMaxMessageSize';
import '../../src/observable/add/rsa/encryptPublic';
import '../../src/observable/add/rsa/encryptPrivate';
import '../../src/observable/add/rsa/decryptPrivate';
import '../../src/observable/add/rsa/decryptPublic';
import '../../src/observable/add/rsa/sign';
import '../../src/observable/add/rsa/verify';

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
     * Test if `RSAService.createKey().generateKeyPair()` function returns an Observable
     */
    @test('- `RSAService.createKey().generateKeyPair()` function must return an Observable')
    testRsaServiceGenerateKeyPairObservable() {
        unit.object(this._rsaService.createKey().generateKeyPair()).isInstanceOf(Observable);
    }

    /**
     * Test if `RSAService.loadKey().exportKey()` function returns an Observable
     */
    @test('- `RSAService.loadKey().exportKey()` function must return an Observable')
    testRsaServiceExportKeyObservable() {
        unit.object(this._rsaService.loadKey(null).exportKey(null)).isInstanceOf(Observable);
    }

    /**
     * Test if `RSAService.loadKey().isPrivate()` function returns an Observable
     */
    @test('- `RSAService.loadKey().isPrivate()` function must return an Observable')
    testRsaServiceIsPrivateKeyObservable() {
        unit.object(this._rsaService.loadKey(null).isPrivate()).isInstanceOf(Observable);
    }

    /**
     * Test if `RSAService.loadKey().isPublic()` function returns an Observable
     */
    @test('- `RSAService.loadKey().isPublic()` function must return an Observable')
    testRsaServiceIsPublicKeyObservable() {
        unit.object(this._rsaService.loadKey(null).isPublic()).isInstanceOf(Observable);
    }

    /**
     * Test if `RSAService.loadKey().isEmptyKey()` function returns an Observable
     */
    @test('- `RSAService.loadKey().isEmptyKey()` function must return an Observable')
    testRsaServiceIsEmptyKeyObservable() {
        unit.object(this._rsaService.loadKey(null).isEmptyKey()).isInstanceOf(Observable);
    }

    /**
     * Test if `RSAService.loadKey().getKeySize()` function returns an Observable
     */
    @test('- `RSAService.loadKey().getKeySize()` function must return an Observable')
    testRsaServiceKeySizeObservable() {
        unit.object(this._rsaService.loadKey(null).getKeySize()).isInstanceOf(Observable);
    }

    /**
     * Test if `RSAService.loadKey().getMaxMessageSize()` function returns an Observable
     */
    @test('- `RSAService.loadKey().getMaxMessageSize()` function must return an Observable')
    testRsaServiceMaxMessageSizeObservable() {
        unit.object(this._rsaService.loadKey(null).getMaxMessageSize()).isInstanceOf(Observable);
    }

    /**
     * Test if `RSAService.loadKey().encryptPublic()` function returns an Observable
     */
    @test('- `RSAService.loadKey().encryptPublic()` function must return an Observable')
    testRsaServiceEncryptPublicObservable() {
        unit.object(this._rsaService.loadKey(null).encryptPublic(null)).isInstanceOf(Observable);
    }

    /**
     * Test if `RSAService.loadKey().encryptPrivate()` function returns an Observable
     */
    @test('- `RSAService.loadKey().encryptPrivate()` function must return an Observable')
    testRsaServiceEncryptPrivateObservable() {
        unit.object(this._rsaService.loadKey(null).encryptPrivate(null)).isInstanceOf(Observable);
    }

    /**
     * Test if `RSAService.loadKey().decryptPrivate()` function returns an Observable
     */
    @test('- `RSAService.loadKey().decryptPrivate()` function must return an Observable')
    testRsaServiceDecryptPrivateObservable() {
        unit.object(this._rsaService.loadKey(null).decryptPrivate(null)).isInstanceOf(Observable);
    }

    /**
     * Test if `RSAService.loadKey().decryptPublic()` function returns an Observable
     */
    @test('- `RSAService.loadKey().decryptPublic()` function must return an Observable')
    testRsaServiceDecryptPublicObservable() {
        unit.object(this._rsaService.loadKey(null).decryptPublic(null)).isInstanceOf(Observable);
    }

    /**
     * Test if `RSAService.loadKey().sign()` function returns an Observable
     */
    @test('- `RSAService.loadKey().sign()` function must return an Observable')
    testRsaServiceSignObservable() {
        unit.object(this._rsaService.loadKey(null).sign(null)).isInstanceOf(Observable);
    }

    /**
     * Test if `RSAService.loadKey().verify()` function returns an Observable
     */
    @test('- `RSAService.loadKey().verify()` function must return an Observable')
    testRsaServiceVerifyObservable() {
        unit.object(this._rsaService.loadKey(null).verify(null, null)).isInstanceOf(Observable);
    }
}

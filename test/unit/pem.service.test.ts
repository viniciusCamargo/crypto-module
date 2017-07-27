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
import { PemService } from '../../src';

@suite('- Unit PemServiceTest file')
class PemServiceTest {
    // private property to store service instance
    private _pemService: PemService;

    /**
     * Class constructor
     */
    constructor() {}

    /**
     * Function executed before each test
     */
    before() {
        this._pemService = new PemService();
    }

    /**
     * Function executed after each test
     */
    after() {
        this._pemService = undefined;
    }

    /**
     * Test if `PemService` as a `createPrivateKey` function
     */
    @test('- `PemService` must have `createPrivateKey` function')
    testPemServiceCreatePrivateKey() {
        unit.function(this._pemService.createPrivateKey);
    }

    /**
     * Test if `PemService.createPrivateKey()` function returns an Observable
     */
    @test('- `PemService.createPrivateKey()` function must return an Observable')
    testPemServiceCreatePrivateKeyObservable() {
        unit.object(this._pemService.createPrivateKey()).isInstanceOf(Observable);
    }

    /**
     * Test if `PemService` as a `createDhparam` function
     */
    @test('- `PemService` must have `createDhparam` function')
    testPemServiceCreateDhparam() {
        unit.function(this._pemService.createDhparam);
    }

    /**
     * Test if `PemService.generate()` function returns an Observable
     */
    @test('- `PemService.createDhparam()` function must return an Observable')
    testPemServiceCreateDhparamObservable() {
        unit.object(this._pemService.createDhparam()).isInstanceOf(Observable);
    }

    /**
     * Test if `PemService` as a `createCSR` function
     */
    @test('- `PemService` must have `createCSR` function')
    testPemServiceCreateCSR() {
        unit.function(this._pemService.createCSR);
    }

    /**
     * Test if `PemService.createCSR()` function returns an Observable
     */
    @test('- `PemService.createCSR()` function must return an Observable')
    testPemServiceCreateCSRObservable() {
        unit.object(this._pemService.createCSR()).isInstanceOf(Observable);
    }

    /**
     * Test if `PemService` as a `createCertificate` function
     */
    @test('- `PemService` must have `createCertificate` function')
    testPemServiceCreateCertificate() {
        unit.function(this._pemService.createCertificate);
    }

    /**
     * Test if `PemService.createCertificate()` function returns an Observable
     */
    @test('- `PemService.createCertificate()` function must return an Observable')
    testPemServiceCreateCertificateObservable() {
        unit.object(this._pemService.createCertificate()).isInstanceOf(Observable);
    }

    /**
     * Test if `PemService` as a `readCertificateInfo` function
     */
    @test('- `PemService` must have `readCertificateInfo` function')
    testPemServiceReadCertificateInfo() {
        unit.function(this._pemService.readCertificateInfo);
    }

    /**
     * Test if `PemService.readCertificateInfo()` function returns an Observable
     */
    @test('- `PemService.readCertificateInfo()` function must return an Observable')
    testPemServiceReadCertificateInfoObservable() {
        unit.object(this._pemService.readCertificateInfo(null)).isInstanceOf(Observable);
    }

    /**
     * Test if `PemService` as a `getPublicKey` function
     */
    @test('- `PemService` must have `getPublicKey` function')
    testPemServiceGetPublicKey() {
        unit.function(this._pemService.getPublicKey);
    }

    /**
     * Test if `PemService.getPublicKey()` function returns an Observable
     */
    @test('- `PemService.getPublicKey()` function must return an Observable')
    testPemServiceGetPublicKeyObservable() {
        unit.object(this._pemService.getPublicKey(null)).isInstanceOf(Observable);
    }

    /**
     * Test if `PemService` as a `createKeyPair` function
     */
    @test('- `PemService` must have `createKeyPair` function')
    testPemServiceCreateKeyPair() {
        unit.function(this._pemService.createKeyPair);
    }

    /**
     * Test if `PemService.createKeyPair()` function returns an Observable
     */
    @test('- `PemService.createKeyPair()` function must return an Observable')
    testPemServiceCreateKeyPairObservable() {
        unit.object(this._pemService.createKeyPair()).isInstanceOf(Observable);
    }

    /**
     * Test if `PemService` as a `getFingerprint` function
     */
    @test('- `PemService` must have `getFingerprint` function')
    testPemServiceGetFingerprint() {
        unit.function(this._pemService.getFingerprint);
    }

    /**
     * Test if `PemService.getFingerprint()` function returns an Observable
     */
    @test('- `PemService.getFingerprint()` function must return an Observable')
    testPemServiceGetFingerprintObservable() {
        unit.object(this._pemService.getFingerprint(null)).isInstanceOf(Observable);
    }

    /**
     * Test if `PemService` as a `getModulus` function
     */
    @test('- `PemService` must have `getModulus` function')
    testPemServiceGetModulus() {
        unit.function(this._pemService.getModulus);
    }

    /**
     * Test if `PemService.getModulus()` function returns an Observable
     */
    @test('- `PemService.getModulus()` function must return an Observable')
    testPemServiceGetModulusObservable() {
        unit.object(this._pemService.getModulus(null)).isInstanceOf(Observable);
    }

    /**
     * Test if `PemService` as a `getDhparamInfo` function
     */
    @test('- `PemService` must have `getDhparamInfo` function')
    testPemServiceGetDhparamInfo() {
        unit.function(this._pemService.getDhparamInfo);
    }

    /**
     * Test if `PemService.getDhparamInfo()` function returns an Observable
     */
    @test('- `PemService.getDhparamInfo()` function must return an Observable')
    testPemServiceGetDhparamInfoObservable() {
        unit.object(this._pemService.getDhparamInfo(null)).isInstanceOf(Observable);
    }

    /**
     * Test if `PemService` as a `createPkcs12` function
     */
    @test('- `PemService` must have `createPkcs12` function')
    testPemServiceCreatePkcs12() {
        unit.function(this._pemService.createPkcs12);
    }

    /**
     * Test if `PemService.createPkcs12()` function returns an Observable
     */
    @test('- `PemService.createPkcs12()` function must return an Observable')
    testPemServiceCreatePkcs12Observable() {
        unit.object(this._pemService.createPkcs12(null, null, null)).isInstanceOf(Observable);
    }

    /**
     * Test if `PemService` as a `readPkcs12` function
     */
    @test('- `PemService` must have `readPkcs12` function')
    testPemServiceReadPkcs12() {
        unit.function(this._pemService.readPkcs12);
    }

    /**
     * Test if `PemService.readPkcs12()` function returns an Observable
     */
    @test('- `PemService.readPkcs12()` function must return an Observable')
    testPemServiceReadPkcs12Observable() {
        unit.object(this._pemService.readPkcs12(null)).isInstanceOf(Observable);
    }

    /**
     * Test if `PemService` as a `verifySigningChain` function
     */
    @test('- `PemService` must have `verifySigningChain` function')
    testPemServiceVerifySigningChain() {
        unit.function(this._pemService.verifySigningChain);
    }

    /**
     * Test if `PemService.verifySigningChain()` function returns an Observable
     */
    @test('- `PemService.verifySigningChain()` function must return an Observable')
    testPemServiceVerifySigningChainObservable() {
        unit.object(this._pemService.verifySigningChain(null, null)).isInstanceOf(Observable);
    }
}

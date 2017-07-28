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
import { PEMService } from '../../src';

@suite('- Unit PEMServiceTest file')
class PEMServiceTest {
    // private property to store service instance
    private _pemService: PEMService;

    /**
     * Class constructor
     */
    constructor() {}

    /**
     * Function executed before each test
     */
    before() {
        this._pemService = new PEMService();
    }

    /**
     * Function executed after each test
     */
    after() {
        this._pemService = undefined;
    }

    /**
     * Test if `PEMService` as a `createPrivateKey` function
     */
    @test('- `PEMService` must have `createPrivateKey` function')
    testPemServiceCreatePrivateKey() {
        unit.function(this._pemService.createPrivateKey);
    }

    /**
     * Test if `PEMService.createPrivateKey()` function returns an Observable
     */
    @test('- `PEMService.createPrivateKey()` function must return an Observable')
    testPemServiceCreatePrivateKeyObservable() {
        unit.object(this._pemService.createPrivateKey()).isInstanceOf(Observable);
    }

    /**
     * Test if `PEMService` as a `createDhparam` function
     */
    @test('- `PEMService` must have `createDhparam` function')
    testPemServiceCreateDhparam() {
        unit.function(this._pemService.createDhparam);
    }

    /**
     * Test if `PEMService.generate()` function returns an Observable
     */
    @test('- `PEMService.createDhparam()` function must return an Observable')
    testPemServiceCreateDhparamObservable() {
        unit.object(this._pemService.createDhparam()).isInstanceOf(Observable);
    }

    /**
     * Test if `PEMService` as a `createCSR` function
     */
    @test('- `PEMService` must have `createCSR` function')
    testPemServiceCreateCSR() {
        unit.function(this._pemService.createCSR);
    }

    /**
     * Test if `PEMService.createCSR()` function returns an Observable
     */
    @test('- `PEMService.createCSR()` function must return an Observable')
    testPemServiceCreateCSRObservable() {
        unit.object(this._pemService.createCSR()).isInstanceOf(Observable);
    }

    /**
     * Test if `PEMService` as a `createCertificate` function
     */
    @test('- `PEMService` must have `createCertificate` function')
    testPemServiceCreateCertificate() {
        unit.function(this._pemService.createCertificate);
    }

    /**
     * Test if `PEMService.createCertificate()` function returns an Observable
     */
    @test('- `PEMService.createCertificate()` function must return an Observable')
    testPemServiceCreateCertificateObservable() {
        unit.object(this._pemService.createCertificate()).isInstanceOf(Observable);
    }

    /**
     * Test if `PEMService` as a `readCertificateInfo` function
     */
    @test('- `PEMService` must have `readCertificateInfo` function')
    testPemServiceReadCertificateInfo() {
        unit.function(this._pemService.readCertificateInfo);
    }

    /**
     * Test if `PEMService.readCertificateInfo()` function returns an Observable
     */
    @test('- `PEMService.readCertificateInfo()` function must return an Observable')
    testPemServiceReadCertificateInfoObservable() {
        unit.object(this._pemService.readCertificateInfo(null)).isInstanceOf(Observable);
    }

    /**
     * Test if `PEMService` as a `getPublicKey` function
     */
    @test('- `PEMService` must have `getPublicKey` function')
    testPemServiceGetPublicKey() {
        unit.function(this._pemService.getPublicKey);
    }

    /**
     * Test if `PEMService.getPublicKey()` function returns an Observable
     */
    @test('- `PEMService.getPublicKey()` function must return an Observable')
    testPemServiceGetPublicKeyObservable() {
        unit.object(this._pemService.getPublicKey(null)).isInstanceOf(Observable);
    }

    /**
     * Test if `PEMService` as a `createKeyPair` function
     */
    @test('- `PEMService` must have `createKeyPair` function')
    testPemServiceCreateKeyPair() {
        unit.function(this._pemService.createKeyPair);
    }

    /**
     * Test if `PEMService.createKeyPair()` function returns an Observable
     */
    @test('- `PEMService.createKeyPair()` function must return an Observable')
    testPemServiceCreateKeyPairObservable() {
        unit.object(this._pemService.createKeyPair()).isInstanceOf(Observable);
    }

    /**
     * Test if `PEMService` as a `getFingerprint` function
     */
    @test('- `PEMService` must have `getFingerprint` function')
    testPemServiceGetFingerprint() {
        unit.function(this._pemService.getFingerprint);
    }

    /**
     * Test if `PEMService.getFingerprint()` function returns an Observable
     */
    @test('- `PEMService.getFingerprint()` function must return an Observable')
    testPemServiceGetFingerprintObservable() {
        unit.object(this._pemService.getFingerprint(null)).isInstanceOf(Observable);
    }

    /**
     * Test if `PEMService` as a `getModulus` function
     */
    @test('- `PEMService` must have `getModulus` function')
    testPemServiceGetModulus() {
        unit.function(this._pemService.getModulus);
    }

    /**
     * Test if `PEMService.getModulus()` function returns an Observable
     */
    @test('- `PEMService.getModulus()` function must return an Observable')
    testPemServiceGetModulusObservable() {
        unit.object(this._pemService.getModulus(null)).isInstanceOf(Observable);
    }

    /**
     * Test if `PEMService` as a `getDhparamInfo` function
     */
    @test('- `PEMService` must have `getDhparamInfo` function')
    testPemServiceGetDhparamInfo() {
        unit.function(this._pemService.getDhparamInfo);
    }

    /**
     * Test if `PEMService.getDhparamInfo()` function returns an Observable
     */
    @test('- `PEMService.getDhparamInfo()` function must return an Observable')
    testPemServiceGetDhparamInfoObservable() {
        unit.object(this._pemService.getDhparamInfo(null)).isInstanceOf(Observable);
    }

    /**
     * Test if `PEMService` as a `createPkcs12` function
     */
    @test('- `PEMService` must have `createPkcs12` function')
    testPemServiceCreatePkcs12() {
        unit.function(this._pemService.createPkcs12);
    }

    /**
     * Test if `PEMService.createPkcs12()` function returns an Observable
     */
    @test('- `PEMService.createPkcs12()` function must return an Observable')
    testPemServiceCreatePkcs12Observable() {
        unit.object(this._pemService.createPkcs12(null, null, null)).isInstanceOf(Observable);
    }

    /**
     * Test if `PEMService` as a `readPkcs12` function
     */
    @test('- `PEMService` must have `readPkcs12` function')
    testPemServiceReadPkcs12() {
        unit.function(this._pemService.readPkcs12);
    }

    /**
     * Test if `PEMService.readPkcs12()` function returns an Observable
     */
    @test('- `PEMService.readPkcs12()` function must return an Observable')
    testPemServiceReadPkcs12Observable() {
        unit.object(this._pemService.readPkcs12(null)).isInstanceOf(Observable);
    }

    /**
     * Test if `PEMService` as a `verifySigningChain` function
     */
    @test('- `PEMService` must have `verifySigningChain` function')
    testPemServiceVerifySigningChain() {
        unit.function(this._pemService.verifySigningChain);
    }

    /**
     * Test if `PEMService.verifySigningChain()` function returns an Observable
     */
    @test('- `PEMService.verifySigningChain()` function must return an Observable')
    testPemServiceVerifySigningChainObservable() {
        unit.object(this._pemService.verifySigningChain(null, null)).isInstanceOf(Observable);
    }
}

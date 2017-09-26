/**
 * @see https://github.com/pana-cc/mocha-typescript
 */
import { suite, test } from 'mocha-typescript';

/**
 * @see http://unitjs.com/
 */
import * as unit from 'unit.js';

import 'rxjs/add/operator/mergeMap';

// element to test
import { PEMService, CertificateCreationResult, PrivateKeyCreationResult, DhParamKeyCreationResult, PKCS12CreationResult } from '../../src';

@suite('- Integration PEMServiceTest file')
export class PEMServiceTest {
    // private property to store service instance
    private _pemService: PEMService;

    /**
     * Class constructor
     */
    constructor() {
    }

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
     * Test if `PEMService.createPrivateKey()` Observable returns `PrivateKeyCreationResult` object `{key}`
     */
    @test('- `PEMService.createPrivateKey()` Observable must return a `PrivateKeyCreationResult` object `{key}`')
    testPemServiceCreatePrivateKeyObservable(done) {
        this._pemService.createPrivateKey()
            .subscribe(privateKeyCreationResult => unit.object(privateKeyCreationResult).hasOwnProperty('key').when(_ => done()));
    }

    /**
     * Test if `PEMService.generate()` Observable returns `DhParamKeyCreationResult` object `{dhparam}`
     */
    @test('- `PEMService.createDhparam()` Observable must return a `DhParamKeyCreationResult` object `{dhparam}`')
    testPemServiceCreateDhparamObservable(done) {
        this._pemService.createDhparam()
            .subscribe(dhParamKeyCreationResult => unit.object(dhParamKeyCreationResult).hasOwnProperty('dhparam').when(_ => done()));
    }

    /**
     * Test if `PEMService.createCSR()` Observable returns `CSRCreationResult` object `{csr, clientKey}`
     */
    @test('- `PEMService.createCSR()` Observable must return `CSRCreationResult` object `{csr, clientKey}`')
    testPemServiceCreateCSRObservable(done) {
        this._pemService.createCSR()
            .subscribe(csrCreationResult => unit.object(csrCreationResult)
                .hasOwnProperty('csr')
                .hasOwnProperty('clientKey')
                .when(_ => done()));
    }

    /**
     * Test if `PEMService.createCertificate()` Observable returns `CertificateCreationResult` object
     *  `{certificate, csr, clientKey, serviceKey}`
     */
    @test('- `PEMService.createCertificate()` Observable must return `CertificateCreationResult` object ' +
        '`{certificate, csr, clientKey, serviceKey}`')
    testPemServiceCreateCertificateObservable(done) {
        this._pemService.createCertificate().subscribe(csrCreationResult => unit.object(csrCreationResult)
            .hasOwnProperty('certificate')
            .hasOwnProperty('csr')
            .hasOwnProperty('clientKey')
            .hasOwnProperty('serviceKey')
            .when(_ => done()));
    }

    /**
     * Test if `PEMService.readCertificateInfo()` Observable returns `CertificateSubjectReadResult` object
     *  `{country, state, locality, organization, organizationUnit, commonName, emailAddress}`
     */
    @test('- `PEMService.readCertificateInfo()` Observable must return `CertificateSubjectReadResult` object ' +
        '`{country, state, locality, organization, organizationUnit, commonName, emailAddress}`')
    testPemServiceReadCertificateInfoObservable(done) {
        this._pemService.createCertificate()
            .flatMap((c: CertificateCreationResult) => this._pemService.readCertificateInfo(c.certificate))
            .subscribe(certificateSubjectReadResult => unit.object(certificateSubjectReadResult)
                .hasOwnProperty('country')
                .hasOwnProperty('state')
                .hasOwnProperty('locality')
                .hasOwnProperty('organization')
                .hasOwnProperty('organizationUnit')
                .hasOwnProperty('commonName')
                .hasOwnProperty('emailAddress')
                .when(_ => done()));
    }

    /**
     * Test if `PEMService.getPublicKey()` Observable returns `PublicKeyCreationResult` object `{publicKey}`
     */
    @test('- `PEMService.getPublicKey()` Observable must return `PublicKeyCreationResult` object `{publicKey}`')
    testPemServiceGetPublicKeyObservable(done) {
        this._pemService.createPrivateKey().flatMap((c: PrivateKeyCreationResult) => this._pemService.getPublicKey(c.key))
            .subscribe(publicKeyCreationResult => unit.object(publicKeyCreationResult)
                .hasOwnProperty('publicKey')
                .when(_ => done()));
    }

    /**
     * Test if `PEMService.createKeyPair()` Observable returns `KeyPairCreationResult` object `{key, publicKey}`
     */
    @test('- `PEMService.createKeyPair()` Observable must return `KeyPairCreationResult` object `{key, publicKey}`')
    testPemServiceCreateKeyPairObservable(done) {
        this._pemService.createKeyPair().subscribe(keyPairCreationResult => unit.object(keyPairCreationResult)
            .hasOwnProperty('key')
            .hasOwnProperty('publicKey')
            .when(_ => done()));
    }

    /**
     * Test if `PEMService.getFingerprint()` Observable returns `FingerprintResult` object `{fingerprint}`
     */
    @test('- `PEMService.getFingerprint()` Observable must return `FingerprintResult` object `{fingerprint}`')
    testPemServiceGetFingerprintObservable(done) {
        this._pemService.createCertificate()
            .flatMap((c: CertificateCreationResult) => this._pemService.getFingerprint(c.certificate))
            .subscribe(fingerprintResult => unit.object(fingerprintResult)
                .hasOwnProperty('fingerprint')
                .when(_ => done()));
    }

    /**
     * Test if `PEMService.getModulus()` Observable returns `ModulusResult` object `{modulus}`
     */
    @test('- `PEMService.getModulus()` Observable must return `ModulusResult` object `{modulus}`')
    testPemServiceGetModulusObservable(done) {
        this._pemService.createCertificate()
            .flatMap((c: CertificateCreationResult) => this._pemService.getModulus(c.certificate))
            .subscribe(modulusResult => unit.object(modulusResult)
                .hasOwnProperty('modulus')
                .when(_ => done()));
    }

    /**
     * Test if `PEMService.getDhparamInfo()` Observable returns `DhParamInfoResult` object `{size, prime}`
     */
    @test('- `PEMService.getDhparamInfo()` Observable must return `DhParamInfoResult` object `{size, prime}`')
    testPemServiceGetDhparamInfoObservable(done) {
        this._pemService.createDhparam()
            .flatMap((dh: DhParamKeyCreationResult) => this._pemService.getDhparamInfo(dh.dhparam))
            .subscribe(dhParamInfoResult => unit.object(dhParamInfoResult)
                .hasOwnProperty('size')
                .hasOwnProperty('prime')
                .when(_ => done()));
    }

    /**
     * Test if `PEMService.createPkcs12()` Observable returns `PKCS12CreationResult` object `{pkcs12}`
     */
    @test('- `PEMService.createPkcs12()` Observable must return `PKCS12CreationResult` object `{pkcs12}`')
    testPemServiceCreatePkcs12Observable(done) {
        this._pemService.createPrivateKey()
            .flatMap((pk: PrivateKeyCreationResult) => this._pemService.createCertificate({
                clientKey: pk.key,
                selfSigned: true
            }).flatMap((c: CertificateCreationResult) => this._pemService.createPkcs12(c.clientKey, c.certificate, 'password')))
            .subscribe(pkcs12Result => unit.object(pkcs12Result)
                .hasOwnProperty('pkcs12')
                .when(_ => done()));
    }

    /**
     * Test if `PEMService.readPkcs12()` Observable returns an error if no pkcs12 is provided
     */
    @test('- `PEMService.readPkcs12()` Observable must return an error if no pkcs12 is provided')
    testPemServiceReadPkcs12Observable(done) {
        this._pemService.readPkcs12('/i/do/not/exist.p12').subscribe(null, e => unit.error(e).when(_ => done()));
    }

    /**
     * Test if `PEMService.checkPkcs12()` Observable returns `true`
     */
    @test('- `PEMService.checkPkcs12()` Observable must return `true`')
    testPemServiceCheckPkcs12Observable(done) {
        this._pemService.createPrivateKey()
            .flatMap((pk: PrivateKeyCreationResult) => this._pemService.createCertificate({
                clientKey: pk.key,
                selfSigned: true
            }).flatMap((c: CertificateCreationResult) => this._pemService.createPkcs12(c.clientKey, c.certificate, 'password')))
            .flatMap((pkcs12Result: PKCS12CreationResult) => this._pemService.checkPkcs12(pkcs12Result.pkcs12, 'password'))
            .subscribe(isValid => unit.bool(isValid).isTrue().when(_ => done()));
    }

    /**
     * Test if `PEMService.verifySigningChain()` Observable returns true
     */
    @test('- `PEMService.verifySigningChain()` Observable must return true')
    testPemServiceVerifySigningChainObservable(done) {
        this._pemService.createCertificate({ commonName: 'CA Certificate' })
            .flatMap((ca: CertificateCreationResult) => this._pemService.createCertificate({
                serviceKey: ca.serviceKey, serviceCertificate: ca.certificate, serial: Date.now()
            }).flatMap((cert: CertificateCreationResult) => this._pemService.verifySigningChain(cert.certificate, ca.certificate)))
            .subscribe(v => unit.bool(v).isTrue().when(_ => done()));
    }

    /**
     * Test if `PEMService.checkCertificate()` Observable returns true
     */
    @test('- `PEMService.checkCertificate()` Observable must return true')
    testPemServiceCheckCertificateObservable(done) {
        this._pemService.createCertificate()
            .flatMap((ca: CertificateCreationResult) => this._pemService.checkCertificate(ca.certificate))
            .subscribe(v => unit.bool(v).isTrue().when(_ => done()));
    }
}

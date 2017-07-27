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
import { PemService, CertificateCreationResult, PrivateKeyCreationResult, DhParamKeyCreationResult } from '../../src';

@suite('- Integration PemServiceTest file')
class PemServiceTest {
    // private property to store service instance
    private _pemService: PemService;

    /**
     * Class constructor
     */
    constructor() {
    }

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
     * Test if `PemService.createPrivateKey()` Observable returns `PrivateKeyCreationResult` object `{key}`
     */
    @test('- `PemService.createPrivateKey()` Observable must return a `PrivateKeyCreationResult` object `{key}`')
    testPemServiceCreatePrivateKeyObservable(done) {
        this._pemService.createPrivateKey()
            .subscribe(privateKeyCreationResult => unit.object(privateKeyCreationResult).hasOwnProperty('key').when(_ => done()));
    }

    /**
     * Test if `PemService.generate()` Observable returns `DhParamKeyCreationResult` object `{dhparam}`
     */
    @test('- `PemService.createDhparam()` Observable must return a `DhParamKeyCreationResult` object `{dhparam}`')
    testPemServiceCreateDhparamObservable(done) {
        this._pemService.createDhparam()
            .subscribe(dhParamKeyCreationResult => unit.object(dhParamKeyCreationResult).hasOwnProperty('dhparam').when(_ => done()));
    }

    /**
     * Test if `PemService.createCSR()` Observable returns `CSRCreationResult` object `{csr, clientKey}`
     */
    @test('- `PemService.createCSR()` Observable must return `CSRCreationResult` object `{csr, clientKey}`')
    testPemServiceCreateCSRObservable(done) {
        this._pemService.createCSR()
            .subscribe(csrCreationResult => unit.object(csrCreationResult)
                .hasOwnProperty('csr')
                .hasOwnProperty('clientKey')
                .when(_ => done()));
    }

    /**
     * Test if `PemService.createCertificate()` Observable returns `CertificateCreationResult` object
     *  `{certificate, csr, clientKey, serviceKey}`
     */
    @test('- `PemService.createCertificate()` Observable must return `CertificateCreationResult` object ' +
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
     * Test if `PemService.readCertificateInfo()` Observable returns `CertificateSubjectReadResult` object
     *  `{country, state, locality, organization, organizationUnit, commonName, emailAddress}`
     */
    @test('- `PemService.readCertificateInfo()` Observable must return `CertificateSubjectReadResult` object ' +
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
     * Test if `PemService.getPublicKey()` Observable returns `PublicKeyCreationResult` object `{publicKey}`
     */
    @test('- `PemService.getPublicKey()` Observable must return `PublicKeyCreationResult` object `{publicKey}`')
    testPemServiceGetPublicKeyObservable(done) {
        this._pemService.createPrivateKey().flatMap((c: PrivateKeyCreationResult) => this._pemService.getPublicKey(c.key))
            .subscribe(publicKeyCreationResult => unit.object(publicKeyCreationResult)
                .hasOwnProperty('publicKey')
                .when(_ => done()));
    }

    /**
     * Test if `PemService.createKeyPair()` Observable returns `KeyPairCreationResult` object `{key, publicKey}`
     */
    @test('- `PemService.createKeyPair()` Observable must return `KeyPairCreationResult` object `{key, publicKey}`')
    testPemServiceCreateKeyPairObservable(done) {
        this._pemService.createKeyPair().subscribe(keyPairCreationResult => unit.object(keyPairCreationResult)
            .hasOwnProperty('key')
            .hasOwnProperty('publicKey')
            .when(_ => done()));
    }

    /**
     * Test if `PemService.getFingerprint()` Observable returns `FingerprintResult` object `{fingerprint}`
     */
    @test('- `PemService.getFingerprint()` Observable must return `FingerprintResult` object `{fingerprint}`')
    testPemServiceGetFingerprintObservable(done) {
        this._pemService.createCertificate()
            .flatMap((c: CertificateCreationResult) => this._pemService.getFingerprint(c.certificate))
            .subscribe(fingerprintResult => unit.object(fingerprintResult)
                .hasOwnProperty('fingerprint')
                .when(_ => done()));
    }

    /**
     * Test if `PemService.getModulus()` Observable returns `ModulusResult` object `{modulus}`
     */
    @test('- `PemService.getModulus()` Observable must return `ModulusResult` object `{modulus}`')
    testPemServiceGetModulusObservable(done) {
        this._pemService.createCertificate()
            .flatMap((c: CertificateCreationResult) => this._pemService.getModulus(c.certificate))
            .subscribe(modulusResult => unit.object(modulusResult)
                .hasOwnProperty('modulus')
                .when(_ => done()));
    }

    /**
     * Test if `PemService.getDhparamInfo()` Observable returns `DhParamInfoResult` object `{size, prime}`
     */
    @test('- `PemService.getDhparamInfo()` Observable must return `DhParamInfoResult` object `{size, prime}`')
    testPemServiceGetDhparamInfoObservable(done) {
        this._pemService.createDhparam()
            .flatMap((dh: DhParamKeyCreationResult) => this._pemService.getDhparamInfo(dh.dhparam))
            .subscribe(dhParamInfoResult => unit.object(dhParamInfoResult)
                .hasOwnProperty('size')
                .hasOwnProperty('prime')
                .when(_ => done()));
    }

    /**
     * Test if `PemService.createPkcs12()` Observable returns `Pkcs12Result` object `{pkcs12}`
     */
    @test('- `PemService.createPkcs12()` Observable must return `Pkcs12Result` object `{pkcs12}`')
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
     * Test if `PemService.readPkcs12()` Observable returns an error if no pkcs12 is provided
     */
    @test('- `PemService.readPkcs12()` Observable must return an error if no pkcs12 is provided')
    testPemServiceReadPkcs12Observable(done) {
        this._pemService.readPkcs12('/i/do/not/exist.p12').subscribe(null, e => unit.error(e).when(_ => done()));
    }

    /**
     * Test if `PemService.verifySigningChain()` Observable returns true
     */
    @test('- `PemService.verifySigningChain()` Observable must return true')
    testPemServiceVerifySigningChainObservable(done) {
        this._pemService.createCertificate({ commonName: 'CA Certificate' })
            .flatMap((ca: CertificateCreationResult) => this._pemService.createCertificate({
                serviceKey: ca.serviceKey, serviceCertificate: ca.certificate, serial: Date.now()
            }).flatMap((cert: CertificateCreationResult) => this._pemService.verifySigningChain(cert.certificate, ca.certificate)))
            .subscribe(v => unit.bool(v).isTrue().when(_ => done()));
    }
}

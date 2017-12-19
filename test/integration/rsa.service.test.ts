/**
 * @see https://github.com/pana-cc/mocha-typescript
 */
import { suite, test } from 'mocha-typescript';

/**
 * @see http://unitjs.com/
 */
import * as unit from 'unit.js';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { flatMap } from 'rxjs/operators';
import { Buffer } from 'buffer';

// element to test
import { RSAService, NodeRSA } from '../../src';
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

@suite('- Integration RSAServiceTest file')
export class RSAServiceTest {
    // private property to store service instance
    private _rsaService: RSAService;
    // private property to store test key
    private _testKey: string;

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
        this._testKey = '-----BEGIN RSA PRIVATE KEY-----\n' +
            'MIIBOQIBAAJAVY6quuzCwyOWzymJ7C4zXjeV/232wt2ZgJZ1kHzjI73wnhQ3WQcL\n' +
            'DFCSoi2lPUW8/zspk0qWvPdtp6Jg5Lu7hwIDAQABAkBEws9mQahZ6r1mq2zEm3D/\n' +
            'VM9BpV//xtd6p/G+eRCYBT2qshGx42ucdgZCYJptFoW+HEx/jtzWe74yK6jGIkWJ\n' +
            'AiEAoNAMsPqwWwTyjDZCo9iKvfIQvd3MWnmtFmjiHoPtjx0CIQCIMypAEEkZuQUi\n' +
            'pMoreJrOlLJWdc0bfhzNAJjxsTv/8wIgQG0ZqI3GubBxu9rBOAM5EoA4VNjXVigJ\n' +
            'QEEk1jTkp8ECIQCHhsoq90mWM/p9L5cQzLDWkTYoPI49Ji+Iemi2T5MRqwIgQl07\n' +
            'Es+KCn25OKXR/FJ5fu6A6A+MptABL3r8SEjlpLc=\n' +
            '-----END RSA PRIVATE KEY-----';
    }

    /**
     * Function executed after each test
     */
    after() {
        this._rsaService = undefined;
        this._testKey = undefined;
    }

    /**
     * Test if `RSAService.createKey()` Observable must return NodeRSA instance
     */
    @test('- `RSAService.createKey()` Observable must return NodeRSA instance')
    testRsaServiceCreateKeyObservable() {
        this._rsaService.createKey().subscribe(nodeRSA => unit.object(nodeRSA).isInstanceOf(NodeRSA));
    }

    /**
     * Test if `RsaService.createKey()` function returns an Observable with error if key size is wrong
     */
    @test('- `RSAService.createKey()` function must return an Observable with error if key size is wrong')
    testRsaServiceCreateKeyObservableError(done) {
        this._rsaService.createKey({ b: 7 })
            .subscribe(null, error => unit.object(error).hasProperty('message', 'Key size must be a multiple of 8.').when(_ => done()));
    }

    /**
     * Test if `RSAService.loadKey()` Observable returns NodeRSA instance
     */
    @test('- `RSAService.loadKey()` Observable must return NodeRSA instance')
    testRsaServiceLoadKeyObservable() {
        this._rsaService.loadKey(this._testKey).subscribe(nodeRSA => unit.object(nodeRSA).isInstanceOf(NodeRSA));
    }

    /**
     * Test if `RSAService.loadKey()` function returns an Observable with error if key is wrong
     */
    @test('- `RSAService.loadKey()` function must return an Observable with error if key is wrong')
    testRsaServiceLoadKeyObservableError(done) {
        this._rsaService.loadKey('')
            .subscribe(null, error => unit.error(error).when(_ => done()));
    }

    /**
     * Test if `RSAService.createKey().importKey()` Observable returns NodeRSA instance
     */
    @test('- `RSAService.createKey().importKey()` Observable must return NodeRSA instance')
    testRsaServiceImportKeyObservable(done) {
        this._rsaService.createKey().importKey(this._testKey)
            .subscribe(nodeRSA => unit.object(nodeRSA).isInstanceOf(NodeRSA).when(_ => done()));
    }

    /**
     * Test if `RSAService.createKey().importKey()` lettable operator returns NodeRSA instance
     */
    @test('- `RSAService.createKey().importKey()` lettable operator must return NodeRSA instance')
    testRsaServiceLettableImportKeyObservable(done) {
        this._rsaService.createKey()
            .pipe(
                importKey(this._testKey)
            )
            .subscribe(nodeRSA => unit.object(nodeRSA).isInstanceOf(NodeRSA).when(_ => done()));
    }

    /**
     * Test if `RSAService.createKey().importKey()` Observable returns an error if bad instance of NodeRSA
     */
    @test('- `RSAService.createKey().importKey()` Observable must return an error if bad instance of NodeRSA')
    testRsaServiceImportKeyObservableError(done) {
        of({}).importKey(this._testKey)
            .subscribe(null, error => unit.object(error).hasProperty('message', 'nodeRSA.importKey is not a function').when(_ => done()));
    }

    /**
     * Test if `RSAService.createKey().importKey()` lettable operator returns an error if bad instance of NodeRSA
     */
    @test('- `RSAService.createKey().importKey()` lettable operator must return an error if bad instance of NodeRSA')
    testRsaServiceLettableImportKeyObservableError(done) {
        of({})
            .pipe(
                importKey(this._testKey)
            )
            .subscribe(null, error => unit.object(error).hasProperty('message', 'nodeRSA.importKey is not a function').when(_ => done()));
    }

    /**
     * Test if `RSAService.createKey().generateKeyPair()` Observable returns NodeRSA instance
     */
    @test('- `RSAService.createKey().generateKeyPair()` Observable must return NodeRSA instance')
    testRsaServiceGenerateKeyPairObservable(done) {
        this._rsaService.createKey().generateKeyPair().subscribe(nodeRSA => unit.object(nodeRSA).isInstanceOf(NodeRSA).when(_ => done()));
    }

    /**
     * Test if `RSAService.createKey().generateKeyPair()` lettable operator returns NodeRSA instance
     */
    @test('- `RSAService.createKey().generateKeyPair()` lettable operator must return NodeRSA instance')
    testRsaServiceLettableGenerateKeyPairObservable(done) {
        this._rsaService.createKey()
            .pipe(
                generateKeyPair()
            )
            .subscribe(nodeRSA => unit.object(nodeRSA).isInstanceOf(NodeRSA).when(_ => done()));
    }

    /**
     * Test if `RSAService.createKey().generateKeyPair()` Observable returns an error if bad instance of NodeRSA
     */
    @test('- `RSAService.createKey().generateKeyPair()` Observable must return an error if bad instance of NodeRSA')
    testRsaServiceGenerateKeyPairObservableError(done) {
        of({}).generateKeyPair()
            .subscribe(null, error => unit.object(error).hasProperty('message', 'nodeRSA.generateKeyPair is not a function')
                .when(_ => done()));
    }

    /**
     * Test if `RSAService.createKey().generateKeyPair()` lettable operator returns an error if bad instance of NodeRSA
     */
    @test('- `RSAService.createKey().generateKeyPair()` lettable operator must return an error if bad instance of NodeRSA')
    testRsaServiceLettableGenerateKeyPairObservableError(done) {
        of({})
            .pipe(
                generateKeyPair()
            )
            .subscribe(null, error => unit.object(error).hasProperty('message', 'nodeRSA.generateKeyPair is not a function')
                .when(_ => done()));
    }

    /**
     * Test if `RSAService.loadKey().exportKey()` Observable returns same key
     */
    @test('- `RSAService.loadKey().exportKey()` Observable must return same key')
    testRsaServiceExportKeyObservable(done) {
        this._rsaService.loadKey(this._testKey).exportKey().subscribe(k => unit.string(k).is(this._testKey).when(_ => done()));
    }

    /**
     * Test if `RSAService.loadKey().exportKey()` lettable operator returns same key
     */
    @test('- `RSAService.loadKey().exportKey()` lettable operator must return same key')
    testRsaServiceLettableExportKeyObservable(done) {
        this._rsaService.loadKey(this._testKey)
            .pipe(
                exportKey()
            )
            .subscribe(k => unit.string(k).is(this._testKey).when(_ => done()));
    }

    /**
     * Test if `RSAService.loadKey().exportKey()` Observable returns an error if export format is wrong
     */
    @test('- `RSAService.loadKey().exportKey()` Observable must return an error if export format is wrong')
    testRsaServiceExportKeyObservableError(done) {
        this._rsaService.loadKey(this._testKey).exportKey(<any>'badFormat')
            .subscribe(null, error => unit.object(error).hasProperty('message', 'Unsupported key format')
                .when(_ => done())
            );
    }

    /**
     * Test if `RSAService.loadKey().exportKey()` lettable operator returns an error if export format is wrong
     */
    @test('- `RSAService.loadKey().exportKey()` lettable operator must return an error if export format is wrong')
    testRsaServiceLettableExportKeyObservableError(done) {
        this._rsaService.loadKey(this._testKey)
            .pipe(
                exportKey(<any>'badFormat')
            )
            .subscribe(null, error => unit.object(error).hasProperty('message', 'Unsupported key format')
                .when(_ => done())
            );
    }

    /**
     * Test if `RSAService.loadKey().isPrivate()` Observable returns true
     */
    @test('- `RSAService.loadKey().isPrivate()` Observable must return true')
    testRsaServiceIsPrivateKeyObservable(done) {
        this._rsaService.loadKey(this._testKey).isPrivate().subscribe(r => unit.bool(r).isTrue().when(_ => done()));
    }

    /**
     * Test if `RSAService.loadKey().isPrivate()` lettable operator returns true
     */
    @test('- `RSAService.loadKey().isPrivate()` lettable operator must return true')
    testRsaServiceLettableIsPrivateKeyObservable(done) {
        this._rsaService.loadKey(this._testKey)
            .pipe(
                isPrivate()
            )
            .subscribe(r => unit.bool(r).isTrue().when(_ => done()));
    }

    /**
     * Test if `RSAService.loadKey().isPrivate()` Observable returns an error if no key provided
     */
    @test('- `RSAService.loadKey().isPrivate()` Observable must return an error if no key provided')
    testRsaServiceIsPrivateKeyObservableError(done) {
        of({}).isPrivate().subscribe(null, e => unit.error(e).when(_ => done()));
    }

    /**
     * Test if `RSAService.loadKey().isPrivate()` lettable operator returns an error if no key provided
     */
    @test('- `RSAService.loadKey().isPrivate()` lettable operator must return an error if no key provided')
    testRsaServiceLettableIsPrivateKeyObservableError(done) {
        of({})
            .pipe(
                isPrivate()
            )
            .subscribe(null, e => unit.error(e).when(_ => done()));
    }

    /**
     * Test if `RSAService.loadKey().isPublic()` Observable returns false
     */
    @test('- `RSAService.loadKey().isPublic()` Observable must return false')
    testRsaServiceIsPublicKeyObservable(done) {
        this._rsaService.loadKey(this._testKey).isPublic(true).subscribe(r => unit.bool(r).isFalse().when(_ => done()));
    }

    /**
     * Test if `RSAService.loadKey().isPublic()` lettable operator returns false
     */
    @test('- `RSAService.loadKey().isPublic()` lettable operator must return false')
    testRsaServiceLettableIsPublicKeyObservable(done) {
        this._rsaService.loadKey(this._testKey)
            .pipe(
                isPublic(true)
            )
            .subscribe(r => unit.bool(r).isFalse().when(_ => done()));
    }

    /**
     * Test if `RSAService.loadKey().isPublic()` Observable returns an error if no key provided
     */
    @test('- `RSAService.loadKey().isPublic()` Observable must return an error if no key provided')
    testRsaServiceIsPublicKeyObservableError(done) {
        of({}).isPublic().subscribe(null, e => unit.error(e).when(_ => done()));
    }

    /**
     * Test if `RSAService.loadKey().isPublic()` lettable operator returns an error if no key provided
     */
    @test('- `RSAService.loadKey().isPublic()` lettable operator must return an error if no key provided')
    testRsaServiceLettableIsPublicKeyObservableError(done) {
        of({})
            .pipe(
                isPublic()
            )
            .subscribe(null, e => unit.error(e).when(_ => done()));
    }

    /**
     * Test if `RSAService.loadKey().isEmptyKey()` Observable returns false
     */
    @test('- `RSAService.loadKey().isEmptyKey()` function must return an Observable')
    testRsaServiceIsEmptyKeyObservable(done) {
        this._rsaService.loadKey(this._testKey).isEmptyKey().subscribe(r => unit.bool(r).isFalse().when(_ => done()));
    }

    /**
     * Test if `RSAService.loadKey().isEmptyKey()` lettable operator returns false
     */
    @test('- `RSAService.loadKey().isEmptyKey()` lettable operator must return an Observable')
    testRsaServiceLettableIsEmptyKeyObservable(done) {
        this._rsaService.loadKey(this._testKey)
            .pipe(
                isEmptyKey()
            )
            .subscribe(r => unit.bool(r).isFalse().when(_ => done()));
    }

    /**
     * Test if `RSAService.loadKey().isEmptyKey()` Observable returns an error if no key provided
     */
    @test('- `RSAService.loadKey().isEmptyKey()` Observable must return an error if no key provided')
    testRsaServiceIsEmptyKeyObservableError(done) {
        of({}).isEmptyKey().subscribe(null, e => unit.error(e).when(_ => done()));
    }

    /**
     * Test if `RSAService.loadKey().isEmptyKey()` lettable operator returns an error if no key provided
     */
    @test('- `RSAService.loadKey().isEmptyKey()` lettable operator must return an error if no key provided')
    testRsaServiceLettableIsEmptyKeyObservableError(done) {
        of({})
            .pipe(
                isEmptyKey()
            )
            .subscribe(null, e => unit.error(e).when(_ => done()));
    }

    /**
     * Test if `RSAService.loadKey().getKeySize()` Observable returns key size
     */
    @test('- `RSAService.loadKey().getKeySize()` function must return key size')
    testRsaServiceKeySizeObservable(done) {
        this._rsaService.loadKey(this._testKey).getKeySize().subscribe(r => unit.number(r).is(511).when(_ => done()));
    }

    /**
     * Test if `RSAService.loadKey().getKeySize()` lettable operator returns key size
     */
    @test('- `RSAService.loadKey().getKeySize()` lettable operator must return key size')
    testRsaServiceLettableKeySizeObservable(done) {
        this._rsaService.loadKey(this._testKey)
            .pipe(
                getKeySize()
            )
            .subscribe(r => unit.number(r).is(511).when(_ => done()));
    }

    /**
     * Test if `RSAService.loadKey().getKeySize()` Observable returns an error if no key provided
     */
    @test('- `RSAService.loadKey().getKeySize()` Observable must return an error if no key provided')
    testRsaServiceKeySizeObservableError(done) {
        of({}).getKeySize().subscribe(null, e => unit.error(e).when(_ => done()));
    }

    /**
     * Test if `RSAService.loadKey().getKeySize()` lettable operator returns an error if no key provided
     */
    @test('- `RSAService.loadKey().getKeySize()` lettable operator must return an error if no key provided')
    testRsaServiceLettableKeySizeObservableError(done) {
        of({})
            .pipe(
                getKeySize()
            )
            .subscribe(null, e => unit.error(e).when(_ => done()));
    }

    /**
     * Test if `RSAService.loadKey().getMaxMessageSize()` function returns max message size
     */
    @test('- `RSAService.loadKey().getMaxMessageSize()` function must return an Observable')
    testRsaServiceMaxMessageSizeObservable(done) {
        this._rsaService.loadKey(this._testKey).getMaxMessageSize().subscribe(r => unit.number(r).is(22).when(_ => done()));
    }

    /**
     * Test if `RSAService.loadKey().getMaxMessageSize()` lettable operator returns max message size
     */
    @test('- `RSAService.loadKey().getMaxMessageSize()` lettable operator must return an Observable')
    testRsaServiceLettableMaxMessageSizeObservable(done) {
        this._rsaService.loadKey(this._testKey)
            .pipe(
                getMaxMessageSize()
            )
            .subscribe(r => unit.number(r).is(22).when(_ => done()));
    }

    /**
     * Test if `RSAService.loadKey().getMaxMessageSize()` Observable returns an error if no key provided
     */
    @test('- `RSAService.loadKey().getMaxMessageSize()` Observable must return an error if no key provided')
    testRsaServiceMaxMessageSizeObservableError(done) {
        of({}).getMaxMessageSize().subscribe(null, e => unit.error(e).when(_ => done()));
    }

    /**
     * Test if `RSAService.loadKey().getMaxMessageSize()` lettable operator returns an error if no key provided
     */
    @test('- `RSAService.loadKey().getMaxMessageSize()` lettable operator must return an error if no key provided')
    testRsaServiceLettableMaxMessageSizeObservableError(done) {
        of({})
            .pipe(
                getMaxMessageSize()
            )
            .subscribe(null, e => unit.error(e).when(_ => done()));
    }

    /**
     * Test if `RSAService.loadKey().encryptPublic()` Observable returns a Buffer
     */
    @test('- `RSAService.loadKey().encryptPublic()` function must return a Buffer')
    testRsaServiceEncryptPublicObservable(done) {
        this._rsaService.loadKey(this._testKey).encryptPublic('data').subscribe(r => unit.object(r).isInstanceOf(Buffer).when(_ => done()));
    }

    /**
     * Test if `RSAService.loadKey().encryptPublic()` lettable operator returns a Buffer
     */
    @test('- `RSAService.loadKey().encryptPublic()` lettable operator must return a Buffer')
    testRsaServiceLettableEncryptPublicObservable(done) {
        this._rsaService.loadKey(this._testKey)
            .pipe(
                encryptPublic('data')
            )
            .subscribe(r => unit.object(r).isInstanceOf(Buffer).when(_ => done()));
    }

    /**
     * Test if `RSAService.loadKey().encryptPublic()` Observable returns an error if no key provided
     */
    @test('- `RSAService.loadKey().encryptPublic()` Observable must return an error if no key provided')
    testRsaServiceEncryptPublicObservableError(done) {
        of({}).encryptPublic('data').subscribe(null, e => unit.error(e).when(_ => done()));
    }

    /**
     * Test if `RSAService.loadKey().encryptPublic()` lettable operator returns an error if no key provided
     */
    @test('- `RSAService.loadKey().encryptPublic()` lettable operator must return an error if no key provided')
    testRsaServiceLettableEncryptPublicObservableError(done) {
        of({})
            .pipe(
                encryptPublic('data')
            )
            .subscribe(null, e => unit.error(e).when(_ => done()));
    }

    /**
     * Test if `RSAService.loadKey().encryptPrivate()` Observable returns a Buffer
     */
    @test('- `RSAService.loadKey().encryptPrivate()` function must return a Buffer')
    testRsaServiceEncryptPrivateObservable(done) {
        this._rsaService.loadKey(this._testKey).encryptPrivate('data')
            .subscribe(r => unit.object(r).isInstanceOf(Buffer).when(_ => done()));
    }

    /**
     * Test if `RSAService.loadKey().encryptPrivate()` lettable operator returns a Buffer
     */
    @test('- `RSAService.loadKey().encryptPrivate()` lettable operator must return a Buffer')
    testRsaServiceLettableEncryptPrivateObservable(done) {
        this._rsaService.loadKey(this._testKey)
            .pipe(
                encryptPrivate('data')
            )
            .subscribe(r => unit.object(r).isInstanceOf(Buffer).when(_ => done()));
    }

    /**
     * Test if `RSAService.loadKey().encryptPrivate()` Observable returns an error if no key provided
     */
    @test('- `RSAService.loadKey().encryptPrivate()` Observable must return an error if no key provided')
    testRsaServiceEncryptPrivateObservableError(done) {
        of({}).encryptPrivate('data').subscribe(null, e => unit.error(e).when(_ => done()));
    }

    /**
     * Test if `RSAService.loadKey().encryptPrivate()` lettable operator returns an error if no key provided
     */
    @test('- `RSAService.loadKey().encryptPrivate()` lettable operator must return an error if no key provided')
    testRsaServiceLettableEncryptPrivateObservableError(done) {
        of({})
            .pipe(
                encryptPrivate('data')
            )
            .subscribe(null, e => unit.error(e).when(_ => done()));
    }

    /**
     * Test if `RSAService.loadKey().decryptPublic()` Observable returns same value than before encryptPrivate()
     */
    @test('- `RSAService.loadKey().decryptPublic()` function must return same value than before encryptPrivate()')
    testRsaServiceDecryptPublicObservable(done) {
        of(this._rsaService.loadKey(this._testKey))
            .pipe(
                flatMap((key: Observable<NodeRSA>) =>
                    key.encryptPrivate('data')
                        .pipe(
                            flatMap((enc: Buffer) => key.decryptPublic(enc))
                        )
                )
            )
            .subscribe(r => unit.object(r).isInstanceOf(Buffer).when(_ => done()));
    }

    /**
     * Test if `RSAService.loadKey().decryptPublic()` lettable operator returns same value than before encryptPrivate()
     */
    @test('- `RSAService.loadKey().decryptPublic()` lettable operator must return same value than before encryptPrivate()')
    testRsaServiceLettableDecryptPublicObservable(done) {
        of(this._rsaService.loadKey(this._testKey))
            .pipe(
                flatMap((key: Observable<NodeRSA>) =>
                    key
                        .pipe(
                            encryptPrivate('data'),
                            flatMap((enc: Buffer) =>
                                key
                                    .pipe(
                                        decryptPublic(enc)
                                    )
                            )
                        )
                )
            )
            .subscribe(r => unit.object(r).isInstanceOf(Buffer).when(_ => done()));
    }

    /**
     * Test if `RSAService.loadKey().decryptPublic()` Observable returns an error if no key provided
     */
    @test('- `RSAService.loadKey().decryptPublic()` Observable must return an error if no key provided')
    testRsaServiceDecryptPublicObservableError(done) {
        of({}).decryptPublic('data').subscribe(null, e => unit.error(e).when(_ => done()));
    }

    /**
     * Test if `RSAService.loadKey().decryptPublic()` lettable operator returns an error if no key provided
     */
    @test('- `RSAService.loadKey().decryptPublic()` lettable operator must return an error if no key provided')
    testRsaServiceLettableDecryptPublicObservableError(done) {
        of({})
            .pipe(
                decryptPublic('data')
            )
            .subscribe(null, e => unit.error(e).when(_ => done()));
    }

    /**
     * Test if `RSAService.loadKey().decryptPrivate()` Observable returns same value than before encryptPublic()
     */
    @test('- `RSAService.loadKey().decryptPrivate()` function must return same value than before encryptPublic()')
    testRsaServiceDecryptPrivateObservable(done) {
        of(this._rsaService.loadKey(this._testKey))
            .pipe(
                flatMap((key: Observable<NodeRSA>) =>
                    key.encryptPublic('data')
                        .pipe(
                            flatMap((enc: Buffer) => key.decryptPrivate(enc, 'utf8'))
                        )
                )
            )
            .subscribe(r => unit.string(r).is('data').when(_ => done()));
    }

    /**
     * Test if `RSAService.loadKey().decryptPrivate()` lettable operator returns same value than before encryptPublic()
     */
    @test('- `RSAService.loadKey().decryptPrivate()` lettable operator must return same value than before encryptPublic()')
    testRsaServiceLettableDecryptPrivateObservable(done) {
        of(this._rsaService.loadKey(this._testKey))
            .pipe(
                flatMap((key: Observable<NodeRSA>) =>
                    key
                        .pipe(
                            encryptPublic('data'),
                            flatMap((enc: Buffer) =>
                                key
                                    .pipe(
                                        decryptPrivate(enc, 'utf8')
                                    )
                            )
                        )
                )
            )
            .subscribe(r => unit.string(r).is('data').when(_ => done()));
    }

    /**
     * Test if `RSAService.loadKey().decryptPrivate()` Observable returns an error if no key provided
     */
    @test('- `RSAService.loadKey().decryptPrivate()` Observable must return an error if no key provided')
    testRsaServiceDecryptPrivateObservableError(done) {
        of({}).decryptPrivate('data').subscribe(null, e => unit.error(e).when(_ => done()));
    }

    /**
     * Test if `RSAService.loadKey().decryptPrivate()` lettable operator returns an error if no key provided
     */
    @test('- `RSAService.loadKey().decryptPrivate()` lettable operator must return an error if no key provided')
    testRsaServiceLettableDecryptPrivateObservableError(done) {
        of({})
            .pipe(
                decryptPrivate('data')
            )
            .subscribe(null, e => unit.error(e).when(_ => done()));
    }

    /**
     * Test if `RSAService.loadKey().sign()` Observable returns a Buffer
     */
    @test('- `RSAService.loadKey().sign()` function must return a Buffer')
    testRsaServiceSignObservable(done) {
        this._rsaService.loadKey(this._testKey).sign('data')
            .subscribe(r => unit.object(r).isInstanceOf(Buffer).when(_ => done()));
    }

    /**
     * Test if `RSAService.loadKey().sign()` lettable operator returns a Buffer
     */
    @test('- `RSAService.loadKey().sign()` lettable operator must return a Buffer')
    testRsaServiceLettableSignObservable(done) {
        this._rsaService.loadKey(this._testKey)
            .pipe(
                sign('data')
            )
            .subscribe(r => unit.object(r).isInstanceOf(Buffer).when(_ => done()));
    }

    /**
     * Test if `RSAService.loadKey().sign()` Observable returns an error if no private key provided
     */
    @test('- `RSAService.loadKey().sign()` Observable must return an error if no private key provided')
    testRsaServiceSignObservableError(done) {
        this._rsaService.loadKey(this._testKey).exportKey('public')
            .pipe(
                flatMap((k: any) => this._rsaService.loadKey(k).sign('data'))
            )
            .subscribe(null, e => unit.object(e).hasProperty('message', 'This is not private key').when(_ => done()));
    }

    /**
     * Test if `RSAService.loadKey().sign()` lettable operator returns an error if no private key provided
     */
    @test('- `RSAService.loadKey().sign()` lettable operator must return an error if no private key provided')
    testRsaServiceLettableSignObservableError(done) {
        of(this._rsaService.loadKey(this._testKey))
            .pipe(
                flatMap((key: Observable<NodeRSA>) =>
                    key
                        .pipe(
                            exportKey('public'),
                            flatMap((k: any) =>
                                this._rsaService.loadKey(k)
                                    .pipe(
                                        sign('data')
                                    )
                            )
                        )
                )
            )
            .subscribe(null, e => unit.object(e).hasProperty('message', 'This is not private key').when(_ => done()));
    }

    /**
     * Test if `RSAService.loadKey().verify()` Observable returns true
     */
    @test('- `RSAService.loadKey().verify()` function must return a true')
    testRsaServiceVerifyObservable(done) {
        of(this._rsaService.loadKey(this._testKey))
            .pipe(
                flatMap((key: Observable<NodeRSA>) =>
                    key.sign('data')
                        .pipe(
                            flatMap((signature: Buffer) => key.verify('data', signature))
                        )
                )
            )
            .subscribe(r => unit.bool(r).isTrue().when(_ => done()));
    }

    /**
     * Test if `RSAService.loadKey().verify()` lettable operator returns true
     */
    @test('- `RSAService.loadKey().verify()` lettable operator must return a true')
    testRsaServiceLettableVerifyObservable(done) {
        of(this._rsaService.loadKey(this._testKey))
            .pipe(
                flatMap((key: Observable<NodeRSA>) =>
                    key
                        .pipe(
                            sign('data'),
                            flatMap((signature: Buffer) =>
                                key
                                    .pipe(
                                        verify('data', signature)
                                    )
                            )
                        )
                )
            )
            .subscribe(r => unit.bool(r).isTrue().when(_ => done()));
    }

    /**
     * Test if `RSAService.loadKey().verify()` Observable returns an error if no key provided
     */
    @test('- `RSAService.loadKey().verify()` Observable must return an error if no key provided')
    testRsaServiceVerifyObservableError(done) {
        of({}).verify('data', '').subscribe(null, e => unit.error(e).when(_ => done()));
    }

    /**
     * Test if `RSAService.loadKey().verify()` lettable operator returns an error if no key provided
     */
    @test('- `RSAService.loadKey().verify()` lettable operator must return an error if no key provided')
    testRsaServiceLettableVerifyObservableError(done) {
        of({})
            .pipe(
                verify('data', '')
            )
            .subscribe(null, e => unit.error(e).when(_ => done()));
    }
}

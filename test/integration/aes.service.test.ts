/**
 * @see https://github.com/pana-cc/mocha-typescript
 */
import { suite, test } from 'mocha-typescript';

/**
 * @see http://unitjs.com/
 */
import * as unit from 'unit.js';

import 'rxjs/add/observable/of';
import { Buffer } from 'buffer';

// element to test
import { AESService, HashService } from '../../src';
import '../../src/observable/add/aes/encryptWithAesKey';
import '../../src/observable/add/aes/decryptWithAesKey';
import { Observable } from 'rxjs/Observable';

@suite('- Integration AESServiceTest file')
class AESServiceTest {
    // private property to store service instance
    private _aesService: AESService;
    // private property to store password
    private _password: string;
    // private property to store salt
    private _salt: string;

    /**
     * Class constructor
     */
    constructor() {
    }

    /**
     * Function executed before each test
     */
    before() {
        this._aesService = new AESService(new HashService());
        this._password = 'P3HQdR35PUQLZ5ioOrsPlxx7QWra7WQl';
        this._salt = 'Kt9V3wgxrhpf8GN3';
    }

    /**
     * Function executed after each test
     */
    after() {
        this._aesService = undefined;
        this._password = undefined;
        this._salt = undefined;
    }

    /**
     * Test if `AESService.createKey()` function returns an Observable with error if AES key parameters are wrong
     */
    @test('- `AESService.createKey()` function must return an Observable with error if AES key parameters are wrong')
    testAesServiceCreateKeyObservableError(done) {
        this._aesService.createKey(null, null)
            .subscribe(null, error => unit.object(error).hasProperty('message', 'Pass phrase must be a buffer').when(_ => done()));
    }

    /**
     * Test if `AESService.createKey()` Observable returns AESKeyCreationResult object
     */
    @test('- `AESService.createKey()` Observable function must return an AESKeyCreationResult object `{key, iv}`')
    testAesServiceCreateKeyObservableReturnAesKeyCreationResult(done) {
        this._aesService.createKey(this._password, this._salt)
            .subscribe(aesKeyCreationResult => unit.object(aesKeyCreationResult)
                .hasOwnProperty('key')
                .hasOwnProperty('iv')
                .is({
                    key: '61cac683ff27580e4c68778df5208c745b0e4731727786586938c794a37f4419',
                    iv: '31cef43b785870e993cbc94aee0354cf'
                }).when(_ => done()));
    }

    /**
     * Test if `AESService.createKey().encryptWithAesKey()` Observable returns Buffer
     */
    @test('- `AESService.createKey().encryptWithAesKey()` Observable function must return a Buffer')
    testAesServiceEncryptWithAesKeyObservableReturnBuffer(done) {
        this._aesService.createKey(this._password, this._salt).encryptWithAesKey(new Buffer('data'))
            .subscribe(buffer => unit.object(buffer).isInstanceOf(Buffer).when(_ => done()));
    }

    /**
     * Test if `AESService.createKey().encryptWithAesKey()` Observable returns Buffer and
     *  his string representation is `a3d4bb8fcb8ec0e24a86cef07a28e3af`
     */
    @test('- `AESService.createKey().encryptWithAesKey()` Observable function must return a Buffer and his string representation is ' +
        '`a3d4bb8fcb8ec0e24a86cef07a28e3af`')
    testAesServiceEncryptWithAesKeyObservableReturnBufferWithStringRepresentationValue(done) {
        this._aesService.createKey(this._password, this._salt).encryptWithAesKey(new Buffer('data'))
            .subscribe((buffer: any) => unit.string(buffer.toString('hex')).is('a3d4bb8fcb8ec0e24a86cef07a28e3af').when(_ =>  done()));
    }

    /**
     * Test if `AESService.createKey().decryptWithAesKey()` Observable returns Buffer
     */
    @test('- `AESService.createKey().decryptWithAesKey()` Observable function must return a Buffer')
    testAesServiceDecryptWithAesKeyObservableReturnBuffer(done) {
        this._aesService.createKey(this._password, this._salt).decryptWithAesKey(new Buffer('a3d4bb8fcb8ec0e24a86cef07a28e3af', 'hex'))
            .subscribe(buffer => unit.object(buffer).isInstanceOf(Buffer).when(_ => done()));
    }

    /**
     * Test if `AESService.createKey().decryptWithAesKey()` Observable returns Buffer and
     *  his string representation is `data`
     */
    @test('- `AESService.createKey().decryptWithAesKey()` Observable function must return a Buffer and his string representation is ' +
        '`data`')
    testAesServiceDecryptWithAesKeyObservableReturnBufferWithStringRepresentationValue(done) {
        this._aesService.createKey(this._password, this._salt).decryptWithAesKey(new Buffer('a3d4bb8fcb8ec0e24a86cef07a28e3af', 'hex'))
            .subscribe((buffer: any) => unit.string(buffer.toString()).is('data').when(_ =>  done()));
    }

    /**
     * Test if `AESService.createKey().encryptWithAesKey()` function returns an Observable with error if AES key is wrong
     */
    @test('- `AESService.createKey().encryptWithAesKey()` function must return an Observable with error if AES key is wrong')
    testAesServiceEncryptWithAesKeyObservableError(done) {
        Observable.of({ key: null, iv: null }).encryptWithAesKey(new Buffer('data'))
            .subscribe(null, error => unit.error(error).when(_ => done()));
    }
    /**
     * Test if `AESService.createKey().decryptWithAesKey()` function returns an Observable with error if AES key is wrong
     */
    @test('- `AESService.createKey().decryptWithAesKey()` function must return an Observable with error if AES key is wrong')
    testAesServiceDecryptWithAesKeyObservableError(done) {
        Observable.of({ key: null, iv: null }).decryptWithAesKey(new Buffer('a3d4bb8fcb8ec0e24a86cef07a28e3af', 'hex'))
            .subscribe(null, error => unit.object(error)
                .hasProperty('message', 'First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
                .when(_ => done()));
    }
}

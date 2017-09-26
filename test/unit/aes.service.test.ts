/**
 * @see https://github.com/pana-cc/mocha-typescript
 */
import { suite, test } from 'mocha-typescript';

/**
 * @see http://unitjs.com/
 */
import * as unit from 'unit.js';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { Buffer } from 'buffer';

// element to test
import { AESService, HashService } from '../../src';
import '../../src/observable/add/aes/encryptWithAesKey';
import '../../src/observable/add/aes/decryptWithAesKey';

@suite('- Unit AESServiceTest file')
export class AESServiceTest {
    // private property to store service instance
    private _aesService: AESService;
    // private property to store mock service instance
    private _hashServiceMock: any;
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
        this._hashServiceMock = unit.mock(this._aesService['_hashService']);
        this._password = 'P3HQdR35PUQLZ5ioOrsPlxx7QWra7WQl';
        this._salt = 'Kt9V3wgxrhpf8GN3';
    }

    /**
     * Function executed after each test
     */
    after() {
        this._aesService = undefined;
        this._hashServiceMock = undefined;
        this._password = undefined;
        this._salt = undefined;
    }

    /**
     * Test if `AESService` as a `generate` function
     */
    @test('- `AESService` must have `createKey` function')
    testAesServiceCreateKey() {
        unit.function(this._aesService.createKey);
    }

    /**
     * Test if `AESService.createKey()` function returns an Observable
     */
    @test('- `AESService.createKey()` function must return an Observable')
    testAesServiceCreateKeyObservable() {
        unit.object(this._aesService.createKey(null, null)).isInstanceOf(Observable);
    }

    /**
     * Test if `AESService.createKey()` function returns an Observable with error if AES key parameters are wrong
     */
    @test('- `AESService.createKey()` function must return an Observable with error if AES key parameters are wrong')
    testAesServiceCreateKeyObservableError(done) {
        this._hashServiceMock.expects('generate').returns(Observable.throw(new Error('Wrong AES key')));

        this._aesService.createKey(null, null)
            .subscribe(null, error => {
                unit.object(error).hasProperty('message', 'Wrong AES key').when(_ => {
                    this._hashServiceMock.verify();
                    this._hashServiceMock.restore();
                    done();
                });
            });
    }

    /**
     * Test if `AESService.createKey().encryptWithAesKey()` function returns an Observable
     */
    @test('- `AESService.createKey().encryptWithAesKey()` function must return an Observable')
    testAesServiceEncryptWithAesKeyObservable(done) {
        this._hashServiceMock.expects('generate')
            .returns(Observable.of(
                Buffer.from('61cac683ff27580e4c68778df5208c745b0e4731727786586938c794a37f441931cef43b785870e993cbc94aee0354cf', 'hex')));

        unit.object(this._aesService.createKey(this._password, this._salt).encryptWithAesKey(null))
            .isInstanceOf(Observable).when(_ => {
            this._hashServiceMock.verify();
            this._hashServiceMock.restore();
            done();
        });
    }

    /**
     * Test if `AESService.createKey().decryptWithAesKey()` function returns an Observable
     */
    @test('- `AESService.createKey().decryptWithAesKey()` function must return an Observable')
    testAesServiceDecryptWithAesKeyObservable(done) {
        this._hashServiceMock.expects('generate')
            .returns(Observable.of(
                Buffer.from('61cac683ff27580e4c68778df5208c745b0e4731727786586938c794a37f441931cef43b785870e993cbc94aee0354cf', 'hex')));

        unit.object(this._aesService.createKey(this._password, this._salt).decryptWithAesKey(null))
            .isInstanceOf(Observable).when(_ => {
            this._hashServiceMock.verify();
            this._hashServiceMock.restore();
            done();
        });
    }
}

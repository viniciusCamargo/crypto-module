/**
 * @see https://github.com/pana-cc/mocha-typescript
 */
import { test, suite } from 'mocha-typescript';
declare const Buffer;

const data: any = {
    aesKey: {},
    encrypt_me: `Space... The final frontier...These are the voyages of the Starship Enterprise.
                          Its continuing mission: To explore strange new worlds... To seek out new life;
                          new civilisations... To boldly go where no one has gone before!`,
};

/**
 * @see http://unitjs.com/
 */
import * as unit from 'unit.js';

import { Observable } from 'rxjs/Observable';

// element to test
import { AesService } from '../../src';

@suite('- Unit AesServiceTest file')
class AesServiceTest {
    private _aesService: AesService;
    private _aesKey: any;

    static before() {}

    static after() {}

    before() {
        this._aesService = new AesService();
    }

    after() {
        this._aesService = undefined;
    }

    @test('- `AesService` must have `generateKey` function')
    testAesServiceGenerate() {
        unit.function(this._aesService.generateKey);
    }

    @test('- `AesService.generateKey()` test function')
    testAesServicegenerateKey(done) {
        const fn = this._aesService.generateKey({ password: 'hello', salt: 'world' });
        unit.object(fn).isInstanceOf(Observable);
        fn.subscribe(m => {
            unit.object(m).hasProperties(['key', 'iv']);
            unit.string(m.key).is('c1555303da309f6b7d1e8fe45636bfdd');
            unit.string(m.iv).is('dc4bf56405e7e94e');
            data.aesKey = m;
            done();
        });
    }

    @test('- Generate key without salt or password should throw')
    generateKeyError() {
        unit.exception(_ => {
            unit.when('No arguments', this._aesService.generateKey(<any>undefined));
        }).isInstanceOf(Error).hasProperty('message', 'Missing aes password');
        unit.exception(_ => {
            unit.when('No arguments', this._aesService.generateKey(<any>{ password: null }));
        }).isInstanceOf(Error).hasProperty('message', 'Missing aes password');
        unit.exception(_ => {
            unit.when('No arguments', this._aesService.generateKey(<any>{ password: '' }));
        }).isInstanceOf(Error).hasProperty('message', 'Missing aes password');
        unit.exception(_ => {
            unit.when('No arguments', this._aesService.generateKey(<any>{ password: 'xaxaxa' }));
        }).isInstanceOf(Error).hasProperty('message', 'Missing aes salt');
    }

    @test('- `AesService.encrypt()` test encrypt function with aesKey already generated')
    testAesServiceEncryptWithAesKey(done) {
        const fn = this._aesService.encrypt({ aesKey: data.aesKey, input: data.encrypt_me });
        unit.object(fn).isInstanceOf(Observable);
        fn.subscribe(encrypted => {
            unit.object(encrypted).isInstanceOf(Buffer);
            done();
        });
    }

    @test('- `AesService.encrypt()` test encrypt function without aesKey')
    testAesServiceEncryptWithoutAesKey(done) {
        const fn = this._aesService.encrypt({ password: 'hello', salt: 'world', input: data.encrypt_me });
        unit.object(fn).isInstanceOf(Observable);
        fn.subscribe(encrypted => {
            unit.object(encrypted).isInstanceOf(Buffer);
            data.encrypted = encrypted;
            done();
        });
    }

    @test('- `AesService.decrypt()` test decrypt function with aesKey')
    testAesServiceDeEncryptWithAesKey(done) {
        const fn = this._aesService.decrypt({ aesKey: data.aesKey, input: data.encrypted });
        unit.object(fn).isInstanceOf(Observable);
        fn.subscribe(decrypted => {
            unit.object(decrypted).isInstanceOf(Buffer);
            unit.string(decrypted.toString('utf8')).is(data.encrypt_me);
            done();
        });
    }

    @test('- `AesService.decrypt()` test decrypt function with aesKey')
    testAesServiceDeEncryptWithoutAesKey(done) {
        const fn = this._aesService.decrypt({ password: 'hello', salt: 'world', input: data.encrypted });
        unit.object(fn).isInstanceOf(Observable);
        fn.subscribe(decrypted => {
            unit.object(decrypted).isInstanceOf(Buffer);
            unit.string(decrypted.toString('utf8')).is(data.encrypt_me);
            done();
        });
    }
    /**
     * Test if `AesService.generate()` Observable returns 'Hello World'
     */
    // @test('- `AesService.generate()` Observable function must return a string with `Hello World` value')
    // testAesServiceSayHelloObservableReturnString(done) {
    //     this._helloWorldService.generate().subscribe(m => unit.string(m).is('Hello World').when(_ => done()));
    // }
}

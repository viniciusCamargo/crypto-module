/**
 * @see https://github.com/pana-cc/mocha-typescript
 */
import { test, suite } from 'mocha-typescript';
declare const Buffer;

const data: any = {};

/**
 * @see http://unitjs.com/
 */
import * as unit from 'unit.js';

import { Observable } from 'rxjs/Observable';

// element to test
import { PemService } from '../../src';

@suite('- Unit PemServiceTest file')
class PemServiceTest {
    private _pemService: PemService;

    before() {
        this._pemService = new PemService();
    }

    after() {
        this._pemService = undefined;
    }

    @test('- Assert `PemService` functions')
    testPemServiceMethods() {
        unit.function(this._pemService.generatePair);
        unit.function(this._pemService.generatePrivateKey);
        unit.function(this._pemService.getPublicKey);
    }

    @test('- `PemService.generatePair()` test function')
    testPemServicegeneratePair(done) {
        const fn = this._pemService.generatePair();
        unit.object(fn).isInstanceOf(Observable);
        fn.subscribe(res => {
            unit.object(res).hasProperties(['privateKey', 'publicKey']);
            unit.string(res.privateKey.replace(/\n/g, '')).match(/-----BEGIN RSA PRIVATE KEY-----.+-----END RSA PRIVATE KEY-----$/g);
            unit.string(res.publicKey.replace(/\n/g, '')).match(/-----BEGIN PUBLIC KEY-----.+-----END PUBLIC KEY-----$/g);
            data.pair = res;
            done();
        });
    }

    @test('- `PemService.getPublicKey()` test function')
    testPemServicegetPublicKey(done) {
        unit.string(data.pair.privateKey);
        unit.function(this._pemService.getPublicKey);
        const obs = this._pemService.getPublicKey(data.pair.privateKey);
        unit.object(obs).isInstanceOf(Observable);
        obs.subscribe(publicKey => {
            unit.string(publicKey).is(data.pair.publicKey);
            done();
        });
    }

    @test('- Generate private key')
    generatePrivateKey(done) {
        unit.function(this._pemService.generatePrivateKey);
        const obs = this._pemService.generatePrivateKey();
        obs.subscribe(res => {
            unit.string(res.replace(/\n/g, '')).match(/-----BEGIN RSA PRIVATE KEY-----.+-----END RSA PRIVATE KEY-----$/g);
            done();
        });
    }

}

/**
 * @see https://github.com/pana-cc/mocha-typescript
 */
import { test, suite } from 'mocha-typescript';

/**
 * @see http://unitjs.com/
 */
import * as unit from 'unit.js';

import { Observable } from 'rxjs/Observable';

// element to test
import { RSAService } from '../../src';

const PRIVATE_KEY = `-----BEGIN RSA PRIVATE KEY-----\nMIIEpAIBAAKCAQEArdTkl6G3QKs6ReJW0hcKQP6qBPcbZxtkNQ/hE+7GTZkG3XPo\n83cwbWW8wSVUjpMhBHA
rSGjq7aZQGHqppe1xKQobCifvSoGmq3LAVhP8xizE1dk5\n4N3wM14wv90I97qY4JmS1dzrjzzf/6AhMZfa0IFoLDjSy/Jobjg03JHomM9LTLe1\nHADxfi5E343/aYOCjqu9UisQx
OHoVKo7OdXwUC0SdTRe+WHIGPeWQhAiRvGTswFZ\n2uTaz22HNHNhtyol8NSIVv9W1KykDZ9aHgqCItbolaYmAevkolZrSovFx6aGVnT/\nqciHdna0iVLcepqpiy2
sK9bRSRvya9Sts/srkQIDAQABAoIBAQCD22lKW7DVrQyW\n1gllc3SjuIjfG1H99Bke5tykcgqZ8enzMWkSxOZHFVUIbXimbZQt+afbVTpe6jj3\nWJQ2+NVNfAzmt0QcEByN
EI40vRSQfoUQcaYlnDQHwvrXjqKuxywPsm5fKyTDkjmX\nfa+wHrAsWPzcDn5XlZkBgkEWztbQka1Ob+PW+sTNorBCxDSpYzaJozgJUolGcU3j\nxO/4/47gbRWEVp3wdsW
Gag0wHAIIrsan6HZnyagxDjIYJZZnkP6ItizZKhbKoVZb\neAyF084c2l8u/3urZVXkizDjHa2UUlSBuZ01KJsRWFsM9DNgf5sC1v2ikcGEregP\navBhHeABAoGBANVqlQ
XTrWp1LCtlfjSkYSAzMxwjNvhCsWDVMnwZt8azbJh66/9E\nc+tYW+FEzZs+ponTMi0AevsWALq56QCUNL1rOWcfWyAe/ZHxZ5QBSl6vgw+Hbypb\nRpMeyKmalHU7sCmcK3yh
0c8RM2FHxRHyBf4SVPIpWdhju+MX0mjFMW6xAoGBANCE\nTW+OXmzfcVfSSIYQu2Qvq2BGN3sryRoNQRmF4KfXRde8Qm4Bx2+C+rB813xhHD3p\nyJeiodHoxNzCmKQ
jVR6QYBtJ0J/nPlmQEqe4OjobCgrwOuINeBO/3GpbmfU+Q8SG\nJBw1f36A2Pjsm+EAx3KwiPdYLoL0yTZQiGihQ4LhAoGAA45XFVXFmfSB2+dBBxeG\n
FsdDnsBndhOGaRqkULUM/t6WfKPvsr0tQUqjnUlMM74DgGBogZ90bSKcuH/Ihh3y\nEwXqWvGGzy41A22GUE0FNDawdF3JWGdU8badmVXeC2YHNWpIvzbjDBQ5S
vGrMvVZ\nbDZZ+/78ZEKlKs+GzgAbJsECgYEAgO/epkXF09LTVnfcirIb/haQBWdF9W8c2nQp\ntiuXwJGYSY/LEBUfiq/Wbn20DeBKw2oltMZHA/LIkK3wD0cd4llqZFVfo
REv99fk\nATwlHTsNGbh04MVtY+D23fmomQKYixRbjeny3Xm1MS+2MAr4Sc4p07D+idHt/h0M\nTI6znWECgYAi3fXdnV84kiEkt3x7Wg+DW7XpZba44cZV1xDtm+Ci2G90
fk7IYQel\nDK62KwTxOY0nT1keuguKdWROX3mePGkkRw+q7dc9z0JSJssDqPD1JxYL9u+WOx1L\nPT8ZD7aRJasyU7bH29aN1jWUCFnn41ezhn
SBjGHGCEVDOfIy8SVd4g==\n-----END RSA PRIVATE KEY-----`.replace(/\n/g, '');
const PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArdTkl6G3QKs6ReJW0hcK\nQP6qBPcbZxtkNQ/hE+7GTZk
G3XPo83cwbWW8wSVUjpMhBHArSGjq7aZQGHqppe1x\nKQobCifvSoGmq3LAVhP8xizE1dk54N3wM14wv90I97qY4JmS1dzrjzzf/6AhMZfa\n0IFoLDjSy/Jobjg03JHomM9LTL
e1HADxfi5E343/aYOCjqu9UisQxOHoVKo7OdXw\nUC0SdTRe+WHIGPeWQhAiRvGTswFZ2uTaz22HNHNhtyol8NSIVv9W1KykDZ9aHgqC\nItbolaYmAevkolZrSovFx6aGVnT/qci
Hdna0iVLcepqpiy2sK9bRSRvya9Sts/sr\nkQIDAQAB\n-----END PUBLIC KEY-----`.replace(/\n/g, '');
const ENCRYPT_STRING = 'lQCkts0Hq93vTILoAqnbLvPnJE6Hv2odjknvpnthNa4epZce.1499702258308';
let ENCRYPTED_STRING;

@suite('- Unit RSAService file')
class RsaServiceTests {
    private _rsa: RSAService;

    constructor() {}

    before() {
        this._rsa = new RSAService();
    }

    after() {
        this._rsa = undefined;
    }

    /*@test('- Test encrypt method with a public key')
    encrypt() {
        unit.function(this._rsa.encrypt);
        const encrypted = this._rsa.encrypt({ key: PUBLIC_KEY, input: ENCRYPT_STRING });
        unit.object(encrypted).isInstanceOf(Buffer);
        ENCRYPTED_STRING = encrypted.toString('hex');
    }

    @test('- Test encrypt with invalid arguments')
    encryptInvalidArguments() {
        unit.exception(_ => {
            unit.when('No key provided', this._rsa.encrypt({ key: null, input: null }));
        }).isInstanceOf(Error).hasProperty('message', 'Invalid key');
    }

    @test('- Test decrypt method with a private key 1')
    decrypt() {
        unit.function(this._rsa.decrypt);
        const decrypted = this._rsa.decrypt({ key: PRIVATE_KEY, input: ENCRYPTED_STRING, source_encoding: 'hex' });
        unit.object(decrypted).isInstanceOf(Buffer);
        unit.string(decrypted.toString('utf8')).isEqualTo(ENCRYPT_STRING);
    }

    @test('- Test decrypt method with a private key, Buffer input')
    decryptBuffer() {
        const decrypted = this._rsa.decrypt({ key: PRIVATE_KEY, input: Buffer.from(ENCRYPTED_STRING, 'hex') });
        unit.object(decrypted).isInstanceOf(Buffer);
        unit.string(decrypted.toString('utf8')).isEqualTo(ENCRYPT_STRING);
    }

    @test('- Test decrypt method with invalid arguments')
    decryptInvalidArguments() {
        unit.exception(_ => {
            unit.when('Invalid input', this._rsa.decrypt({ key: PRIVATE_KEY, input: null }));
        }).isInstanceOf(Error).hasProperty('message', 'Invalid input');
        unit.exception(_ => {
            unit.when('Invalid input', this._rsa.decrypt({ key: PRIVATE_KEY, input: <any>0 }));
        }).isInstanceOf(Error).hasProperty('message', 'Invalid input');
        unit.exception(_ => {
            unit.when('Invalid key', this._rsa.decrypt({ key: null, input: null }));
        }).isInstanceOf(Error).hasProperty('message', 'Invalid key');
        unit.exception(_ => {
            unit.when('Invalid key', this._rsa.decrypt(<any>'xaxa'));
        }).isInstanceOf(Error).hasProperty('message', 'Invalid key');
        unit.exception(_ => {
            unit.when('Invalid key', this._rsa.decrypt(<any>undefined));
        }).isInstanceOf(Error).hasProperty('message', 'Invalid key');
        unit.exception(_ => {
            unit.when('Invalid source encoding',
            this._rsa.decrypt({ key: PRIVATE_KEY, input: ENCRYPT_STRING, source_encoding: <any>98765 }));
        }).isInstanceOf(Error).hasProperty('message', 'Invalid source encoding');
        const err = unit.exception(_ => {
            unit.when('Non allowed source encoding',
            this._rsa.decrypt({ key: PRIVATE_KEY, input: ENCRYPT_STRING, source_encoding: 'xaxaxa' }));
        }).isInstanceOf(Error)
        .hasProperty('message', 'Source encoding must be one of the following: "utf8,base64,hex,binary", Provided: "xaxaxa"');
    }*/
}

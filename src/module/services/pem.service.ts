import { Observable } from 'rxjs/Observable';
import { Inject, Injectable, Optional } from '@hapiness/core';
import { CRYPTO_CONFIG, CryptoConfig } from '../config';
import * as pem from 'pem';
import {
    CertificateCreationOptions, CertificateCreationResult, CertificateSubjectReadResult, CSRCreationOptions,
    HashFunction, Pkcs12CreationOptions, Pkcs12ReadOptions,
    PrivateKeyCreationOptions
} from 'pem';
import 'rxjs/add/observable/bindNodeCallback';

/**
 * Private key definition
 */
export interface PrivateKeyCreationResult {
    key: string;
}

/**
 * Public key definition
 */
export interface PublicKeyCreationResult {
    publicKey: string;
}

/**
 * Key Pair definition
 */
export interface KeyPairCreationResult {
    key: string;
    publicKey: string;
}

/**
 * DhParam key definition
 */
export interface DhParamKeyCreationResult {
    dhparam: any;
}

/**
 * CSR definition
 */
export interface CSRCreationResult {
    csr: string;
    clientKey: string;
}

/**
 * Fingerprint definition
 */
export interface FingerprintResult {
    fingerprint: string;
}

/**
 * Modulus definition
 */
export interface ModulusResult {
    modulus: any;
}

/**
 * DhParam info definition
 */
export interface DhParamInfoResult {
    size: any;
    prime: any;
}

/**
 * Pkcs12 definition
 */
export interface PKCS12CreationResult {
    pkcs12: any;
}

/**
 * Pkcs12 read definition
 */
export interface PKCS12ReadResult {
    key: string;
    cert: string;
    ca: string[];
}

@Injectable()
export class PEMService {
    /**
     * Class constructor
     *
     * @param _config object to override path to OpenSSL binaries
     */
    constructor(@Optional() @Inject(CRYPTO_CONFIG) private _config?: CryptoConfig) {
        if (this._config && this._config.pem) {
            pem.config(this._config.pem);
        }
    }

    /**
     * Creates a private key
     *
     * @param {Number} [keyBitsize=2048] Size of the key, defaults to 2048bit
     * @param {Object} [options] object of cipher and password {cipher:'aes128',password:'xxx'}, defaults empty object
     *
     * @return {Observable<PrivateKeyCreationResult>} { key }
     */
    createPrivateKey(keyBitsize?: number, options?: PrivateKeyCreationOptions): Observable<PrivateKeyCreationResult> {
        return (<(keyBitsize?: number, options?: PrivateKeyCreationOptions) =>
            Observable<PrivateKeyCreationResult>> Observable.bindNodeCallback(pem.createPrivateKey))(keyBitsize, options);
    }

    /**
     * Creates a dhparam key
     *
     * @param {Number} [keyBitsize=512] Size of the key, defaults to 512bit
     *
     * @return {Observable<DhParamKeyCreationResult>} { dhparam }
     */
    createDhparam(keyBitsize?: number): Observable<DhParamKeyCreationResult> {
        return (<(keyBitsize?: number) => Observable<DhParamKeyCreationResult>> Observable.bindNodeCallback(pem.createDhparam))(keyBitsize);
    }

    /**
     * Creates a Certificate Signing Request
     *
     * If options.clientKey is undefined, a new key is created automatically. The used key is included
     * in the callback return as clientKey
     *
     * @param {CSRCreationOptions} [options] Optional options object
     *
     * @return {Observable<CSRCreationResult>} {csr, clientKey}
     */
    createCSR(options?: CSRCreationOptions): Observable<CSRCreationResult> {
        return (<(options?: CSRCreationOptions) => Observable<CSRCreationResult>> Observable.bindNodeCallback(pem.createCSR))(options);
    }

    /**
     * Creates a certificate based on a CSR. If CSR is not defined, a new one
     * will be generated automatically. For CSR generation all the options values
     * can be used as with createCSR.
     *
     * @param {CertificateCreationOptions} [options] Optional options object
     *
     * @return {Observable<CertificateCreationResult>} {certificate, csr, clientKey, serviceKey}
     */
    createCertificate(options?: CertificateCreationOptions): Observable<CertificateCreationResult> {
        return (<(options?: CertificateCreationOptions) =>
            Observable<CertificateCreationResult>> Observable.bindNodeCallback(pem.createCertificate))(options);
    }

    /**
     * Reads subject data from a certificate or a CSR
     *
     * @param {String} certificate PEM encoded CSR or certificate
     *
     * @return {Observable<CertificateSubjectReadResult>}
     *  {country, state, locality, organization, organizationUnit, commonName, emailAddress}
     */
    readCertificateInfo(certificate: string): Observable<CertificateSubjectReadResult> {
        return (<(certificate: string) => Observable<CertificateSubjectReadResult>> Observable.bindNodeCallback(pem.readCertificateInfo))
        (certificate);
    }

    /**
     * Exports a public key from a private key, CSR or certificate
     *
     * @param {String} certificate PEM encoded private key, CSR or certificate
     *
     * @return {Observable<PublicKeyCreationResult>} {publicKey}
     */
    getPublicKey(certificate: string): Observable<PublicKeyCreationResult> {
        return (<(certificate: string) => Observable<PublicKeyCreationResult>> Observable.bindNodeCallback(pem.getPublicKey))(certificate);
    }

    /**
     * Creates a private key and related public key
     *
     * @param {Number} [keyBitsize=2048] Size of the key, defaults to 2048bit
     * @param {Object} [options] object of cipher and password {cipher:'aes128',password:'xxx'}, defaults empty object
     *
     * @return {Observable<KeyPairCreationResult>} {key, publicKey}
     */
    createKeyPair(keyBitsize?: number, options?: PrivateKeyCreationOptions): Observable<KeyPairCreationResult> {
        return this.createPrivateKey(keyBitsize, options).flatMap((privateKeyCreationResult: PrivateKeyCreationResult) =>
            this.getPublicKey(privateKeyCreationResult.key).map(
                (publicKeyCreationResult: PublicKeyCreationResult) =>
                    <KeyPairCreationResult> {
                        key: privateKeyCreationResult.key,
                        publicKey: publicKeyCreationResult.publicKey
                    }
            )
        );
    }

    /**
     * Gets the fingerprint for a certificate
     *
     * @param {String} certificate PEM encoded certificate
     * @param {HashFunction} [hash] Optional Hash function to use (either md5 sha1 or sha256, defaults to sha1)
     *
     * @return {Observable<FingerprintResult>} {fingerprint}
     */
    getFingerprint(certificate: string, hash?: HashFunction): Observable<FingerprintResult> {
        return (<(certificate: string, hash?: HashFunction) =>
            Observable<FingerprintResult>> Observable.bindNodeCallback(pem.getFingerprint))(certificate, hash);
    }

    /**
     * Gets the modulus from a certificate, a CSR or a private key
     *
     * @param {String} certificate PEM encoded, CSR PEM encoded, or private key
     * @param {String} [password] Optional password for the certificate
     *
     * @return {Observable<ModulusResult>} {modulus}
     */
    getModulus(certificate: string, password?: string): Observable<ModulusResult> {
        return (<(certificate: string, password?: string) =>
            Observable<ModulusResult>> Observable.bindNodeCallback(pem.getModulus))(certificate, password);
    }

    /**
     * Gets the size and prime of DH parameters
     *
     * @param {String} dh DH parameters PEM encoded
     *
     * @return {Observable<DhParamInfoResult>} {size, prime}
     */
    getDhparamInfo(dh: string): Observable<DhParamInfoResult> {
        return (<(dh: string) => Observable<DhParamInfoResult>> Observable.bindNodeCallback(pem.getDhparamInfo))(dh);
    }

    /**
     * Exports private key and certificate to a PKCS12 keystore
     *
     * @param {String} key PEM encoded private key
     * @param {String} certificate PEM encoded certificate
     * @param {String} password Password of the result PKCS12 file
     * @param {Pkcs12CreationOptions} [options] Optional object of cipher and optional client key password
     *  {cipher:'aes128', clientKeyPassword: 'xxx'}
     *
     * @return {Observable<PKCS12CreationResult>} {pkcs12}
     */
    createPkcs12(key: string, certificate: string, password: string, options?: Pkcs12CreationOptions): Observable<PKCS12CreationResult> {
        return (<(key: string, certificate: string, password: string, options?: Pkcs12CreationOptions) =>
            Observable<PKCS12CreationResult>> Observable.bindNodeCallback(pem.createPkcs12))(key, certificate, password, options);
    }

    /**
     * Reads private key and certificate from a PKCS12 keystore
     *
     * @param {String} bufferOrPath Buffer representation or path to PKCS12 keystore
     * @param {Pkcs12ReadOptions} [options] Optional object of optional keystore and client key passwords
     *
     * @return {Observable<PKCS12ReadResult>} {key,cert,ca}
     */
    readPkcs12(bufferOrPath: string, options?: Pkcs12ReadOptions): Observable<PKCS12ReadResult> {
        return (<(bufferOrPath: string, options?: Pkcs12ReadOptions) =>
            Observable<any>> Observable.bindNodeCallback(pem.readPkcs12))(bufferOrPath, options);
    }

    /**
     * Verifies the signing chain of the passed certificate
     *
     * @param {String} certificate PEM encoded certificate
     * @param {string[]} ca List of CA certificates
     *
     * @return {Observable<boolean>}
     */
    verifySigningChain(certificate: string, ca: string[]): Observable<boolean> {
        return (<(certificate: string, ca: string[]) =>
            Observable<boolean>> Observable.bindNodeCallback(pem.verifySigningChain))(certificate, ca);
    }
}

/**
 * Export pem interfaces
 */
export {
    CertificateCreationOptions, CertificateCreationResult, CertificateSubjectReadResult, CSRCreationOptions,
    HashFunction, Pkcs12CreationOptions, Pkcs12ReadOptions,
    PrivateKeyCreationOptions
};

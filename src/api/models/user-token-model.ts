/* tslint:disable */
/* eslint-disable */
/**
 * Argento Oficina Virtual
 * Api para Portal de Clientes Argento
 *
 * The version of the OpenAPI document: 0.10.2
 * Contact: info@mts.com.do
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


// May contain unused imports in some cases
// @ts-ignore
import { AnonymousInfo } from './anonymous-info';
// May contain unused imports in some cases
// @ts-ignore
import { UserModel } from './user-model';
// May contain unused imports in some cases
// @ts-ignore
import { UserTokenLoginProviderSelector } from './user-token-login-provider-selector';
// May contain unused imports in some cases
// @ts-ignore
import { UserTokenStatus } from './user-token-status';

/**
 * 
 * @export
 * @interface UserTokenModel
 */
export interface UserTokenModel {
    /**
     * 
     * @type {number}
     * @memberof UserTokenModel
     */
    'id'?: number;
    /**
     * 
     * @type {boolean}
     * @memberof UserTokenModel
     */
    'isNullable'?: boolean;
    /**
     * 
     * @type {UserTokenStatus}
     * @memberof UserTokenModel
     */
    'status'?: UserTokenStatus;
    /**
     * 
     * @type {string}
     * @memberof UserTokenModel
     */
    'createdBy'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof UserTokenModel
     */
    'createdOnUtc'?: string;
    /**
     * 
     * @type {string}
     * @memberof UserTokenModel
     */
    'updatedBy'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof UserTokenModel
     */
    'updatedOnUtc'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof UserTokenModel
     */
    'userId'?: string | null;
    /**
     * 
     * @type {UserModel}
     * @memberof UserTokenModel
     */
    'user'?: UserModel;
    /**
     * 
     * @type {UserTokenLoginProviderSelector}
     * @memberof UserTokenModel
     */
    'loginProvider'?: UserTokenLoginProviderSelector;
    /**
     * 
     * @type {string}
     * @memberof UserTokenModel
     */
    'loginProviderCode'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof UserTokenModel
     */
    'name'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof UserTokenModel
     */
    'refreshToken'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof UserTokenModel
     */
    'tokenIdentifier'?: string | null;
    /**
     * 
     * @type {number}
     * @memberof UserTokenModel
     */
    'regenerateQty'?: number;
    /**
     * 
     * @type {number}
     * @memberof UserTokenModel
     */
    'maxRegenerationQty'?: number | null;
    /**
     * 
     * @type {string}
     * @memberof UserTokenModel
     */
    'expiresAt'?: string | null;
    /**
     * 
     * @type {AnonymousInfo}
     * @memberof UserTokenModel
     */
    'lastInteractionFrom'?: AnonymousInfo;
}




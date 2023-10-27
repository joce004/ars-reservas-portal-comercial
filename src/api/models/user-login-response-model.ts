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
import { AccountProfileResponseModel } from './account-profile-response-model';
// May contain unused imports in some cases
// @ts-ignore
import { JwtTokenResponseModel } from './jwt-token-response-model';

/**
 * 
 * @export
 * @interface UserLoginResponseModel
 */
export interface UserLoginResponseModel {
    /**
     * 
     * @type {JwtTokenResponseModel}
     * @memberof UserLoginResponseModel
     */
    'token'?: JwtTokenResponseModel;
    /**
     * 
     * @type {AccountProfileResponseModel}
     * @memberof UserLoginResponseModel
     */
    'profile'?: AccountProfileResponseModel;
}

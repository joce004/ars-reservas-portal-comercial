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
import { UserType } from './user-type';

/**
 * 
 * @export
 * @interface UserBriefModel
 */
export interface UserBriefModel {
    /**
     * 
     * @type {string}
     * @memberof UserBriefModel
     */
    'id'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof UserBriefModel
     */
    'fullName'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof UserBriefModel
     */
    'userName'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof UserBriefModel
     */
    'email'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof UserBriefModel
     */
    'phoneNumber'?: string | null;
    /**
     * 
     * @type {UserType}
     * @memberof UserBriefModel
     */
    'type'?: UserType;
}



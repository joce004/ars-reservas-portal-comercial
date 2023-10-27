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
import { BusinessUserBriefModel } from './business-user-brief-model';
// May contain unused imports in some cases
// @ts-ignore
import { RoleProfileBriefModel } from './role-profile-brief-model';
// May contain unused imports in some cases
// @ts-ignore
import { UserType } from './user-type';

/**
 * 
 * @export
 * @interface AccountProfileResponseModel
 */
export interface AccountProfileResponseModel {
    /**
     * 
     * @type {string}
     * @memberof AccountProfileResponseModel
     */
    'id'?: string | null;
    /**
     * 
     * @type {UserType}
     * @memberof AccountProfileResponseModel
     */
    'type'?: UserType;
    /**
     * 
     * @type {string}
     * @memberof AccountProfileResponseModel
     */
    'username'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof AccountProfileResponseModel
     */
    'email'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof AccountProfileResponseModel
     */
    'fullName'?: string | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof AccountProfileResponseModel
     */
    'roles'?: Array<string> | null;
    /**
     * 
     * @type {Array<RoleProfileBriefModel>}
     * @memberof AccountProfileResponseModel
     */
    'profiles'?: Array<RoleProfileBriefModel> | null;
    /**
     * 
     * @type {Array<BusinessUserBriefModel>}
     * @memberof AccountProfileResponseModel
     */
    'businesses'?: Array<BusinessUserBriefModel> | null;
}



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
import { BusinessUserModel } from './business-user-model';

/**
 * 
 * @export
 * @interface BusinessUserModelPaged
 */
export interface BusinessUserModelPaged {
    /**
     * 
     * @type {number}
     * @memberof BusinessUserModelPaged
     */
    'totalItems'?: number;
    /**
     * 
     * @type {number}
     * @memberof BusinessUserModelPaged
     */
    'page'?: number;
    /**
     * 
     * @type {number}
     * @memberof BusinessUserModelPaged
     */
    'totalPages'?: number;
    /**
     * 
     * @type {Array<BusinessUserModel>}
     * @memberof BusinessUserModelPaged
     */
    'items'?: Array<BusinessUserModel> | null;
    /**
     * 
     * @type {number}
     * @memberof BusinessUserModelPaged
     */
    'itemsCount'?: number | null;
}

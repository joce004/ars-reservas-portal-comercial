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
import { BusinessModel } from './business-model';

/**
 * 
 * @export
 * @interface BusinessModelPaged
 */
export interface BusinessModelPaged {
    /**
     * 
     * @type {number}
     * @memberof BusinessModelPaged
     */
    'totalItems'?: number;
    /**
     * 
     * @type {number}
     * @memberof BusinessModelPaged
     */
    'page'?: number;
    /**
     * 
     * @type {number}
     * @memberof BusinessModelPaged
     */
    'totalPages'?: number;
    /**
     * 
     * @type {Array<BusinessModel>}
     * @memberof BusinessModelPaged
     */
    'items'?: Array<BusinessModel> | null;
    /**
     * 
     * @type {number}
     * @memberof BusinessModelPaged
     */
    'itemsCount'?: number | null;
}


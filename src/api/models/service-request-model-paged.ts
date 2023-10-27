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
import { ServiceRequestModel } from './service-request-model';

/**
 * 
 * @export
 * @interface ServiceRequestModelPaged
 */
export interface ServiceRequestModelPaged {
    /**
     * 
     * @type {number}
     * @memberof ServiceRequestModelPaged
     */
    'totalItems'?: number;
    /**
     * 
     * @type {number}
     * @memberof ServiceRequestModelPaged
     */
    'page'?: number;
    /**
     * 
     * @type {number}
     * @memberof ServiceRequestModelPaged
     */
    'totalPages'?: number;
    /**
     * 
     * @type {Array<ServiceRequestModel>}
     * @memberof ServiceRequestModelPaged
     */
    'items'?: Array<ServiceRequestModel> | null;
    /**
     * 
     * @type {number}
     * @memberof ServiceRequestModelPaged
     */
    'itemsCount'?: number | null;
}


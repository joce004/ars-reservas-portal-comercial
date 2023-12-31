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
import { ServiceRequestInteractionModel } from './service-request-interaction-model';

/**
 * 
 * @export
 * @interface ServiceRequestInteractionModelPaged
 */
export interface ServiceRequestInteractionModelPaged {
    /**
     * 
     * @type {number}
     * @memberof ServiceRequestInteractionModelPaged
     */
    'totalItems'?: number;
    /**
     * 
     * @type {number}
     * @memberof ServiceRequestInteractionModelPaged
     */
    'page'?: number;
    /**
     * 
     * @type {number}
     * @memberof ServiceRequestInteractionModelPaged
     */
    'totalPages'?: number;
    /**
     * 
     * @type {Array<ServiceRequestInteractionModel>}
     * @memberof ServiceRequestInteractionModelPaged
     */
    'items'?: Array<ServiceRequestInteractionModel> | null;
    /**
     * 
     * @type {number}
     * @memberof ServiceRequestInteractionModelPaged
     */
    'itemsCount'?: number | null;
}


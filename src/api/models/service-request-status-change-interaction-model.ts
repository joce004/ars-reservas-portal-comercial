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
import { ServiceRequestStatus } from './service-request-status';

/**
 * 
 * @export
 * @interface ServiceRequestStatusChangeInteractionModel
 */
export interface ServiceRequestStatusChangeInteractionModel {
    /**
     * 
     * @type {ServiceRequestStatus}
     * @memberof ServiceRequestStatusChangeInteractionModel
     */
    'previous'?: ServiceRequestStatus;
    /**
     * 
     * @type {ServiceRequestStatus}
     * @memberof ServiceRequestStatusChangeInteractionModel
     */
    'next'?: ServiceRequestStatus;
}




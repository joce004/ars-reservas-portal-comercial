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
import { ServiceRequestClientIdentificationType } from './service-request-client-identification-type';

/**
 * 
 * @export
 * @interface ServiceRequestClientIdentificationModel
 */
export interface ServiceRequestClientIdentificationModel {
    /**
     * 
     * @type {ServiceRequestClientIdentificationType}
     * @memberof ServiceRequestClientIdentificationModel
     */
    'type'?: ServiceRequestClientIdentificationType;
    /**
     * 
     * @type {string}
     * @memberof ServiceRequestClientIdentificationModel
     */
    'value'?: string | null;
}




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
import { Status } from './status';

/**
 * 
 * @export
 * @interface UserEditionModel
 */
export interface UserEditionModel {
    /**
     * 
     * @type {string}
     * @memberof UserEditionModel
     */
    'firstName'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof UserEditionModel
     */
    'secondName'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof UserEditionModel
     */
    'firstLastName'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof UserEditionModel
     */
    'secondLastName'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof UserEditionModel
     */
    'phoneNumber'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof UserEditionModel
     */
    'id'?: string | null;
    /**
     * 
     * @type {Status}
     * @memberof UserEditionModel
     */
    'status'?: Status;
}



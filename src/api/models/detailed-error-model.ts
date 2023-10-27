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
import { AccessibilityLevel } from './accessibility-level';

/**
 * 
 * @export
 * @interface DetailedErrorModel
 */
export interface DetailedErrorModel {
    /**
     * 
     * @type {string}
     * @memberof DetailedErrorModel
     */
    'code'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof DetailedErrorModel
     */
    'message'?: string | null;
    /**
     * 
     * @type {AccessibilityLevel}
     * @memberof DetailedErrorModel
     */
    'level'?: AccessibilityLevel;
}




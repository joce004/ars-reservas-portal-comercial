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
import { ValueItemResponseModel } from './value-item-response-model';

/**
 * 
 * @export
 * @interface AvailableProductItemResponseModel
 */
export interface AvailableProductItemResponseModel {
    /**
     * 
     * @type {string}
     * @memberof AvailableProductItemResponseModel
     */
    'id'?: string | null;
    /**
     * 
     * @type {number}
     * @memberof AvailableProductItemResponseModel
     */
    'value'?: number | null;
    /**
     * 
     * @type {Array<ValueItemResponseModel>}
     * @memberof AvailableProductItemResponseModel
     */
    'values'?: Array<ValueItemResponseModel> | null;
    /**
     * 
     * @type {string}
     * @memberof AvailableProductItemResponseModel
     */
    'group'?: string | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof AvailableProductItemResponseModel
     */
    'groups'?: Array<string> | null;
    /**
     * 
     * @type {string}
     * @memberof AvailableProductItemResponseModel
     */
    'name'?: string | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof AvailableProductItemResponseModel
     */
    'tags'?: Array<string> | null;
    /**
     * 
     * @type {string}
     * @memberof AvailableProductItemResponseModel
     */
    'benefitsUrl'?: string | null;
}


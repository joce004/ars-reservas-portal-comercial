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



/**
 * 
 * @export
 * @interface ValueItemResponseModel
 */
export interface ValueItemResponseModel {
    /**
     * 
     * @type {string}
     * @memberof ValueItemResponseModel
     */
    'id'?: string | null;
    /**
     * 
     * @type {number}
     * @memberof ValueItemResponseModel
     */
    'value'?: number | null;
    /**
     * 
     * @type {Array<ValueItemResponseModel>}
     * @memberof ValueItemResponseModel
     */
    'values'?: Array<ValueItemResponseModel> | null;
    /**
     * 
     * @type {string}
     * @memberof ValueItemResponseModel
     */
    'group'?: string | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof ValueItemResponseModel
     */
    'groups'?: Array<string> | null;
    /**
     * 
     * @type {string}
     * @memberof ValueItemResponseModel
     */
    'name'?: string | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof ValueItemResponseModel
     */
    'tags'?: Array<string> | null;
}


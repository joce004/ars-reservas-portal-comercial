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
import { AvailableProductItemResponseModel } from './available-product-item-response-model';
// May contain unused imports in some cases
// @ts-ignore
import { ValueItemResponseModel } from './value-item-response-model';

/**
 * 
 * @export
 * @interface AvailableProductsResponseModel
 */
export interface AvailableProductsResponseModel {
    /**
     * 
     * @type {Array<AvailableProductItemResponseModel>}
     * @memberof AvailableProductsResponseModel
     */
    'products'?: Array<AvailableProductItemResponseModel> | null;
    /**
     * 
     * @type {Array<ValueItemResponseModel>}
     * @memberof AvailableProductsResponseModel
     */
    'extras'?: Array<ValueItemResponseModel> | null;
}


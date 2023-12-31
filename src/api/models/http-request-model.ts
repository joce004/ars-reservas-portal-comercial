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
 * @interface HttpRequestModel
 */
export interface HttpRequestModel {
    /**
     * 
     * @type {string}
     * @memberof HttpRequestModel
     */
    'requestAt'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof HttpRequestModel
     */
    'baseEndpoint'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof HttpRequestModel
     */
    'endpoint'?: string | null;
    /**
     * 
     * @type {{ [key: string]: string; }}
     * @memberof HttpRequestModel
     */
    'requestQueryParameters'?: { [key: string]: string; } | null;
    /**
     * 
     * @type {{ [key: string]: Array<string>; }}
     * @memberof HttpRequestModel
     */
    'requestHeaders'?: { [key: string]: Array<string>; } | null;
    /**
     * 
     * @type {string}
     * @memberof HttpRequestModel
     */
    'rawRequest'?: string | null;
}


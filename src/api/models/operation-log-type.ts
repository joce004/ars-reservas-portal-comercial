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
 * @enum {string}
 */

export const OperationLogType = {
    Unknown: 'Unknown',
    Http: 'Http',
    WebHook: 'WebHook'
} as const;

export type OperationLogType = typeof OperationLogType[keyof typeof OperationLogType];




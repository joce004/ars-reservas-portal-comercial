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

export const AccessibilityLevel = {
    Public: 'Public',
    Private: 'Private',
    Internal: 'Internal',
    Protected: 'Protected'
} as const;

export type AccessibilityLevel = typeof AccessibilityLevel[keyof typeof AccessibilityLevel];



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
import { FileType } from './file-type';

/**
 * 
 * @export
 * @interface FileResultModel
 */
export interface FileResultModel {
    /**
     * 
     * @type {string}
     * @memberof FileResultModel
     */
    'fileDownloadName'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof FileResultModel
     */
    'fileContents'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof FileResultModel
     */
    'fileContentsAsBytes'?: string | null;
    /**
     * 
     * @type {FileType}
     * @memberof FileResultModel
     */
    'fileType'?: FileType;
    /**
     * 
     * @type {string}
     * @memberof FileResultModel
     */
    'fileTypeName'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof FileResultModel
     */
    'fileExtensionType'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof FileResultModel
     */
    'fileContentType'?: string | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof FileResultModel
     */
    'fileAlternativeContentTypes'?: Array<string> | null;
}




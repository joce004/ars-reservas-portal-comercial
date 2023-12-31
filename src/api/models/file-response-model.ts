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
 * @interface FileResponseModel
 */
export interface FileResponseModel {
    /**
     * 
     * @type {string}
     * @memberof FileResponseModel
     */
    'createdAt'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof FileResponseModel
     */
    'name'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof FileResponseModel
     */
    'url'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof FileResponseModel
     */
    'extension'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof FileResponseModel
     */
    'linkTarget'?: string | null;
    /**
     * 
     * @type {boolean}
     * @memberof FileResponseModel
     */
    'isAccesible'?: boolean;
    /**
     * 
     * @type {string}
     * @memberof FileResponseModel
     */
    'folderUrl'?: string | null;
    /**
     * 
     * @type {FileType}
     * @memberof FileResponseModel
     */
    'type'?: FileType;
    /**
     * 
     * @type {string}
     * @memberof FileResponseModel
     */
    'fileContentType'?: string | null;
}




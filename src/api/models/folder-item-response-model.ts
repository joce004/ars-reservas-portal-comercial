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
import { FileResponseModel } from './file-response-model';

/**
 * 
 * @export
 * @interface FolderItemResponseModel
 */
export interface FolderItemResponseModel {
    /**
     * 
     * @type {string}
     * @memberof FolderItemResponseModel
     */
    'createdAt'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof FolderItemResponseModel
     */
    'name'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof FolderItemResponseModel
     */
    'url'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof FolderItemResponseModel
     */
    'extension'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof FolderItemResponseModel
     */
    'linkTarget'?: string | null;
    /**
     * 
     * @type {boolean}
     * @memberof FolderItemResponseModel
     */
    'isAccesible'?: boolean;
    /**
     * 
     * @type {Array<FolderItemResponseModel>}
     * @memberof FolderItemResponseModel
     */
    'folders'?: Array<FolderItemResponseModel> | null;
    /**
     * 
     * @type {number}
     * @memberof FolderItemResponseModel
     */
    'foldersCount'?: number | null;
    /**
     * 
     * @type {Array<FileResponseModel>}
     * @memberof FolderItemResponseModel
     */
    'files'?: Array<FileResponseModel> | null;
    /**
     * 
     * @type {number}
     * @memberof FolderItemResponseModel
     */
    'filesCount'?: number | null;
}


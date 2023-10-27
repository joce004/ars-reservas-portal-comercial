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
import { ErrorLogStatus } from './error-log-status';
// May contain unused imports in some cases
// @ts-ignore
import { ErrorLogType } from './error-log-type';
// May contain unused imports in some cases
// @ts-ignore
import { LocalErrorLogModelData } from './local-error-log-model-data';

/**
 * 
 * @export
 * @interface LocalErrorLogModel
 */
export interface LocalErrorLogModel {
    /**
     * 
     * @type {number}
     * @memberof LocalErrorLogModel
     */
    'id'?: number;
    /**
     * 
     * @type {boolean}
     * @memberof LocalErrorLogModel
     */
    'isNullable'?: boolean;
    /**
     * 
     * @type {ErrorLogStatus}
     * @memberof LocalErrorLogModel
     */
    'status'?: ErrorLogStatus;
    /**
     * 
     * @type {string}
     * @memberof LocalErrorLogModel
     */
    'createdBy'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof LocalErrorLogModel
     */
    'createdOnUtc'?: string;
    /**
     * 
     * @type {ErrorLogType}
     * @memberof LocalErrorLogModel
     */
    'type'?: ErrorLogType;
    /**
     * 
     * @type {string}
     * @memberof LocalErrorLogModel
     */
    'process'?: string | null;
    /**
     * 
     * @type {LocalErrorLogModelData}
     * @memberof LocalErrorLogModel
     */
    'data'?: LocalErrorLogModelData;
    /**
     * 
     * @type {string}
     * @memberof LocalErrorLogModel
     */
    'userIdentifier'?: string | null;
}



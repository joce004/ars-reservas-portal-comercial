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
import { AuditLogStatus } from './audit-log-status';

/**
 * 
 * @export
 * @interface LocalAuditLogModel
 */
export interface LocalAuditLogModel {
    /**
     * 
     * @type {number}
     * @memberof LocalAuditLogModel
     */
    'id'?: number;
    /**
     * 
     * @type {boolean}
     * @memberof LocalAuditLogModel
     */
    'isNullable'?: boolean;
    /**
     * 
     * @type {AuditLogStatus}
     * @memberof LocalAuditLogModel
     */
    'status'?: AuditLogStatus;
    /**
     * 
     * @type {string}
     * @memberof LocalAuditLogModel
     */
    'createdBy'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof LocalAuditLogModel
     */
    'createdOnUtc'?: string;
    /**
     * 
     * @type {string}
     * @memberof LocalAuditLogModel
     */
    'action'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof LocalAuditLogModel
     */
    'data'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof LocalAuditLogModel
     */
    'entityTypeFullName'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof LocalAuditLogModel
     */
    'entityTypeName'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof LocalAuditLogModel
     */
    'table'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof LocalAuditLogModel
     */
    'tablePkName'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof LocalAuditLogModel
     */
    'tablePkValue'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof LocalAuditLogModel
     */
    'fromOrigin'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof LocalAuditLogModel
     */
    'connectionId'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof LocalAuditLogModel
     */
    'transactionId'?: string | null;
}




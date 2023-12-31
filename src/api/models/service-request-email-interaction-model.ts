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
import { ServiceRequestEmailInteractionAttachmentInfoModel } from './service-request-email-interaction-attachment-info-model';
// May contain unused imports in some cases
// @ts-ignore
import { ServiceRequestEmailInteractionStatus } from './service-request-email-interaction-status';

/**
 * 
 * @export
 * @interface ServiceRequestEmailInteractionModel
 */
export interface ServiceRequestEmailInteractionModel {
    /**
     * 
     * @type {string}
     * @memberof ServiceRequestEmailInteractionModel
     */
    'messageId'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ServiceRequestEmailInteractionModel
     */
    'priority'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ServiceRequestEmailInteractionModel
     */
    'from'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ServiceRequestEmailInteractionModel
     */
    'to'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ServiceRequestEmailInteractionModel
     */
    'subject'?: string | null;
    /**
     * 
     * @type {Array<ServiceRequestEmailInteractionAttachmentInfoModel>}
     * @memberof ServiceRequestEmailInteractionModel
     */
    'attachmentsInfo'?: Array<ServiceRequestEmailInteractionAttachmentInfoModel> | null;
    /**
     * 
     * @type {ServiceRequestEmailInteractionStatus}
     * @memberof ServiceRequestEmailInteractionModel
     */
    'status'?: ServiceRequestEmailInteractionStatus;
    /**
     * 
     * @type {string}
     * @memberof ServiceRequestEmailInteractionModel
     */
    'statusReason'?: string | null;
}




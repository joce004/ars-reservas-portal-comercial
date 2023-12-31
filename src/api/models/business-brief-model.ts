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
import { BusinessBriefModelDataByType } from './business-brief-model-data-by-type';
// May contain unused imports in some cases
// @ts-ignore
import { BusinessType } from './business-type';
// May contain unused imports in some cases
// @ts-ignore
import { ContactInfoModel } from './contact-info-model';
// May contain unused imports in some cases
// @ts-ignore
import { UserBriefModel } from './user-brief-model';

/**
 * 
 * @export
 * @interface BusinessBriefModel
 */
export interface BusinessBriefModel {
    /**
     * 
     * @type {number}
     * @memberof BusinessBriefModel
     */
    'id'?: number;
    /**
     * 
     * @type {string}
     * @memberof BusinessBriefModel
     */
    'name'?: string | null;
    /**
     * 
     * @type {BusinessType}
     * @memberof BusinessBriefModel
     */
    'type'?: BusinessType;
    /**
     * 
     * @type {BusinessBriefModelDataByType}
     * @memberof BusinessBriefModel
     */
    'dataByType'?: BusinessBriefModelDataByType;
    /**
     * 
     * @type {number}
     * @memberof BusinessBriefModel
     */
    'ownerId'?: number | null;
    /**
     * 
     * @type {BusinessBriefModel}
     * @memberof BusinessBriefModel
     */
    'owner'?: BusinessBriefModel;
    /**
     * 
     * @type {string}
     * @memberof BusinessBriefModel
     */
    'responsibleUserId'?: string | null;
    /**
     * 
     * @type {UserBriefModel}
     * @memberof BusinessBriefModel
     */
    'responsibleUser'?: UserBriefModel;
    /**
     * 
     * @type {Array<ContactInfoModel>}
     * @memberof BusinessBriefModel
     */
    'contactInfo'?: Array<ContactInfoModel> | null;
    /**
     * 
     * @type {string}
     * @memberof BusinessBriefModel
     */
    'addressLine1'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof BusinessBriefModel
     */
    'addressLine2'?: string | null;
}




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
import { RoleModel } from './role-model';

/**
 * 
 * @export
 * @interface RoleModelPaged
 */
export interface RoleModelPaged {
    /**
     * 
     * @type {number}
     * @memberof RoleModelPaged
     */
    'totalItems'?: number;
    /**
     * 
     * @type {number}
     * @memberof RoleModelPaged
     */
    'page'?: number;
    /**
     * 
     * @type {number}
     * @memberof RoleModelPaged
     */
    'totalPages'?: number;
    /**
     * 
     * @type {Array<RoleModel>}
     * @memberof RoleModelPaged
     */
    'items'?: Array<RoleModel> | null;
    /**
     * 
     * @type {number}
     * @memberof RoleModelPaged
     */
    'itemsCount'?: number | null;
}


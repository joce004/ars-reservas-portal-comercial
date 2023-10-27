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
import { CeduladoApiProvider } from './cedulado-api-provider';
// May contain unused imports in some cases
// @ts-ignore
import { Status } from './status';
// May contain unused imports in some cases
// @ts-ignore
import { TipoServicio } from './tipo-servicio';

/**
 * 
 * @export
 * @interface CeduladoDispatcherFindPersonaResponseModel
 */
export interface CeduladoDispatcherFindPersonaResponseModel {
    /**
     * 
     * @type {number}
     * @memberof CeduladoDispatcherFindPersonaResponseModel
     */
    'id'?: number;
    /**
     * 
     * @type {boolean}
     * @memberof CeduladoDispatcherFindPersonaResponseModel
     */
    'isNullable'?: boolean;
    /**
     * 
     * @type {Status}
     * @memberof CeduladoDispatcherFindPersonaResponseModel
     */
    'status'?: Status;
    /**
     * 
     * @type {string}
     * @memberof CeduladoDispatcherFindPersonaResponseModel
     */
    'createdBy'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CeduladoDispatcherFindPersonaResponseModel
     */
    'createdOnUtc'?: string;
    /**
     * 
     * @type {string}
     * @memberof CeduladoDispatcherFindPersonaResponseModel
     */
    'mun'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CeduladoDispatcherFindPersonaResponseModel
     */
    'seq'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CeduladoDispatcherFindPersonaResponseModel
     */
    'ver'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CeduladoDispatcherFindPersonaResponseModel
     */
    'numero'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CeduladoDispatcherFindPersonaResponseModel
     */
    'nombres'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CeduladoDispatcherFindPersonaResponseModel
     */
    'apellido1'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CeduladoDispatcherFindPersonaResponseModel
     */
    'apellido2'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CeduladoDispatcherFindPersonaResponseModel
     */
    'fechaNacimiento'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CeduladoDispatcherFindPersonaResponseModel
     */
    'lugarNacimiento'?: string | null;
    /**
     * 
     * @type {number}
     * @memberof CeduladoDispatcherFindPersonaResponseModel
     */
    'codigoPiel'?: number | null;
    /**
     * 
     * @type {number}
     * @memberof CeduladoDispatcherFindPersonaResponseModel
     */
    'codigoSangre'?: number | null;
    /**
     * 
     * @type {string}
     * @memberof CeduladoDispatcherFindPersonaResponseModel
     */
    'sexo'?: string | null;
    /**
     * 
     * @type {number}
     * @memberof CeduladoDispatcherFindPersonaResponseModel
     */
    'codigoOcupacion'?: number | null;
    /**
     * 
     * @type {number}
     * @memberof CeduladoDispatcherFindPersonaResponseModel
     */
    'codigoNacion'?: number | null;
    /**
     * 
     * @type {string}
     * @memberof CeduladoDispatcherFindPersonaResponseModel
     */
    'estadoCivil'?: string | null;
    /**
     * 
     * @type {TipoServicio}
     * @memberof CeduladoDispatcherFindPersonaResponseModel
     */
    'tipoOrigen'?: TipoServicio;
    /**
     * 
     * @type {CeduladoApiProvider}
     * @memberof CeduladoDispatcherFindPersonaResponseModel
     */
    'origen'?: CeduladoApiProvider;
    /**
     * 
     * @type {string}
     * @memberof CeduladoDispatcherFindPersonaResponseModel
     */
    'fotoUrl'?: string | null;
}



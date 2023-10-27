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


import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
// @ts-ignore
import { CeduladoApiProvider } from '../models';
// @ts-ignore
import { CeduladoDispatcherFindEmpresaResponseModel } from '../models';
// @ts-ignore
import { CeduladoDispatcherFindPersonaResponseModel } from '../models';
// @ts-ignore
import { ErrorResponse } from '../models';
// @ts-ignore
import { ProblemDetails } from '../models';
/**
 * HelpersApi - axios parameter creator
 * @export
 */
export const HelpersApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {CeduladoApiProvider} [overrideProviderWhenNotFound] 
         * @param {string} [numero] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiSharedHelpersFindEmpresaGet: async (overrideProviderWhenNotFound?: CeduladoApiProvider, numero?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/Shared/Helpers/FindEmpresa`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)

            if (overrideProviderWhenNotFound !== undefined) {
                localVarQueryParameter['OverrideProviderWhenNotFound'] = overrideProviderWhenNotFound;
            }

            if (numero !== undefined) {
                localVarQueryParameter['Numero'] = numero;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {CeduladoApiProvider} [overrideProviderWhenNotFound] 
         * @param {string} [numero] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiSharedHelpersFindPersonaGet: async (overrideProviderWhenNotFound?: CeduladoApiProvider, numero?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/Shared/Helpers/FindPersona`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)

            if (overrideProviderWhenNotFound !== undefined) {
                localVarQueryParameter['OverrideProviderWhenNotFound'] = overrideProviderWhenNotFound;
            }

            if (numero !== undefined) {
                localVarQueryParameter['Numero'] = numero;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * HelpersApi - functional programming interface
 * @export
 */
export const HelpersApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = HelpersApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {CeduladoApiProvider} [overrideProviderWhenNotFound] 
         * @param {string} [numero] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSharedHelpersFindEmpresaGet(overrideProviderWhenNotFound?: CeduladoApiProvider, numero?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CeduladoDispatcherFindEmpresaResponseModel>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiSharedHelpersFindEmpresaGet(overrideProviderWhenNotFound, numero, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {CeduladoApiProvider} [overrideProviderWhenNotFound] 
         * @param {string} [numero] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSharedHelpersFindPersonaGet(overrideProviderWhenNotFound?: CeduladoApiProvider, numero?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CeduladoDispatcherFindPersonaResponseModel>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiSharedHelpersFindPersonaGet(overrideProviderWhenNotFound, numero, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * HelpersApi - factory interface
 * @export
 */
export const HelpersApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = HelpersApiFp(configuration)
    return {
        /**
         * 
         * @param {HelpersApiApiSharedHelpersFindEmpresaGetRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiSharedHelpersFindEmpresaGet(requestParameters: HelpersApiApiSharedHelpersFindEmpresaGetRequest = {}, options?: AxiosRequestConfig): AxiosPromise<CeduladoDispatcherFindEmpresaResponseModel> {
            return localVarFp.apiSharedHelpersFindEmpresaGet(requestParameters.overrideProviderWhenNotFound, requestParameters.numero, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {HelpersApiApiSharedHelpersFindPersonaGetRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiSharedHelpersFindPersonaGet(requestParameters: HelpersApiApiSharedHelpersFindPersonaGetRequest = {}, options?: AxiosRequestConfig): AxiosPromise<CeduladoDispatcherFindPersonaResponseModel> {
            return localVarFp.apiSharedHelpersFindPersonaGet(requestParameters.overrideProviderWhenNotFound, requestParameters.numero, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for apiSharedHelpersFindEmpresaGet operation in HelpersApi.
 * @export
 * @interface HelpersApiApiSharedHelpersFindEmpresaGetRequest
 */
export interface HelpersApiApiSharedHelpersFindEmpresaGetRequest {
    /**
     * 
     * @type {CeduladoApiProvider}
     * @memberof HelpersApiApiSharedHelpersFindEmpresaGet
     */
    readonly overrideProviderWhenNotFound?: CeduladoApiProvider

    /**
     * 
     * @type {string}
     * @memberof HelpersApiApiSharedHelpersFindEmpresaGet
     */
    readonly numero?: string
}

/**
 * Request parameters for apiSharedHelpersFindPersonaGet operation in HelpersApi.
 * @export
 * @interface HelpersApiApiSharedHelpersFindPersonaGetRequest
 */
export interface HelpersApiApiSharedHelpersFindPersonaGetRequest {
    /**
     * 
     * @type {CeduladoApiProvider}
     * @memberof HelpersApiApiSharedHelpersFindPersonaGet
     */
    readonly overrideProviderWhenNotFound?: CeduladoApiProvider

    /**
     * 
     * @type {string}
     * @memberof HelpersApiApiSharedHelpersFindPersonaGet
     */
    readonly numero?: string
}

/**
 * HelpersApi - object-oriented interface
 * @export
 * @class HelpersApi
 * @extends {BaseAPI}
 */
export class HelpersApi extends BaseAPI {
    /**
     * 
     * @param {HelpersApiApiSharedHelpersFindEmpresaGetRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof HelpersApi
     */
    public apiSharedHelpersFindEmpresaGet(requestParameters: HelpersApiApiSharedHelpersFindEmpresaGetRequest = {}, options?: AxiosRequestConfig) {
        return HelpersApiFp(this.configuration).apiSharedHelpersFindEmpresaGet(requestParameters.overrideProviderWhenNotFound, requestParameters.numero, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {HelpersApiApiSharedHelpersFindPersonaGetRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof HelpersApi
     */
    public apiSharedHelpersFindPersonaGet(requestParameters: HelpersApiApiSharedHelpersFindPersonaGetRequest = {}, options?: AxiosRequestConfig) {
        return HelpersApiFp(this.configuration).apiSharedHelpersFindPersonaGet(requestParameters.overrideProviderWhenNotFound, requestParameters.numero, options).then((request) => request(this.axios, this.basePath));
    }
}
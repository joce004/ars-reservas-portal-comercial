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
import { ErrorResponse } from '../models';
// @ts-ignore
import { FileType } from '../models';
// @ts-ignore
import { FolderResponseModel } from '../models';
// @ts-ignore
import { FolderResponseViewType } from '../models';
// @ts-ignore
import { ProblemDetails } from '../models';
/**
 * ResourcesLibraryApi - axios parameter creator
 * @export
 */
export const ResourcesLibraryApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {FolderResponseViewType} [viewType] 
         * @param {string} [searchPattern] 
         * @param {FileType} [type] 
         * @param {string} [name] 
         * @param {boolean} [hideEmptyFolders] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiSharedLibraryPublicGet: async (viewType?: FolderResponseViewType, searchPattern?: string, type?: FileType, name?: string, hideEmptyFolders?: boolean, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/Shared/Library/Public`;
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

            if (viewType !== undefined) {
                localVarQueryParameter['ViewType'] = viewType;
            }

            if (searchPattern !== undefined) {
                localVarQueryParameter['SearchPattern'] = searchPattern;
            }

            if (type !== undefined) {
                localVarQueryParameter['Type'] = type;
            }

            if (name !== undefined) {
                localVarQueryParameter['Name'] = name;
            }

            if (hideEmptyFolders !== undefined) {
                localVarQueryParameter['HideEmptyFolders'] = hideEmptyFolders;
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
 * ResourcesLibraryApi - functional programming interface
 * @export
 */
export const ResourcesLibraryApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = ResourcesLibraryApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {FolderResponseViewType} [viewType] 
         * @param {string} [searchPattern] 
         * @param {FileType} [type] 
         * @param {string} [name] 
         * @param {boolean} [hideEmptyFolders] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSharedLibraryPublicGet(viewType?: FolderResponseViewType, searchPattern?: string, type?: FileType, name?: string, hideEmptyFolders?: boolean, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<FolderResponseModel>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiSharedLibraryPublicGet(viewType, searchPattern, type, name, hideEmptyFolders, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * ResourcesLibraryApi - factory interface
 * @export
 */
export const ResourcesLibraryApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = ResourcesLibraryApiFp(configuration)
    return {
        /**
         * 
         * @param {ResourcesLibraryApiApiSharedLibraryPublicGetRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiSharedLibraryPublicGet(requestParameters: ResourcesLibraryApiApiSharedLibraryPublicGetRequest = {}, options?: AxiosRequestConfig): AxiosPromise<FolderResponseModel> {
            return localVarFp.apiSharedLibraryPublicGet(requestParameters.viewType, requestParameters.searchPattern, requestParameters.type, requestParameters.name, requestParameters.hideEmptyFolders, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for apiSharedLibraryPublicGet operation in ResourcesLibraryApi.
 * @export
 * @interface ResourcesLibraryApiApiSharedLibraryPublicGetRequest
 */
export interface ResourcesLibraryApiApiSharedLibraryPublicGetRequest {
    /**
     * 
     * @type {FolderResponseViewType}
     * @memberof ResourcesLibraryApiApiSharedLibraryPublicGet
     */
    readonly viewType?: FolderResponseViewType

    /**
     * 
     * @type {string}
     * @memberof ResourcesLibraryApiApiSharedLibraryPublicGet
     */
    readonly searchPattern?: string

    /**
     * 
     * @type {FileType}
     * @memberof ResourcesLibraryApiApiSharedLibraryPublicGet
     */
    readonly type?: FileType

    /**
     * 
     * @type {string}
     * @memberof ResourcesLibraryApiApiSharedLibraryPublicGet
     */
    readonly name?: string

    /**
     * 
     * @type {boolean}
     * @memberof ResourcesLibraryApiApiSharedLibraryPublicGet
     */
    readonly hideEmptyFolders?: boolean
}

/**
 * ResourcesLibraryApi - object-oriented interface
 * @export
 * @class ResourcesLibraryApi
 * @extends {BaseAPI}
 */
export class ResourcesLibraryApi extends BaseAPI {
    /**
     * 
     * @param {ResourcesLibraryApiApiSharedLibraryPublicGetRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ResourcesLibraryApi
     */
    public apiSharedLibraryPublicGet(requestParameters: ResourcesLibraryApiApiSharedLibraryPublicGetRequest = {}, options?: AxiosRequestConfig) {
        return ResourcesLibraryApiFp(this.configuration).apiSharedLibraryPublicGet(requestParameters.viewType, requestParameters.searchPattern, requestParameters.type, requestParameters.name, requestParameters.hideEmptyFolders, options).then((request) => request(this.axios, this.basePath));
    }
}

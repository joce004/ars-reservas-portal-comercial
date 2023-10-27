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
import { AuditLogStatus } from '../models';
// @ts-ignore
import { ErrorResponse } from '../models';
// @ts-ignore
import { LocalAuditLogModel } from '../models';
// @ts-ignore
import { LocalAuditLogModelPaged } from '../models';
// @ts-ignore
import { OrderBy } from '../models';
// @ts-ignore
import { ProblemDetails } from '../models';
/**
 * LocalAuditLogApi - axios parameter creator
 * @export
 */
export const LocalAuditLogApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {number} [id] 
         * @param {Array<number>} [idList] 
         * @param {AuditLogStatus} [status] 
         * @param {Array<AuditLogStatus>} [statusList] 
         * @param {string} [action] 
         * @param {string} [dataContains] 
         * @param {string} [entityTypeFullNameContains] 
         * @param {string} [entityTypeNameContains] 
         * @param {string} [tableContains] 
         * @param {string} [tablePkNameContains] 
         * @param {string} [tablePkValue] 
         * @param {string} [fromOriginContains] 
         * @param {string} [connectionId] 
         * @param {string} [transactionId] 
         * @param {number} [page] 
         * @param {number} [items] 
         * @param {Array<OrderBy>} [orderBies] 
         * @param {Array<string>} [rawIncludes] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiLogsAuditsGet: async (id?: number, idList?: Array<number>, status?: AuditLogStatus, statusList?: Array<AuditLogStatus>, action?: string, dataContains?: string, entityTypeFullNameContains?: string, entityTypeNameContains?: string, tableContains?: string, tablePkNameContains?: string, tablePkValue?: string, fromOriginContains?: string, connectionId?: string, transactionId?: string, page?: number, items?: number, orderBies?: Array<OrderBy>, rawIncludes?: Array<string>, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/Logs/Audits`;
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

            if (id !== undefined) {
                localVarQueryParameter['Id'] = id;
            }

            if (idList) {
                localVarQueryParameter['IdList'] = idList;
            }

            if (status !== undefined) {
                localVarQueryParameter['Status'] = status;
            }

            if (statusList) {
                localVarQueryParameter['StatusList'] = statusList;
            }

            if (action !== undefined) {
                localVarQueryParameter['Action'] = action;
            }

            if (dataContains !== undefined) {
                localVarQueryParameter['DataContains'] = dataContains;
            }

            if (entityTypeFullNameContains !== undefined) {
                localVarQueryParameter['EntityTypeFullNameContains'] = entityTypeFullNameContains;
            }

            if (entityTypeNameContains !== undefined) {
                localVarQueryParameter['EntityTypeNameContains'] = entityTypeNameContains;
            }

            if (tableContains !== undefined) {
                localVarQueryParameter['TableContains'] = tableContains;
            }

            if (tablePkNameContains !== undefined) {
                localVarQueryParameter['TablePkNameContains'] = tablePkNameContains;
            }

            if (tablePkValue !== undefined) {
                localVarQueryParameter['TablePkValue'] = tablePkValue;
            }

            if (fromOriginContains !== undefined) {
                localVarQueryParameter['FromOriginContains'] = fromOriginContains;
            }

            if (connectionId !== undefined) {
                localVarQueryParameter['ConnectionId'] = connectionId;
            }

            if (transactionId !== undefined) {
                localVarQueryParameter['TransactionId'] = transactionId;
            }

            if (page !== undefined) {
                localVarQueryParameter['Page'] = page;
            }

            if (items !== undefined) {
                localVarQueryParameter['Items'] = items;
            }

            if (orderBies) {
                localVarQueryParameter['OrderBies'] = orderBies;
            }

            if (rawIncludes) {
                localVarQueryParameter['RawIncludes'] = rawIncludes;
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
         * @param {number} id 
         * @param {number} [id2] 
         * @param {Array<number>} [idList] 
         * @param {AuditLogStatus} [status] 
         * @param {Array<AuditLogStatus>} [statusList] 
         * @param {string} [action] 
         * @param {string} [dataContains] 
         * @param {string} [entityTypeFullNameContains] 
         * @param {string} [entityTypeNameContains] 
         * @param {string} [tableContains] 
         * @param {string} [tablePkNameContains] 
         * @param {string} [tablePkValue] 
         * @param {string} [fromOriginContains] 
         * @param {string} [connectionId] 
         * @param {string} [transactionId] 
         * @param {number} [page] 
         * @param {number} [items] 
         * @param {Array<OrderBy>} [orderBies] 
         * @param {Array<string>} [rawIncludes] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiLogsAuditsIdGet: async (id: number, id2?: number, idList?: Array<number>, status?: AuditLogStatus, statusList?: Array<AuditLogStatus>, action?: string, dataContains?: string, entityTypeFullNameContains?: string, entityTypeNameContains?: string, tableContains?: string, tablePkNameContains?: string, tablePkValue?: string, fromOriginContains?: string, connectionId?: string, transactionId?: string, page?: number, items?: number, orderBies?: Array<OrderBy>, rawIncludes?: Array<string>, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('apiLogsAuditsIdGet', 'id', id)
            const localVarPath = `/api/Logs/Audits/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
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

            if (id2 !== undefined) {
                localVarQueryParameter['Id'] = id2;
            }

            if (idList) {
                localVarQueryParameter['IdList'] = idList;
            }

            if (status !== undefined) {
                localVarQueryParameter['Status'] = status;
            }

            if (statusList) {
                localVarQueryParameter['StatusList'] = statusList;
            }

            if (action !== undefined) {
                localVarQueryParameter['Action'] = action;
            }

            if (dataContains !== undefined) {
                localVarQueryParameter['DataContains'] = dataContains;
            }

            if (entityTypeFullNameContains !== undefined) {
                localVarQueryParameter['EntityTypeFullNameContains'] = entityTypeFullNameContains;
            }

            if (entityTypeNameContains !== undefined) {
                localVarQueryParameter['EntityTypeNameContains'] = entityTypeNameContains;
            }

            if (tableContains !== undefined) {
                localVarQueryParameter['TableContains'] = tableContains;
            }

            if (tablePkNameContains !== undefined) {
                localVarQueryParameter['TablePkNameContains'] = tablePkNameContains;
            }

            if (tablePkValue !== undefined) {
                localVarQueryParameter['TablePkValue'] = tablePkValue;
            }

            if (fromOriginContains !== undefined) {
                localVarQueryParameter['FromOriginContains'] = fromOriginContains;
            }

            if (connectionId !== undefined) {
                localVarQueryParameter['ConnectionId'] = connectionId;
            }

            if (transactionId !== undefined) {
                localVarQueryParameter['TransactionId'] = transactionId;
            }

            if (page !== undefined) {
                localVarQueryParameter['Page'] = page;
            }

            if (items !== undefined) {
                localVarQueryParameter['Items'] = items;
            }

            if (orderBies) {
                localVarQueryParameter['OrderBies'] = orderBies;
            }

            if (rawIncludes) {
                localVarQueryParameter['RawIncludes'] = rawIncludes;
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
         * @param {number} [id] 
         * @param {Array<number>} [idList] 
         * @param {AuditLogStatus} [status] 
         * @param {Array<AuditLogStatus>} [statusList] 
         * @param {string} [action] 
         * @param {string} [dataContains] 
         * @param {string} [entityTypeFullNameContains] 
         * @param {string} [entityTypeNameContains] 
         * @param {string} [tableContains] 
         * @param {string} [tablePkNameContains] 
         * @param {string} [tablePkValue] 
         * @param {string} [fromOriginContains] 
         * @param {string} [connectionId] 
         * @param {string} [transactionId] 
         * @param {number} [page] 
         * @param {number} [items] 
         * @param {Array<OrderBy>} [orderBies] 
         * @param {Array<string>} [rawIncludes] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiLogsAuditsListGet: async (id?: number, idList?: Array<number>, status?: AuditLogStatus, statusList?: Array<AuditLogStatus>, action?: string, dataContains?: string, entityTypeFullNameContains?: string, entityTypeNameContains?: string, tableContains?: string, tablePkNameContains?: string, tablePkValue?: string, fromOriginContains?: string, connectionId?: string, transactionId?: string, page?: number, items?: number, orderBies?: Array<OrderBy>, rawIncludes?: Array<string>, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/Logs/Audits/List`;
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

            if (id !== undefined) {
                localVarQueryParameter['Id'] = id;
            }

            if (idList) {
                localVarQueryParameter['IdList'] = idList;
            }

            if (status !== undefined) {
                localVarQueryParameter['Status'] = status;
            }

            if (statusList) {
                localVarQueryParameter['StatusList'] = statusList;
            }

            if (action !== undefined) {
                localVarQueryParameter['Action'] = action;
            }

            if (dataContains !== undefined) {
                localVarQueryParameter['DataContains'] = dataContains;
            }

            if (entityTypeFullNameContains !== undefined) {
                localVarQueryParameter['EntityTypeFullNameContains'] = entityTypeFullNameContains;
            }

            if (entityTypeNameContains !== undefined) {
                localVarQueryParameter['EntityTypeNameContains'] = entityTypeNameContains;
            }

            if (tableContains !== undefined) {
                localVarQueryParameter['TableContains'] = tableContains;
            }

            if (tablePkNameContains !== undefined) {
                localVarQueryParameter['TablePkNameContains'] = tablePkNameContains;
            }

            if (tablePkValue !== undefined) {
                localVarQueryParameter['TablePkValue'] = tablePkValue;
            }

            if (fromOriginContains !== undefined) {
                localVarQueryParameter['FromOriginContains'] = fromOriginContains;
            }

            if (connectionId !== undefined) {
                localVarQueryParameter['ConnectionId'] = connectionId;
            }

            if (transactionId !== undefined) {
                localVarQueryParameter['TransactionId'] = transactionId;
            }

            if (page !== undefined) {
                localVarQueryParameter['Page'] = page;
            }

            if (items !== undefined) {
                localVarQueryParameter['Items'] = items;
            }

            if (orderBies) {
                localVarQueryParameter['OrderBies'] = orderBies;
            }

            if (rawIncludes) {
                localVarQueryParameter['RawIncludes'] = rawIncludes;
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
 * LocalAuditLogApi - functional programming interface
 * @export
 */
export const LocalAuditLogApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = LocalAuditLogApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {number} [id] 
         * @param {Array<number>} [idList] 
         * @param {AuditLogStatus} [status] 
         * @param {Array<AuditLogStatus>} [statusList] 
         * @param {string} [action] 
         * @param {string} [dataContains] 
         * @param {string} [entityTypeFullNameContains] 
         * @param {string} [entityTypeNameContains] 
         * @param {string} [tableContains] 
         * @param {string} [tablePkNameContains] 
         * @param {string} [tablePkValue] 
         * @param {string} [fromOriginContains] 
         * @param {string} [connectionId] 
         * @param {string} [transactionId] 
         * @param {number} [page] 
         * @param {number} [items] 
         * @param {Array<OrderBy>} [orderBies] 
         * @param {Array<string>} [rawIncludes] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiLogsAuditsGet(id?: number, idList?: Array<number>, status?: AuditLogStatus, statusList?: Array<AuditLogStatus>, action?: string, dataContains?: string, entityTypeFullNameContains?: string, entityTypeNameContains?: string, tableContains?: string, tablePkNameContains?: string, tablePkValue?: string, fromOriginContains?: string, connectionId?: string, transactionId?: string, page?: number, items?: number, orderBies?: Array<OrderBy>, rawIncludes?: Array<string>, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<LocalAuditLogModelPaged>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiLogsAuditsGet(id, idList, status, statusList, action, dataContains, entityTypeFullNameContains, entityTypeNameContains, tableContains, tablePkNameContains, tablePkValue, fromOriginContains, connectionId, transactionId, page, items, orderBies, rawIncludes, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {number} id 
         * @param {number} [id2] 
         * @param {Array<number>} [idList] 
         * @param {AuditLogStatus} [status] 
         * @param {Array<AuditLogStatus>} [statusList] 
         * @param {string} [action] 
         * @param {string} [dataContains] 
         * @param {string} [entityTypeFullNameContains] 
         * @param {string} [entityTypeNameContains] 
         * @param {string} [tableContains] 
         * @param {string} [tablePkNameContains] 
         * @param {string} [tablePkValue] 
         * @param {string} [fromOriginContains] 
         * @param {string} [connectionId] 
         * @param {string} [transactionId] 
         * @param {number} [page] 
         * @param {number} [items] 
         * @param {Array<OrderBy>} [orderBies] 
         * @param {Array<string>} [rawIncludes] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiLogsAuditsIdGet(id: number, id2?: number, idList?: Array<number>, status?: AuditLogStatus, statusList?: Array<AuditLogStatus>, action?: string, dataContains?: string, entityTypeFullNameContains?: string, entityTypeNameContains?: string, tableContains?: string, tablePkNameContains?: string, tablePkValue?: string, fromOriginContains?: string, connectionId?: string, transactionId?: string, page?: number, items?: number, orderBies?: Array<OrderBy>, rawIncludes?: Array<string>, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<LocalAuditLogModel>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiLogsAuditsIdGet(id, id2, idList, status, statusList, action, dataContains, entityTypeFullNameContains, entityTypeNameContains, tableContains, tablePkNameContains, tablePkValue, fromOriginContains, connectionId, transactionId, page, items, orderBies, rawIncludes, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {number} [id] 
         * @param {Array<number>} [idList] 
         * @param {AuditLogStatus} [status] 
         * @param {Array<AuditLogStatus>} [statusList] 
         * @param {string} [action] 
         * @param {string} [dataContains] 
         * @param {string} [entityTypeFullNameContains] 
         * @param {string} [entityTypeNameContains] 
         * @param {string} [tableContains] 
         * @param {string} [tablePkNameContains] 
         * @param {string} [tablePkValue] 
         * @param {string} [fromOriginContains] 
         * @param {string} [connectionId] 
         * @param {string} [transactionId] 
         * @param {number} [page] 
         * @param {number} [items] 
         * @param {Array<OrderBy>} [orderBies] 
         * @param {Array<string>} [rawIncludes] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiLogsAuditsListGet(id?: number, idList?: Array<number>, status?: AuditLogStatus, statusList?: Array<AuditLogStatus>, action?: string, dataContains?: string, entityTypeFullNameContains?: string, entityTypeNameContains?: string, tableContains?: string, tablePkNameContains?: string, tablePkValue?: string, fromOriginContains?: string, connectionId?: string, transactionId?: string, page?: number, items?: number, orderBies?: Array<OrderBy>, rawIncludes?: Array<string>, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<LocalAuditLogModel>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiLogsAuditsListGet(id, idList, status, statusList, action, dataContains, entityTypeFullNameContains, entityTypeNameContains, tableContains, tablePkNameContains, tablePkValue, fromOriginContains, connectionId, transactionId, page, items, orderBies, rawIncludes, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * LocalAuditLogApi - factory interface
 * @export
 */
export const LocalAuditLogApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = LocalAuditLogApiFp(configuration)
    return {
        /**
         * 
         * @param {LocalAuditLogApiApiLogsAuditsGetRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiLogsAuditsGet(requestParameters: LocalAuditLogApiApiLogsAuditsGetRequest = {}, options?: AxiosRequestConfig): AxiosPromise<LocalAuditLogModelPaged> {
            return localVarFp.apiLogsAuditsGet(requestParameters.id, requestParameters.idList, requestParameters.status, requestParameters.statusList, requestParameters.action, requestParameters.dataContains, requestParameters.entityTypeFullNameContains, requestParameters.entityTypeNameContains, requestParameters.tableContains, requestParameters.tablePkNameContains, requestParameters.tablePkValue, requestParameters.fromOriginContains, requestParameters.connectionId, requestParameters.transactionId, requestParameters.page, requestParameters.items, requestParameters.orderBies, requestParameters.rawIncludes, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {LocalAuditLogApiApiLogsAuditsIdGetRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiLogsAuditsIdGet(requestParameters: LocalAuditLogApiApiLogsAuditsIdGetRequest, options?: AxiosRequestConfig): AxiosPromise<LocalAuditLogModel> {
            return localVarFp.apiLogsAuditsIdGet(requestParameters.id, requestParameters.id2, requestParameters.idList, requestParameters.status, requestParameters.statusList, requestParameters.action, requestParameters.dataContains, requestParameters.entityTypeFullNameContains, requestParameters.entityTypeNameContains, requestParameters.tableContains, requestParameters.tablePkNameContains, requestParameters.tablePkValue, requestParameters.fromOriginContains, requestParameters.connectionId, requestParameters.transactionId, requestParameters.page, requestParameters.items, requestParameters.orderBies, requestParameters.rawIncludes, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {LocalAuditLogApiApiLogsAuditsListGetRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiLogsAuditsListGet(requestParameters: LocalAuditLogApiApiLogsAuditsListGetRequest = {}, options?: AxiosRequestConfig): AxiosPromise<Array<LocalAuditLogModel>> {
            return localVarFp.apiLogsAuditsListGet(requestParameters.id, requestParameters.idList, requestParameters.status, requestParameters.statusList, requestParameters.action, requestParameters.dataContains, requestParameters.entityTypeFullNameContains, requestParameters.entityTypeNameContains, requestParameters.tableContains, requestParameters.tablePkNameContains, requestParameters.tablePkValue, requestParameters.fromOriginContains, requestParameters.connectionId, requestParameters.transactionId, requestParameters.page, requestParameters.items, requestParameters.orderBies, requestParameters.rawIncludes, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for apiLogsAuditsGet operation in LocalAuditLogApi.
 * @export
 * @interface LocalAuditLogApiApiLogsAuditsGetRequest
 */
export interface LocalAuditLogApiApiLogsAuditsGetRequest {
    /**
     * 
     * @type {number}
     * @memberof LocalAuditLogApiApiLogsAuditsGet
     */
    readonly id?: number

    /**
     * 
     * @type {Array<number>}
     * @memberof LocalAuditLogApiApiLogsAuditsGet
     */
    readonly idList?: Array<number>

    /**
     * 
     * @type {AuditLogStatus}
     * @memberof LocalAuditLogApiApiLogsAuditsGet
     */
    readonly status?: AuditLogStatus

    /**
     * 
     * @type {Array<AuditLogStatus>}
     * @memberof LocalAuditLogApiApiLogsAuditsGet
     */
    readonly statusList?: Array<AuditLogStatus>

    /**
     * 
     * @type {string}
     * @memberof LocalAuditLogApiApiLogsAuditsGet
     */
    readonly action?: string

    /**
     * 
     * @type {string}
     * @memberof LocalAuditLogApiApiLogsAuditsGet
     */
    readonly dataContains?: string

    /**
     * 
     * @type {string}
     * @memberof LocalAuditLogApiApiLogsAuditsGet
     */
    readonly entityTypeFullNameContains?: string

    /**
     * 
     * @type {string}
     * @memberof LocalAuditLogApiApiLogsAuditsGet
     */
    readonly entityTypeNameContains?: string

    /**
     * 
     * @type {string}
     * @memberof LocalAuditLogApiApiLogsAuditsGet
     */
    readonly tableContains?: string

    /**
     * 
     * @type {string}
     * @memberof LocalAuditLogApiApiLogsAuditsGet
     */
    readonly tablePkNameContains?: string

    /**
     * 
     * @type {string}
     * @memberof LocalAuditLogApiApiLogsAuditsGet
     */
    readonly tablePkValue?: string

    /**
     * 
     * @type {string}
     * @memberof LocalAuditLogApiApiLogsAuditsGet
     */
    readonly fromOriginContains?: string

    /**
     * 
     * @type {string}
     * @memberof LocalAuditLogApiApiLogsAuditsGet
     */
    readonly connectionId?: string

    /**
     * 
     * @type {string}
     * @memberof LocalAuditLogApiApiLogsAuditsGet
     */
    readonly transactionId?: string

    /**
     * 
     * @type {number}
     * @memberof LocalAuditLogApiApiLogsAuditsGet
     */
    readonly page?: number

    /**
     * 
     * @type {number}
     * @memberof LocalAuditLogApiApiLogsAuditsGet
     */
    readonly items?: number

    /**
     * 
     * @type {Array<OrderBy>}
     * @memberof LocalAuditLogApiApiLogsAuditsGet
     */
    readonly orderBies?: Array<OrderBy>

    /**
     * 
     * @type {Array<string>}
     * @memberof LocalAuditLogApiApiLogsAuditsGet
     */
    readonly rawIncludes?: Array<string>
}

/**
 * Request parameters for apiLogsAuditsIdGet operation in LocalAuditLogApi.
 * @export
 * @interface LocalAuditLogApiApiLogsAuditsIdGetRequest
 */
export interface LocalAuditLogApiApiLogsAuditsIdGetRequest {
    /**
     * 
     * @type {number}
     * @memberof LocalAuditLogApiApiLogsAuditsIdGet
     */
    readonly id: number

    /**
     * 
     * @type {number}
     * @memberof LocalAuditLogApiApiLogsAuditsIdGet
     */
    readonly id2?: number

    /**
     * 
     * @type {Array<number>}
     * @memberof LocalAuditLogApiApiLogsAuditsIdGet
     */
    readonly idList?: Array<number>

    /**
     * 
     * @type {AuditLogStatus}
     * @memberof LocalAuditLogApiApiLogsAuditsIdGet
     */
    readonly status?: AuditLogStatus

    /**
     * 
     * @type {Array<AuditLogStatus>}
     * @memberof LocalAuditLogApiApiLogsAuditsIdGet
     */
    readonly statusList?: Array<AuditLogStatus>

    /**
     * 
     * @type {string}
     * @memberof LocalAuditLogApiApiLogsAuditsIdGet
     */
    readonly action?: string

    /**
     * 
     * @type {string}
     * @memberof LocalAuditLogApiApiLogsAuditsIdGet
     */
    readonly dataContains?: string

    /**
     * 
     * @type {string}
     * @memberof LocalAuditLogApiApiLogsAuditsIdGet
     */
    readonly entityTypeFullNameContains?: string

    /**
     * 
     * @type {string}
     * @memberof LocalAuditLogApiApiLogsAuditsIdGet
     */
    readonly entityTypeNameContains?: string

    /**
     * 
     * @type {string}
     * @memberof LocalAuditLogApiApiLogsAuditsIdGet
     */
    readonly tableContains?: string

    /**
     * 
     * @type {string}
     * @memberof LocalAuditLogApiApiLogsAuditsIdGet
     */
    readonly tablePkNameContains?: string

    /**
     * 
     * @type {string}
     * @memberof LocalAuditLogApiApiLogsAuditsIdGet
     */
    readonly tablePkValue?: string

    /**
     * 
     * @type {string}
     * @memberof LocalAuditLogApiApiLogsAuditsIdGet
     */
    readonly fromOriginContains?: string

    /**
     * 
     * @type {string}
     * @memberof LocalAuditLogApiApiLogsAuditsIdGet
     */
    readonly connectionId?: string

    /**
     * 
     * @type {string}
     * @memberof LocalAuditLogApiApiLogsAuditsIdGet
     */
    readonly transactionId?: string

    /**
     * 
     * @type {number}
     * @memberof LocalAuditLogApiApiLogsAuditsIdGet
     */
    readonly page?: number

    /**
     * 
     * @type {number}
     * @memberof LocalAuditLogApiApiLogsAuditsIdGet
     */
    readonly items?: number

    /**
     * 
     * @type {Array<OrderBy>}
     * @memberof LocalAuditLogApiApiLogsAuditsIdGet
     */
    readonly orderBies?: Array<OrderBy>

    /**
     * 
     * @type {Array<string>}
     * @memberof LocalAuditLogApiApiLogsAuditsIdGet
     */
    readonly rawIncludes?: Array<string>
}

/**
 * Request parameters for apiLogsAuditsListGet operation in LocalAuditLogApi.
 * @export
 * @interface LocalAuditLogApiApiLogsAuditsListGetRequest
 */
export interface LocalAuditLogApiApiLogsAuditsListGetRequest {
    /**
     * 
     * @type {number}
     * @memberof LocalAuditLogApiApiLogsAuditsListGet
     */
    readonly id?: number

    /**
     * 
     * @type {Array<number>}
     * @memberof LocalAuditLogApiApiLogsAuditsListGet
     */
    readonly idList?: Array<number>

    /**
     * 
     * @type {AuditLogStatus}
     * @memberof LocalAuditLogApiApiLogsAuditsListGet
     */
    readonly status?: AuditLogStatus

    /**
     * 
     * @type {Array<AuditLogStatus>}
     * @memberof LocalAuditLogApiApiLogsAuditsListGet
     */
    readonly statusList?: Array<AuditLogStatus>

    /**
     * 
     * @type {string}
     * @memberof LocalAuditLogApiApiLogsAuditsListGet
     */
    readonly action?: string

    /**
     * 
     * @type {string}
     * @memberof LocalAuditLogApiApiLogsAuditsListGet
     */
    readonly dataContains?: string

    /**
     * 
     * @type {string}
     * @memberof LocalAuditLogApiApiLogsAuditsListGet
     */
    readonly entityTypeFullNameContains?: string

    /**
     * 
     * @type {string}
     * @memberof LocalAuditLogApiApiLogsAuditsListGet
     */
    readonly entityTypeNameContains?: string

    /**
     * 
     * @type {string}
     * @memberof LocalAuditLogApiApiLogsAuditsListGet
     */
    readonly tableContains?: string

    /**
     * 
     * @type {string}
     * @memberof LocalAuditLogApiApiLogsAuditsListGet
     */
    readonly tablePkNameContains?: string

    /**
     * 
     * @type {string}
     * @memberof LocalAuditLogApiApiLogsAuditsListGet
     */
    readonly tablePkValue?: string

    /**
     * 
     * @type {string}
     * @memberof LocalAuditLogApiApiLogsAuditsListGet
     */
    readonly fromOriginContains?: string

    /**
     * 
     * @type {string}
     * @memberof LocalAuditLogApiApiLogsAuditsListGet
     */
    readonly connectionId?: string

    /**
     * 
     * @type {string}
     * @memberof LocalAuditLogApiApiLogsAuditsListGet
     */
    readonly transactionId?: string

    /**
     * 
     * @type {number}
     * @memberof LocalAuditLogApiApiLogsAuditsListGet
     */
    readonly page?: number

    /**
     * 
     * @type {number}
     * @memberof LocalAuditLogApiApiLogsAuditsListGet
     */
    readonly items?: number

    /**
     * 
     * @type {Array<OrderBy>}
     * @memberof LocalAuditLogApiApiLogsAuditsListGet
     */
    readonly orderBies?: Array<OrderBy>

    /**
     * 
     * @type {Array<string>}
     * @memberof LocalAuditLogApiApiLogsAuditsListGet
     */
    readonly rawIncludes?: Array<string>
}

/**
 * LocalAuditLogApi - object-oriented interface
 * @export
 * @class LocalAuditLogApi
 * @extends {BaseAPI}
 */
export class LocalAuditLogApi extends BaseAPI {
    /**
     * 
     * @param {LocalAuditLogApiApiLogsAuditsGetRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LocalAuditLogApi
     */
    public apiLogsAuditsGet(requestParameters: LocalAuditLogApiApiLogsAuditsGetRequest = {}, options?: AxiosRequestConfig) {
        return LocalAuditLogApiFp(this.configuration).apiLogsAuditsGet(requestParameters.id, requestParameters.idList, requestParameters.status, requestParameters.statusList, requestParameters.action, requestParameters.dataContains, requestParameters.entityTypeFullNameContains, requestParameters.entityTypeNameContains, requestParameters.tableContains, requestParameters.tablePkNameContains, requestParameters.tablePkValue, requestParameters.fromOriginContains, requestParameters.connectionId, requestParameters.transactionId, requestParameters.page, requestParameters.items, requestParameters.orderBies, requestParameters.rawIncludes, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {LocalAuditLogApiApiLogsAuditsIdGetRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LocalAuditLogApi
     */
    public apiLogsAuditsIdGet(requestParameters: LocalAuditLogApiApiLogsAuditsIdGetRequest, options?: AxiosRequestConfig) {
        return LocalAuditLogApiFp(this.configuration).apiLogsAuditsIdGet(requestParameters.id, requestParameters.id2, requestParameters.idList, requestParameters.status, requestParameters.statusList, requestParameters.action, requestParameters.dataContains, requestParameters.entityTypeFullNameContains, requestParameters.entityTypeNameContains, requestParameters.tableContains, requestParameters.tablePkNameContains, requestParameters.tablePkValue, requestParameters.fromOriginContains, requestParameters.connectionId, requestParameters.transactionId, requestParameters.page, requestParameters.items, requestParameters.orderBies, requestParameters.rawIncludes, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {LocalAuditLogApiApiLogsAuditsListGetRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LocalAuditLogApi
     */
    public apiLogsAuditsListGet(requestParameters: LocalAuditLogApiApiLogsAuditsListGetRequest = {}, options?: AxiosRequestConfig) {
        return LocalAuditLogApiFp(this.configuration).apiLogsAuditsListGet(requestParameters.id, requestParameters.idList, requestParameters.status, requestParameters.statusList, requestParameters.action, requestParameters.dataContains, requestParameters.entityTypeFullNameContains, requestParameters.entityTypeNameContains, requestParameters.tableContains, requestParameters.tablePkNameContains, requestParameters.tablePkValue, requestParameters.fromOriginContains, requestParameters.connectionId, requestParameters.transactionId, requestParameters.page, requestParameters.items, requestParameters.orderBies, requestParameters.rawIncludes, options).then((request) => request(this.axios, this.basePath));
    }
}

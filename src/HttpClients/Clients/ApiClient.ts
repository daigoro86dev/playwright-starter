import { APIRequestContext, request } from '@playwright/test';
import ProjectHttpContext from '../../Common/ProjectHttpContext';
import AbstractModule from '../Modules/AbstractModule';

export default class ApiClient {
    private readonly baseUrl: string;
    private apiRequestContext?: APIRequestContext;

    constructor(baseUrl: string, apiRequestContext: APIRequestContext) {
        this.apiRequestContext = apiRequestContext;
        this.baseUrl = baseUrl;
    }

    addHeader(headerKey: string, headerValue: string) {
        ProjectHttpContext.SetHeader(headerKey, headerValue);
    }

    async setupModule<T extends AbstractModule>(module: { new (apiRequestContext: APIRequestContext): T }) {
        this.apiRequestContext = await request.newContext({ baseURL: this.baseUrl });
        return new module(this.apiRequestContext);
    }
}

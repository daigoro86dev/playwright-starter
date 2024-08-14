import { APIRequestContext, APIResponse } from '@playwright/test';
import ProjectHttpContext from '../../Common/ProjectHttpContext';
import CustomResponse from './CustomResponse';

export default class AbstractModule {
    protected apiRequestContext: APIRequestContext;

    constructor(apiRequestContext: APIRequestContext) {
        this.apiRequestContext = apiRequestContext;
    }

    protected async get(url: string, params?: Record<string, string>) {
        return await this.apiRequestContext.get(url, { params: params, headers: ProjectHttpContext.GetHeaders() });
    }

    protected async post<T>(url: string, data?: T) {
        return await this.apiRequestContext.post(url, { data: data, headers: ProjectHttpContext.GetHeaders() });
    }

    protected async put<T>(url: string, data?: T) {
        return await this.apiRequestContext.put(url, { data: data, headers: ProjectHttpContext.GetHeaders() });
    }

    protected async delete<T>(url: string, data?: T) {
        return await this.apiRequestContext.delete(url, { data: data, headers: ProjectHttpContext.GetHeaders() });
    }

    protected async getCustomResponse<T>(fn: () => Promise<APIResponse>) {
        const response = await fn();
        const customResponse = new CustomResponse<T>();
        customResponse.setStatusCode(response.status());
        customResponse.setBody(await (<T>response.json()));
        return customResponse;
    }
}

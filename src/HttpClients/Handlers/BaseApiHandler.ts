import { APIRequestContext } from '@playwright/test';
import ApiClient from '../Clients/ApiClient';
import AbstractModule from '../Modules/AbstractModule';
import { FileManager } from '../../Infrastructure/FileSystem/FileManager';
import EnvValues from '../../Infrastructure/FileSystem/EnvValues';
import CustomResponse from '../Modules/CustomResponse';
import BaseApiHandlerDependency from '../../Common/BaseApiHandlerDependency';

export default class BaseApiHandler extends BaseApiHandlerDependency {
    protected apiClient?: ApiClient;
    protected readonly envValues: EnvValues;

    constructor(public readonly apiRequestContext: APIRequestContext) {
        super(apiRequestContext);
        this.envValues = FileManager.GetEnvValues();
    }

    async setupModule<T extends AbstractModule, k>(
        m: { new (apiRequestContext: APIRequestContext): T },
        fn: (m: T) => Promise<CustomResponse<k>>,
    ) {
        return fn(await this.apiClient!.setupModule(m));
    }

    setupClient(baseURL: string) {
        this.apiClient = new ApiClient(baseURL, this.apiRequestContext);
        return this.apiClient;
    }
}

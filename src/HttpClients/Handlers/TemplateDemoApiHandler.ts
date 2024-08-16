import { APIRequestContext } from '@playwright/test';
import BaseApiHandler from './BaseApiHandler';
import TemplateDemoApiModule from '../Modules/TemplateDemoApiModule';
import UserLoginRequest from '../../Data/DTOs/UserLoginRequest';
import CustomResponse from '../Modules/CustomResponse';

export default class TemplateDemoApiHandler extends BaseApiHandler {
    constructor(readonly apiRequestContext: APIRequestContext) {
        super(apiRequestContext);
        this.apiClient = this.setupClient(`https://${this.envValues['TemplateApiBase']}`);
    }

    private async setupTemplateDemoApiModule<T>(fn: (t: TemplateDemoApiModule) => Promise<CustomResponse<T>>) {
        return await this.setupModule(TemplateDemoApiModule, async (t) => await fn(t));
    }

    async login(user: UserLoginRequest) {
        return await this.setupTemplateDemoApiModule(async (_) => await _.login(user));
    }
}

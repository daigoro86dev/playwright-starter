import BaseApiHandler from './BaseApiHandler';
import TemplateDemoApiModule from '../Modules/TemplateDemoApiModule';
import { APIRequestContext } from '@playwright/test';
import UserLoginRequest from '../../Data/DTOs/UserLoginRequest';

export default class TemplateDemoApiHandler extends BaseApiHandler {
    constructor(readonly apiRequestContext: APIRequestContext) {
        super(apiRequestContext);
        this.apiClient = this.setupClient(`https://${this.envValues['TemplateApiBase']}`);
    }

    async login(user: UserLoginRequest) {
        return await this.setupModule(TemplateDemoApiModule, async (_) => await _.login(user));
    }
}

import { APIRequestContext } from '@playwright/test';
import AbstractModule from './AbstractModule';
import UserLoginRequest from '../../Data/DTOs/UserLoginRequest';
import UserLoginResDto from '../../Data/DTOs/UserLoginResDto';

export default class TemplateDemoApiModule extends AbstractModule {
    private readonly path = 'api/v1/login';

    constructor(apiRequestContext: APIRequestContext) {
        super(apiRequestContext);
    }

    async login(user: UserLoginRequest) {
        return await this.getCustomResponse<UserLoginResDto>(async () => await this.post(`${this.path}`, user));
    }
}

import { APIRequestContext, expect } from '@playwright/test';
import BaseApiSteps from './BaseApiSteps';
import TemplateDemoApiHandler from '../HttpClients/Handlers/TemplateDemoApiHandler';
import UserLoginRequest from '../Data/DTOs/UserLoginRequest';

export default class TemplateDemoApiSteps extends BaseApiSteps {
    constructor(apiRequestContext: APIRequestContext) {
        super(apiRequestContext);
    }

    async loginuser(username: string = 'demo', password: string = 'demo') {
        await this.step('I will login through API', async () => {
            await this.run(TemplateDemoApiHandler, async (_) => {
                const user = new UserLoginRequest();

                user.username = username;
                user.password = password;
                user.long_token = false;
                const res = await _.login(user);
                expect(res.statusCode).toBe(200);
            });
        });
    }
}

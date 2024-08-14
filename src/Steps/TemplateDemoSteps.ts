import { Page } from '@playwright/test';
import BasePageSteps from './BasePageSteps';
import TemplateDemoLoginPage from '../PageObjects/TemplateDemoLoginPage';
import { UrlUtils } from '../Infrastructure/Utils/UrlUtil';

export default class TemplateDemoSteps extends BasePageSteps {
    constructor(page: Page) {
        super(page);
    }

    async goToLoginPage() {
        await this.step(`I navigate to the login page on ${UrlUtils.GetDemoUrl()}`, async () => {
            await this.run(TemplateDemoLoginPage, async (_) => {
                await _.goToLoginPage(UrlUtils.GetDemoUrl());
            });
        });
    }

    async loginuser(username: string = 'demo', password: string = 'demo') {
        await this.step('I will login', async () => {
            await this.run(TemplateDemoLoginPage, async (_) => {
                await _.enterUsername(username);
                await _.enterPassword(password);
                await _.clickLoginButton();
            });
        });
    }
}

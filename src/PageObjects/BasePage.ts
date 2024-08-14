import { Locator, Page } from '@playwright/test';
import BasePageDependency from '../Common/BasePageDependency';
import { Constants } from '../Common/Constants';

export default class BasePage extends BasePageDependency {
    constructor(public readonly page: Page) {
        super(page);
    }

    async waitForDomcontentLoaded() {
        await this.page.waitForLoadState('domcontentloaded', { timeout: Constants.globalTimeout });
    }

    async waitForNetworkIdle() {
        await this.page.waitForLoadState('networkidle', { timeout: Constants.globalTimeout });
    }

    async typeAndEnterText(locator: Locator, text: string) {
        await locator.fill(text);
        await locator.press('Enter');
    }
}

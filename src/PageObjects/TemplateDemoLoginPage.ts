import { Page } from '@playwright/test';
import BasePage from './BasePage';

export default class TemplateDemoLoginPage extends BasePage {
    private readonly usernameInput = '#username'.init(this);
    private readonly passwordInput = '#password'.init(this);
    private readonly loginButton = '.base-button.base-button--type-button.button.is-primary'.init(this);

    constructor(public readonly page: Page) {
        super(page);
    }

    async goToLoginPage(baseUrl: string) {
        await this.page.goto(`${baseUrl}/login`);
    }

    async enterUsername(username: string) {
        await this.usernameInput.fill(username);
    }

    async enterPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }
}

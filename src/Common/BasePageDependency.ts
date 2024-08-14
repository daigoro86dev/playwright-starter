import { Page } from '@playwright/test';

export default class BasePageDependency {
    constructor(public readonly page: Page) {}
}

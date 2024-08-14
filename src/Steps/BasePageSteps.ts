import { APIRequestContext, Page } from '@playwright/test';
import BasePageDependency from '../Common/BasePageDependency';
import { GenericPageConstructor } from '../Common/GenericConstructors';
import BaseSteps from './BaseSteps';
import BaseApiClientDependency from '../Common/BaseApiHandlerDependency';

export default class BasePageSteps extends BaseSteps {
    constructor(private readonly page: Page) {
        super();
    }

    static Init<T extends BasePageSteps>(this: GenericPageConstructor<T>, page: Page): T {
        return new this(page) as T;
    }

    protected async run<T extends BasePageDependency>(
        instanceType: new (page: Page) => T,
        fn: (p: T) => Promise<void>,
    ): Promise<void> {
        await fn(new instanceType(this.page));
    }

    protected async runPageApiHandler<T extends BaseApiClientDependency>(
        instanceType: new (apiRequestContext: APIRequestContext) => T,
        fn: (p: T) => Promise<void>,
    ): Promise<void> {
        await fn(new instanceType(this.page.context().request));
    }

    protected getPage() {
        return this.page;
    }
}

import { APIRequestContext } from '@playwright/test';
import BaseSteps from './BaseSteps';
import { GenericApiClientConstructor } from '../Common/GenericConstructors';
import BaseApiClientDependency from '../Common/BaseApiHandlerDependency';

export default class BaseApiSteps extends BaseSteps {
    constructor(private readonly apirequestContext: APIRequestContext) {
        super();
    }

    static Init<T extends BaseApiSteps>(this: GenericApiClientConstructor<T>, apiRequestContext: APIRequestContext): T {
        return new this(apiRequestContext) as T;
    }

    protected async run<T extends BaseApiClientDependency>(
        instanceType: new (apiRequestContext: APIRequestContext) => T,
        fn: (p: T) => Promise<void>,
    ): Promise<void> {
        await fn(new instanceType(this.apirequestContext));
    }
}

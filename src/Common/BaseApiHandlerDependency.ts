import { APIRequestContext } from '@playwright/test';

export default class BaseApiHandlerDependency {
    constructor(public readonly context: APIRequestContext) {}
}

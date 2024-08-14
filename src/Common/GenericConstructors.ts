import { APIRequestContext, Page } from '@playwright/test';

export type GenericPageConstructor<T> = { new (page: Page): T };
export type GenericApiClientConstructor<T> = { new (apiRequestContext: APIRequestContext): T };

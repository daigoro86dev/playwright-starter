import { test as base, mergeTests } from '@playwright/test';
import { testManagementFixture } from './TestManagementFixture';
import { plainToInstance } from 'class-transformer';
import TemplateTestParams from '../Data/TestParams/TemplateTestParams.json.json';
import TestParamsMapper from '../Data/Setup/TestParamsMapper';
import TemplateDemoApiSteps from '../Steps/TemplateDemoApiSteps';

type TemplateFixtureApi = {
    _: {
        templateDemoApiSteps: TemplateDemoApiSteps;
    };
};

const test = mergeTests(
    base.extend<TemplateFixtureApi>({
        _: async ({ request }, use) => {
            await use({
                templateDemoApiSteps: TemplateDemoApiSteps.Init(request),
            });
        },
    }),
    testManagementFixture,
);

const testParams = plainToInstance(TestParamsMapper, TemplateTestParams);

export { test, testParams };

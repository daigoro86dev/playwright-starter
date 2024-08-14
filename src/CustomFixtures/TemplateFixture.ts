import { test as base, mergeTests } from '@playwright/test';
import { testManagementFixture } from './TestManagementFixture';
import { plainToInstance } from 'class-transformer';
import TemplateTestParams from '../Data/TestParams/TemplateTestParams.json.json';
import TemplateDemoSteps from '../Steps/TemplateDemoSteps';
import TestParamsMapper from '../Data/Setup/TestParamsMapper';

type TemplateFixture = {
    _: {
        templateDemoSteps: TemplateDemoSteps;
    };
};

const test = mergeTests(
    base.extend<TemplateFixture>({
        _: async ({ page }, use) => {
            await use({
                templateDemoSteps: TemplateDemoSteps.Init(page),
            });
        },
    }),
    testManagementFixture,
);

const testParams = plainToInstance(TestParamsMapper, TemplateTestParams);

export { test, testParams };

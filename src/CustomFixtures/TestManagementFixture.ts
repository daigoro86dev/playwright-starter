import { test as base } from '@playwright/test';
import {} from '../Infrastructure/Utils/StringExtensions/TestTitleExtensions';
import {} from '../Infrastructure/Utils/StringExtensions/PageObjectLocatorExtensions';
import {} from '../Infrastructure/Utils/StringExtensions/GenericExtensions';

import TestManagementSteps from '../Steps/TestManagementSteps';

type TestManagementFixture = {
    testManagementSteps: TestManagementSteps;
};

export const testManagementFixture = base.extend<TestManagementFixture>({
    testManagementSteps: async ({ page }, use) => {
        const testManagementSteps = TestManagementSteps.Init();
        await testManagementSteps.getTestInfo(testManagementFixture.info()).tags();
        testManagementSteps.getTestPage(page);
        await use(testManagementSteps);
    },
});

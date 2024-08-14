import { test, testParams } from '../src/CustomFixtures/TemplateFixtureApi';

test.beforeEach(async ({ testManagementSteps }) => {
    await testManagementSteps.suite('Template - Demo API Tests');
});

test.afterEach(async ({ testManagementSteps }) => {
    await testManagementSteps.addTestDataToReporter();
});

'Login user'.exec((s) => {
    s.runLoop(testParams, async (p) => {
        test(s.setTitle(p), { tag: ['@TemplateDemoAPI'] }, async ({ _ }) => {
            await _.templateDemoApiSteps.loginuser();
        });
    });
});

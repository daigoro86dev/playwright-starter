import { test, testParams } from '../src/CustomFixtures/TemplateFixtureApi';

test.beforeEach(async ({ testManagementSteps }) => {
    await testManagementSteps.suite('Template - Demo API Tests');
});

test.afterEach(async ({ testManagementSteps }) => {
    await testManagementSteps.addTestDataToReporter();
});

test.describe('API Tests', async () => {
    'Login User API'.exec((s) => {
        s.runLoop(testParams, async (p) => {
            test(s.setTitle(p), { tag: ['@TemplateDemo'] }, async ({ _ }) => {
                await test.step('Login through API', async () => {
                    await _.templateDemoApiSteps.loginuser();
                });
            });
        });
    });
});

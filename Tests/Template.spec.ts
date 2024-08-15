import { test, testParams } from '../src/CustomFixtures/TemplateFixture';

test.beforeEach(async ({ testManagementSteps }) => {
    await testManagementSteps.suite('Template - Demo Tests');
});

test.afterEach(async ({ testManagementSteps }) => {
    await testManagementSteps.takeScreenShotOnFailure();
    await testManagementSteps.addTestDataToReporter();
});

'Login user'.exec((s) => {
    s.runLoop(testParams, async (p) => {
        test(s.setTitle(p), { tag: ['@TemplateDemo'] }, async ({ _ }) => {
            await _.templateDemoSteps.goToLoginPage();
            await _.templateDemoSteps.loginuser(p.username, p.password);
        });
    });
});

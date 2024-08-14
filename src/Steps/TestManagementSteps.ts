import { Page, TestInfo } from '@playwright/test';
import BaseSteps from './BaseSteps';
import ProjectUiContext from '../Common/ProjectUiContext';

export default class TestManagementSteps extends BaseSteps {
    private testInfo?: TestInfo;
    private page?: Page;

    constructor() {
        super();
    }

    static Init() {
        return new this();
    }

    getTestInfo(testInfo: TestInfo) {
        this.testInfo = testInfo;
        return this;
    }

    getTestPage(page: Page) {
        this.page = page;
        return this;
    }

    async addTestDataToReporter() {
        if (process.env.PW_EXPORT_DATA === '1') {
            await this.step(`Including export with test data for test with ID: ${this.testInfo?.testId}`, async () => {
                const testDataSpecs = BaseSteps.TestDataOutputUtils.OutputData(this.testInfo!);
                await this.setAttachment(testDataSpecs.path, testDataSpecs.output, { contentType: 'application/json' });
            });
        }
    }

    async suite(suite: string) {
        await this.setSuite(suite);
    }

    async tags() {
        await this.setTags(...this.testInfo!.tags);
    }

    cleanStoreValues() {
        ProjectUiContext.CleanStoreValues();
    }

    exportTestDataToJson() {
        BaseSteps.TestDataOutputUtils.OutputDataToJson(this.testInfo!);
    }

    async takeScreenShotOnFailure() {
        if (this.testInfo?.status !== this.testInfo?.expectedStatus && process.env.PW_SCREENSHOT_ON_FAIL !== '0') {
            await this.step(`Taking Full Page sreenshot for test with ID: ${this.testInfo?.testId}`, async () => {
                await this.setAttachment(
                    `${this.testInfo?.testId}.png`,
                    await this.page!.screenshot({ fullPage: true }),
                    {
                        contentType: 'image/png',
                    },
                );
            });
        }
    }
}

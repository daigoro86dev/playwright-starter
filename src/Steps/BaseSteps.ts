import { AttachmentOptions, ContentType } from 'allure-js-commons';
import { StatusCodes } from 'http-status-codes';
import { EnvManager } from '../Infrastructure/Env/EnvManager';
import { FileManager } from '../Infrastructure/FileSystem/FileManager';
import ArrayUtils from '../Infrastructure/Utils/ArrayUtils';
import ExpectUtils from '../Infrastructure/Utils/ExpectUtils';
import FakeDataUtils from '../Infrastructure/Utils/FakeDataUtils';
import ReporterAllureUtils from '../Infrastructure/Utils/ReporterAllureUtils';
import TestDataOutputUtils from '../Infrastructure/Utils/TestDataOutputUtils';
import TimeUtils from '../Infrastructure/Utils/TimeUtils';
import { UrlUtils } from '../Infrastructure/Utils/UrlUtil';
import { UiContextValues } from '../Common/UiContextValues';
import ProjectUiContext from '../Common/ProjectUiContext';

export default class BaseSteps {
    private static Allure: ReporterAllureUtils;
    public static TimeUtils = TimeUtils;
    public static StatusCodes = StatusCodes;
    public static FileManager = FileManager;
    public static FakeDataUtils = FakeDataUtils;
    public static ArrayUtils = ArrayUtils;
    public static TestDataOutputUtils = TestDataOutputUtils;
    public static UrlUtils = UrlUtils;

    constructor() {}

    private static async GetAllure(fn: (a: ReporterAllureUtils) => Promise<void>): Promise<void> {
        if (!BaseSteps.Allure) {
            BaseSteps.Allure = new ReporterAllureUtils();
        }

        return await fn(BaseSteps.Allure);
    }

    protected getStoreVal<T>(key: UiContextValues) {
        return ProjectUiContext.GetInstance().getStoreVal<T>(key);
    }

    protected setStoreKeyVal<T>(key: UiContextValues, value: T) {
        return ProjectUiContext.GetInstance().setStoreKeyVal<T>(key, value);
    }

    protected getStoreMap() {
        return ProjectUiContext.GetInstance().getStoreMap();
    }

    protected async expectToPass(fn: () => Promise<void>) {
        await ExpectUtils.ExpectToPass(fn);
    }

    protected getExpectTimeout() {
        return BaseSteps.TimeUtils.SetRetryTimeout();
    }

    protected getExpectIntervals() {
        return BaseSteps.TimeUtils.SetRetryIntervals();
    }

    protected getEnv() {
        return EnvManager.GetEnv();
    }

    protected async step<T>(name: string, body: () => Promise<T>) {
        await BaseSteps.GetAllure((a) => a.step(name, body));
    }

    protected async setSuite(suite: string) {
        await BaseSteps.GetAllure((a) => a.suite(suite));
    }

    protected async setTags(...values: string[]) {
        await BaseSteps.GetAllure((a) => a.tags(...values));
    }

    protected async setAttachment(
        name: string,
        content: Buffer | string,
        options: ContentType | string | Pick<AttachmentOptions, 'contentType'>,
    ) {
        await BaseSteps.GetAllure((a) => a.attachment(name, content, options));
    }

    protected checkIsEmptyOrNull(text: string) {
        return text === '' || text === undefined || text === null;
    }
}

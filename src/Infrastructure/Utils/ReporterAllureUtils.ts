import { AttachmentOptions, ContentType } from 'allure-js-commons';
import { allure } from 'allure-playwright';

export default class ReporterAllureUtils {
    async step<T>(name: string, body: () => Promise<T>) {
        await allure.step(name.format(), body);
    }

    async attachment(
        name: string,
        content: Buffer | string,
        options: ContentType | string | Pick<AttachmentOptions, 'contentType'>,
    ) {
        await allure.attachment(name, content, options);
    }

    async suite(name: string) {
        await allure.suite(name);
    }

    async tags(...values: string[]) {
        await allure.tags(...values);
    }

    async parameter(paramName: string, paramValue: unknown) {
        await allure.parameter(paramName, paramValue);
    }
}

import { Locator, expect } from '@playwright/test';
import TimeUtils from './TimeUtils';

export default class ExpectUtils {
    static async VerifyText(textLocator: Locator, message: string) {
        expect((await textLocator.textContent())?.clearWhiteSpace()).toEqual(message);
    }

    static async ExpectToPass(fn: () => Promise<void>) {
        await expect(fn).toPass({
            intervals: TimeUtils.SetRetryIntervals(),
            timeout: TimeUtils.SetRetryTimeout(),
        });
    }

    static async ExpectNotToPass(fn: () => Promise<void>) {
        await expect(fn).not.toPass({
            intervals: TimeUtils.SetRetryIntervals(),
            timeout: TimeUtils.SetRetryTimeout(),
        });
    }
}

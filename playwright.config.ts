import { defineConfig, devices } from '@playwright/test';
import { testPlanFilter } from 'allure-playwright/dist/testplan';
import { Constants } from './src/Common/Constants';

/**
 * See https://playwright.dev/docs/test-configuration.
 */

export default defineConfig({
    testDir: './Tests',
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.PW_RETRIES ? parseInt(process.env.PW_RETRIES) : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.PW_WORKERS ? parseInt(process.env.PW_WORKERS) : 1,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    grep: testPlanFilter(),
    timeout: Constants.globalTimeout,
    expect: {
        timeout: Constants.expectTimeout,
    },
    reporter: [
        process.env.USE_ALLURE === '1'
            ? [
                  'allure-playwright',
                  {
                      detail: true,
                      suiteTitle: false,
                      environmentInfo: {
                          tag: process.env.PW_TAG,
                          environment: process.env.ENV,
                      },
                  },
              ]
            : ['null'],
    ],
    use: {
        trace: process.env.PW_TRACE === '1' ? 'on-all-retries' : 'off',
        defaultBrowserType: 'chromium',
        launchOptions: {
            args: [
                '--enable-automation',
                '--no-sandbox',
                '--disable-setuid-sandbox',
                process.env.PW_SCREENSHOT_ON_FAIL === '0' ? '--disable-gl-drawing-for-tests' : '--use-gl=egl',
            ],
        },
        actionTimeout: Constants.expectTimeout,
        navigationTimeout: Constants.expectTimeout,
    },
    projects: [
        {
            name: 'chrome',
            use: {
                ...devices['Desktop Chrome'],
                viewport: { width: 1920, height: 1080 },
            },
        },
        {
            name: 'firefox',
            use: {
                ...devices['Desktop Firefox'],
                viewport: { width: 1920, height: 1080 },
            },
        },
        {
            name: 'edge',
            use: {
                ...devices['Desktop Edge'],
                viewport: { width: 1920, height: 1080 },
            },
        },
        {
            name: 'api',
            use: {
                launchOptions: {
                    headless: true,
                    args: [
                        '--enable-automation',
                        '--no-sandbox',
                        '--disable-setuid-sandbox',
                        '--disable-gl-drawing-for-tests',
                    ],
                },
            },
        },
    ],
});

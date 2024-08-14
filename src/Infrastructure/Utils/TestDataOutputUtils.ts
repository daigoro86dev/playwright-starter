import { writeFile } from 'node:fs';
import { TestInfo } from '@playwright/test';
import ProjectUiContext from '../../Common/ProjectUiContext';
import { EnvManager } from '../Env/EnvManager';

export default class TestDataOutputUtils {
    private static ConvertTSMapToJSObj(tsMap: Map<string, unknown>) {
        const jsObj = {};
        tsMap.forEach(function (value, key) {
            jsObj[key] = value;
        });
        return jsObj;
    }

    private static PrepareData(testInfo: TestInfo) {
        const map = ProjectUiContext.GetInstance().getStoreMap();
        const data = {
            testTitle: `${testInfo.title}`,
            env: EnvManager.GetEnv(),
            testStatus: testInfo.status,
            testData: TestDataOutputUtils.ConvertTSMapToJSObj(map),
        };
        return data;
    }

    static OutputData(testInfo: TestInfo) {
        const data = TestDataOutputUtils.PrepareData(testInfo);
        const output = JSON.stringify(data);

        return {
            path: `TestDataExports/${data.testTitle}_${testInfo.testId}.json`,
            output,
        };
    }

    static OutputDataToJson(testInfo: TestInfo) {
        const data = TestDataOutputUtils.OutputData(testInfo);
        writeFile(data.path, data.output, (err) => {
            if (err) {
                console.log('Error writing data file:', err);
            } else {
                console.log('Successfully wrote data file');
            }
        });
    }
}

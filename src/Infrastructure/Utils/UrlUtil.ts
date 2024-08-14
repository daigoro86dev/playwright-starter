import { FileManager as FM } from '../FileSystem/FileManager';

export class UrlUtils {
    static GetDemoUrl() {
        return `https://${FM.GetEnvValues()?.DemoUrl}`;
    }
}

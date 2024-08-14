import { EnvManager } from '../Env/EnvManager';
import FileLibrary from './FileLibrary';
import { plainToInstance } from 'class-transformer';
import EnvValues from './EnvValues';

export class FileManager {
    static GetEnvValues() {
        const env = EnvManager.GetEnv();
        switch (env) {
            case 'demo':
                return plainToInstance(EnvValues, FileLibrary.GetFile().DemoValues);
            default:
                return plainToInstance(EnvValues, FileLibrary.GetFile().DemoValues);
        }
    }
}

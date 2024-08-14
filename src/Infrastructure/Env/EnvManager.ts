import { Environments } from './Environments';

export class EnvManager {
    constructor() {}

    static GetEnv() {
        return process.env.NODE_ENV || Environments.demo;
    }
}

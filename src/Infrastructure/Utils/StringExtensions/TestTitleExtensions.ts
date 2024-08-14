import { plainToInstance } from 'class-transformer';
import ParamInstance from '../../../Data/Setup/ParamInstance';
import TestParamsMapper from '../../../Data/Setup/TestParamsMapper';
import { EnvManager } from '../../Env/EnvManager';

declare global {
    interface String {
        exec(fn: (s: string) => void): void;
        setTitle(params: ParamInstance): string;
        runLoop(testParams: TestParamsMapper, fn: (s: ParamInstance) => Promise<void>): void;
    }
}

String.prototype.exec = function (fn: (s: string) => void): void {
    const s: string = String(this);
    return fn(s);
};

String.prototype.runLoop = async function (
    testParams: TestParamsMapper,
    fn: (p: ParamInstance) => Promise<void>,
): Promise<void> {
    const s: string = String(this);
    testParams.params![s as keyof typeof testParams].forEach(async (p) => {
        const i = plainToInstance(ParamInstance, p);
        await fn(i);
    });
};

String.prototype.setTitle = function (params: ParamInstance): string {
    const s: string = String(this);
    let paramValues = '';
    const env = EnvManager.GetEnv();

    Object.values(params).forEach((v) => (paramValues += ` ${v} `));

    return `${s} - ${paramValues} - ${env}`;
};

export {};

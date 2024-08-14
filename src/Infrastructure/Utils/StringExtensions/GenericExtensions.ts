import moment from 'moment';

declare global {
    interface String {
        clearWhiteSpace(): string;
        format(...args: string[]): string;
        parseDate(format: string): moment.Moment;
        concatStringArray(stringArray: string[]): string;
    }
}

String.prototype.clearWhiteSpace = function (): string {
    const s: string = String(this);
    return s.replace(/\s+/g, ' ').trim();
};

String.prototype.format = function (...args: string[]): string {
    const s: string = String(this);
    return s.replace(/{(\d+)}/g, (match, num) => {
        return typeof args[num] !== 'undefined' ? args[num] : match;
    });
};

String.prototype.parseDate = function (format: string): moment.Moment {
    const s: string = String(this);
    return moment(s, format);
};

String.prototype.concatStringArray = function (stringArray: string[]): string {
    const s: string = String(this);
    let concatValue = '';
    for (let i = 0; i < stringArray.length; i++) {
        concatValue =
            i !== stringArray.length - 1
                ? concatValue.concat(`${stringArray[i]},`)
                : (concatValue = concatValue.concat(`${stringArray[i]}`));
    }
    return s.concat(concatValue);
};

export {};

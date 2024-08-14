import moment from 'moment';
import { Constants } from '../../Common/Constants';

export default class TimeUtils {
    static SetRetryIntervals() {
        return [3_000, 5_000, 7_000];
    }

    static SetRetryTimeout() {
        return Constants.expectTimeout;
    }

    static SetWaitTimeout() {
        return Constants.expectTimeout;
    }

    static FormatDate(date: Date, format: string) {
        return moment(date).format(format);
    }

    static GetFutureDate(months: number, format: string = 'DD/MM/YYYY') {
        const futureTimeStamp = moment().add(months, 'months').calendar();
        return moment(futureTimeStamp).format(format);
    }

    static ParseDate(date: string, format: string) {
        return moment(date, format);
    }
}

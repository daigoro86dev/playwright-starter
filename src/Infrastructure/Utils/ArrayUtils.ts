export default class ArrayUtils {
    static CheckIsEmptyOrNull<T>(array: T[]) {
        return array.length === 0 || array === null;
    }
}

export default class CustomResponse<T> {
    public statusCode?: number;
    public body?: Awaited<T>;
    public text?: string;

    public setBody(body: Awaited<T>) {
        this.body = body;
    }

    public setStatusCode(statusCode: number) {
        this.statusCode = statusCode;
    }

    public setText(text: string) {
        this.text = text;
    }
}

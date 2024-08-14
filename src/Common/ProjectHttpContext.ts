export default class ProjectHttpContext {
    private static instance: ProjectHttpContext;

    private static readonly headers: { [key: string]: string };

    constructor() {}

    public static GetInstance(): ProjectHttpContext {
        if (!ProjectHttpContext.instance) {
            ProjectHttpContext.instance = new ProjectHttpContext();
        }

        return ProjectHttpContext.instance;
    }

    static GetHeaders() {
        return ProjectHttpContext.headers;
    }

    static GetHeader(headerKey: string) {
        return ProjectHttpContext.headers[headerKey];
    }

    static SetHeader(headerKey: string, headerValue: string) {
        ProjectHttpContext.headers[headerKey] = headerValue;
    }
}

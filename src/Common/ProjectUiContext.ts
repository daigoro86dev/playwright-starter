import { UiContextValues } from './UiContextValues';

export default class ProjectUiContext {
    private static store: Map<string, unknown> = new Map();
    private static instance: ProjectUiContext;

    constructor() {}

    public static GetInstance(): ProjectUiContext {
        if (!ProjectUiContext.instance) {
            ProjectUiContext.instance = new ProjectUiContext();
        }

        return ProjectUiContext.instance;
    }

    public static CleanStoreValues() {
        ProjectUiContext.store.clear();
    }

    setStoreKeyVal<T>(key: UiContextValues, value: T) {
        ProjectUiContext.store.set(key, value);
        return ProjectUiContext.GetInstance();
    }

    getStoreVal<T>(key: UiContextValues) {
        return ProjectUiContext.store.get(key) as T;
    }

    getStoreMap() {
        return ProjectUiContext.store;
    }
}

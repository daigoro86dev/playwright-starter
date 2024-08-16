import { UiContextValues } from './UiContextValues';

export default class ProjectDataStore {
    private static store: Map<string, unknown> = new Map();
    private static instance: ProjectDataStore;

    constructor() {}

    public static GetInstance(): ProjectDataStore {
        if (!ProjectDataStore.instance) {
            ProjectDataStore.instance = new ProjectDataStore();
        }

        return ProjectDataStore.instance;
    }

    public static CleanStoreValues() {
        ProjectDataStore.store.clear();
    }

    setStoreKeyVal<T>(key: UiContextValues, value: T) {
        ProjectDataStore.store.set(key, value);
        return ProjectDataStore.GetInstance();
    }

    getStoreVal<T>(key: UiContextValues) {
        return ProjectDataStore.store.get(key) as T;
    }

    getStoreMap() {
        return ProjectDataStore.store;
    }
}

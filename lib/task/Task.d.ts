export declare class Task {
    key: string;
    path: string;
    content: string;
    overridable: boolean;
    constructor(key: any, path: any, content: any, overridable: any);
    setPath(path: any): void;
    setContent(content: any): void;
    setOverridable(overridable: any): void;
    generate(): void;
    execute(): void;
}

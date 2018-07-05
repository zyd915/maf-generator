import { Task } from './Task';
export declare class SchemaTask extends Task {
    constructor(path: any, content: any, overridable: any);
    static renderContent(content: any): string;
}

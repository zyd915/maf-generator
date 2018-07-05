import { Builder } from "./builder/Builder";
import { DB } from "./db/DB";
export declare class Generator {
    config: any;
    builder: Builder;
    db: DB;
    constructor(rootPath: any, config: any);
    getTasks(): Promise<false | any[]>;
    generator(): Promise<void>;
}

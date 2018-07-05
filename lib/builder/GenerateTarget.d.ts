import { Configuration } from "./Configuration";
import { Entity } from "../model/Entity";
import { Target } from "./configuration/Target";
import { ParamKey } from "./configuration/Strategy";
export declare class GenerateTarget {
    rootPath: string;
    configuration: Configuration;
    key: string;
    enable: boolean;
    statically: boolean;
    overridable: boolean;
    entity: Entity;
    target: Target;
    context: {};
    keyContext: ParamKey[];
    path: string;
    content: string;
    constructor(configuration: any, target: any, entity: any, rootPath: any);
    _context(): {
        authorInfo?: undefined;
        project?: undefined;
        module?: undefined;
        submodule?: undefined;
        entitykey?: undefined;
        entity?: undefined;
        table?: undefined;
    } | {
        authorInfo: any;
        project: any;
        module: any;
        submodule: any;
        entitykey: any;
        entity: Entity;
        table: string;
    };
    _keyContext(): any[];
    renderKey(content: any): any;
    _path(): string;
    _content(): any;
}

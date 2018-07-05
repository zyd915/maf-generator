import { Configuration } from "./Configuration";
import { GenerateTarget } from "./GenerateTarget";
export declare class Builder {
    configuration: Configuration;
    generateTargets: GenerateTarget[];
    rootPath: string;
    constructor(config: any, rootPath: any);
    loadGenerateTarget(entitys: any): any;
}

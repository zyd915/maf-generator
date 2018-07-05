export declare class Target {
    key: string;
    overridable: boolean;
    targetRoot: string;
    targetModule: string;
    targetPackage: string;
    fileName: string;
    fileType: string;
    prefix: string;
    suffix: string;
    template: string;
    enable: boolean;
    statically: boolean;
    dependencies: string[];
    constructor(key: any, overridable: any, targetRoot: any, targetModule: any, targetPackage: any, fileName: any, fileType: any, prefix: any, suffix: any, template: any, enable: any, statically: any, dependencies: any);
    getFileName(): string;
    static parseJson(json: any): any;
    static initTargets(targetsConfig: any): any;
}

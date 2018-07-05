export declare class ParamKey {
    key: string;
    value: any;
    dynamic: boolean;
    constructor(key: any, value: any, dynamic: any);
    setValue(value: any): void;
    getValue(): any;
    render(content: any): any;
    static parseJson(json: any): any;
}
export declare class TableConfig {
    prefix: string;
    projectSplit: string;
    moduleSplit: string;
    separator: string;
    constructor(prefix: any, projectSplit: any, moduleSplit: any, separator: any);
    getProject(tableName: any): string;
    getModule(tableName: any): string;
    getEntity(tableName: any): any;
    static parseJson({ prefix, projectSplit, moduleSplit, separator }: {
        prefix: any;
        projectSplit: any;
        moduleSplit: any;
        separator: any;
    }): TableConfig;
}
export declare class GenterateTable {
    tablePrefix: string;
    includes: string[];
    excludes: string[];
    constructor(tablePrefix?: string, includes?: any[], excludes?: any[]);
    setTablePrefix(tablePrefix: any): void;
    setIncludes(includes: any): void;
    setExcludes(excludes: any): void;
    getRemainTables(tables: any): {}[];
    getRemainEntities(entities: any): {}[];
    static parseJson({ tablePrefix, includes, excludes }: {
        tablePrefix: any;
        includes: any;
        excludes: any;
    }): GenterateTable;
}
export declare class Strategy {
    fileOverridable: string;
    camelCase: boolean;
    project: string;
    module: string;
    paramKeys: ParamKey[];
    tableConfig: TableConfig;
    generateTable: GenterateTable;
    constructor(fileOverridable: any, camelCase: any, project: any, module: any, paramKeys: any, tableConfig: any, generateTable: any);
    renderCamelCase(value: any, firstUpper?: boolean): any;
    getProject(tableName: any): string;
    getModule(): string;
    getSubModel(tableName: any): string;
    getEntity(tableName: any): any;
    static parseJson({ fileOverridable, camelCase, project, module, paramKey, tableConfig, generateTable }: {
        fileOverridable: any;
        camelCase: any;
        project: any;
        module: any;
        paramKey: any;
        tableConfig: any;
        generateTable: any;
    }): Strategy;
}

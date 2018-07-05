export declare class DB {
    instance: any;
    constructor(datasource: any);
    execute(sql: any, params: any): Promise<any>;
    query(sql: any, params?: any): Promise<any>;
}

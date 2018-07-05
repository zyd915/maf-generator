import { DB } from './DB';
export declare class QuerySchema {
    dbType: string;
    tablesSql: string;
    tableCommentsSql: string;
    tableFieldsSql: string;
    tableName: string;
    tableComment: string;
    fieldName: string;
    fieldType: string;
    fieldComment: string;
    fieldKey: string;
    constructor(dbType: any, tablesSql: any, tableCommentsSql: any, tableFieldsSql: any, tableName: any, tableComment: any, fieldName: any, fieldType: any, fieldComment: any, fieldKey: any);
    getTables(db: DB): Promise<any[]>;
}
export declare const MysqlSchema: QuerySchema;

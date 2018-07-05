export declare class Column {
    name: string;
    type: string;
    defaultValue: string;
    primary: boolean;
    unique: boolean;
    notnull: boolean;
    comment: string;
    constructor(name: any, type: any, defaultValue: any, primary: any, unique: any, notnull: any, comment: any);
    static parseFromDB({ Field, Type, Null, Key, Default, Comment }: {
        Field: any;
        Type: any;
        Null: any;
        Key: any;
        Default: any;
        Comment: any;
    }): Column;
    static parseJson(json: any): any;
}
export declare class Table {
    name: string;
    comment: string;
    columns: Column[];
    constructor(name: any, comment: any, columns?: any);
    setColumns(columns: any): void;
    static parseJson(json: any): any;
}

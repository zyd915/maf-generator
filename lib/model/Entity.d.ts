import { Strategy } from "../builder/configuration/Strategy";
export declare class Field {
    name: string;
    type: string;
    comment: string;
    columnName: string;
    columnType: string;
    columnLen: number;
    isPrimary: boolean;
    isUnique: boolean;
    isNotNull: boolean;
    isDeleteKey: boolean;
    isBaseKey: boolean;
    isConvert: boolean;
    isDate: boolean;
    constructor(name: any, type: any, comment: any, columnName: any, columnType: any, isPrimary: any, isUnique: any, isNotNull: any);
    getColumnLen(): any;
    _isDeleteKey(): boolean;
    _isBaseKey(): boolean;
    _isConvert(): boolean;
    _isDate(): boolean;
    static parseJson(json: any, strategy: Strategy): any;
}
export declare class Entity {
    project: string;
    module: string;
    name: string;
    tableName: string;
    comment: string;
    fields: Field[];
    constructor(tableName: any, comment: any, fields: any, strategy: Strategy);
    static parseJson(json: any, strategy: Strategy): any;
}

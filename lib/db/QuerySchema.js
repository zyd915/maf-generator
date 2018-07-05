"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const util = require("util");
const schema_1 = require("../model/schema");
class QuerySchema {
    constructor(dbType, tablesSql, tableCommentsSql, tableFieldsSql, tableName, tableComment, fieldName, fieldType, fieldComment, fieldKey) {
        this.dbType = dbType;
        this.tablesSql = tablesSql;
        this.tableCommentsSql = tableCommentsSql;
        this.tableFieldsSql = tableFieldsSql;
        this.tableName = tableName;
        this.tableComment = tableComment;
        this.fieldName = fieldName;
        this.fieldType = fieldType;
        this.fieldComment = fieldComment;
        this.fieldKey = fieldKey;
    }
    getTables(db) {
        return __awaiter(this, void 0, void 0, function* () {
            let that = this;
            let getFields = function (table) {
                return __awaiter(this, void 0, void 0, function* () {
                    let tableFieldsSql = util.format(that.tableFieldsSql, table.name);
                    let fields = yield db.query(tableFieldsSql);
                    let columns = [];
                    for (let fieldItem of fields) {
                        columns.push(schema_1.Column.parseFromDB(fieldItem));
                    }
                    return columns;
                });
            };
            let tableInfos = yield db.query(this.tableCommentsSql);
            let tables = [];
            for (let item of tableInfos) {
                let table = new schema_1.Table(item[this.tableName], item[this.tableComment]);
                table.setColumns(yield getFields(table));
                tables.push(table);
            }
            return tables;
        });
    }
    ;
}
exports.QuerySchema = QuerySchema;
exports.MysqlSchema = new QuerySchema("mysql", "show tables", "show table status", "show full fields from %s", "Name", "Comment", "Field", "Type", "Comment", "Key");

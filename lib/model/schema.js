"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const json_ = require("../util/json_");
class Column {
    constructor(name, type, defaultValue, primary, unique, notnull, comment) {
        this.name = name;
        this.type = type;
        this.defaultValue = defaultValue;
        this.primary = primary;
        this.unique = unique;
        this.notnull = notnull;
        this.comment = comment;
    }
    static parseFromDB({ Field, Type, Null, Key, Default, Comment }) {
        return new Column(Field, Type, Default, Key.indexOf('PRI') > -1, Key.indexOf('UNI') > -1, Null.indexOf('NO') > -1, Comment);
    }
    static parseJson(json) {
        return json_.parseJsonRender(json, function ({ name, type, defaultValue, primary, unique, notnull, comment }) {
            return new Column(name, type, defaultValue, primary, unique, notnull, comment);
        });
    }
}
exports.Column = Column;
class Table {
    constructor(name, comment, columns) {
        this.name = name;
        this.comment = comment;
        this.columns = columns;
    }
    setColumns(columns) {
        this.columns = columns;
    }
    static parseJson(json) {
        return json_.parseJsonRender(json, function ({ name, comment, columns }) {
            return new Table(name, comment, Column.parseJson(columns));
        });
    }
}
exports.Table = Table;

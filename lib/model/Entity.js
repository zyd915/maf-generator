"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const json_ = require("../util/json_");
const key = {
    base: ['create_by', 'create_time', 'update_by', 'update_time', 'delete_flag'],
    delete: 'delete_flag',
};
const Type = {
    char: 'Character',
    varchar: 'String',
    text: 'String',
    int: 'Integer',
    bigint: 'Long',
    float: 'Float',
    double: 'Double',
    decimal: 'BigDecimal',
    date: 'Date',
    datetime: 'Date',
    tinyint: 'Boolean',
    blob: 'Blob',
};
const getPrecisionScale = function (value) {
    const numRegex = new RegExp('.*\((.*)\).*');
    if (!numRegex.test(value))
        return false;
    value = value.match(numRegex)[1];
    let precision, scale;
    if (!isNaN(value)) {
        precision = value;
    }
    else {
        if (value.indexOf(',') > -1) {
            precision = value.split(',')[0];
            scale = value.split(',')[1];
        }
    }
    precision = !isNaN(precision) ? parseInt(precision) : precision;
    scale = !isNaN(scale) ? parseInt(scale) : scale;
    return [precision, scale];
};
const parseType = function (type) {
    let fieldType = type;
    for (let key in Type) {
        if (type.startsWith(key)) {
            fieldType = Type[key];
            let precisionScale = getPrecisionScale(type);
            if (key === 'int' && precisionScale && precisionScale[0] > 11) {
                fieldType = Type.bigint;
            }
        }
    }
    return fieldType;
};
class Field {
    constructor(name, type, comment, columnName, columnType, isPrimary, isUnique, isNotNull) {
        this.name = name;
        this.type = type;
        this.comment = comment;
        this.columnName = columnName;
        this.columnType = columnType;
        this.columnLen = this.getColumnLen();
        this.isPrimary = isPrimary;
        this.isUnique = isUnique;
        this.isNotNull = isNotNull;
        this.isDeleteKey = this._isDeleteKey();
        this.isBaseKey = this._isBaseKey();
        this.isConvert = this._isConvert();
        this.isDate = this._isDate();
    }
    getColumnLen() {
        let precisionScale = getPrecisionScale(this.columnType);
        return precisionScale ? precisionScale[0] : undefined;
    }
    _isDeleteKey() {
        return key.delete === this.columnName;
    }
    _isBaseKey() {
        return key.base.indexOf(this.columnName) > -1;
    }
    _isConvert() {
        return this.name === this.columnName;
    }
    _isDate() {
        return this.type === 'Date';
    }
    static parseJson(json, strategy) {
        return json_.parseJsonRender(json, function ({ name, type, primary, unique, notnull, comment }) {
            return new Field(strategy.renderCamelCase(name), parseType(type), comment, name, type, primary, unique, notnull);
        });
    }
}
exports.Field = Field;
class Entity {
    constructor(tableName, comment, fields, strategy) {
        this.project = strategy.getProject(tableName);
        this.module = strategy.getModule();
        this.name = strategy.getEntity(tableName);
        this.tableName = tableName;
        this.comment = comment;
        this.fields = fields;
    }
    static parseJson(json, strategy) {
        return json_.parseJsonRender(json, function ({ name, comment, columns }) {
            return new Entity(name, comment, Field.parseJson(columns, strategy), strategy);
        });
    }
}
exports.Entity = Entity;

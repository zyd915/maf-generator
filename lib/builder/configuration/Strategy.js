"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_ = require("../../util/check_");
const json_ = require("../../util/json_");
const str_ = require("../../util/str_");
const array_ = require("../../util/array_");
class ParamKey {
    constructor(key, value, dynamic) {
        this.key = key;
        this.dynamic = dynamic;
        this.value = value;
    }
    setValue(value) {
        this.value = value;
    }
    getValue() {
        if (check_.isString(this.value))
            return this.value;
        if (this.dynamic && check_.isFunction(this.value)) {
            return this.value();
        }
        return '';
    }
    render(content) {
        let regx = new RegExp('\\$\\{' + this.key + '\\}', 'gi');
        if (regx.test(content)) {
            content = content.replace(regx, this.getValue());
        }
        return content;
    }
    static parseJson(json) {
        return json_.parseJsonRender(json, function ({ key, value, dynamic }) {
            return new ParamKey(key, value, dynamic);
        });
    }
}
exports.ParamKey = ParamKey;
class TableConfig {
    constructor(prefix, projectSplit, moduleSplit, separator) {
        this.prefix = prefix;
        this.projectSplit = projectSplit;
        this.moduleSplit = moduleSplit;
        this.separator = separator;
    }
    getProject(tableName) {
        let project = '';
        tableName = tableName.substr(this.prefix.length - 1);
        if (this.projectSplit) {
            project = tableName.split(this.separator)[0];
        }
        return project;
    }
    getModule(tableName) {
        let module = '', start = this.prefix.length + this.getProject(tableName).length + this.separator.length;
        tableName = tableName.substr(start - 1);
        if (this.moduleSplit) {
            module = tableName.split(this.separator)[0];
        }
        return module;
    }
    getEntity(tableName) {
        let start = this.prefix.length + this.getProject(tableName).length +
            this.separator.length + this.getModule(tableName).length + this.separator.length;
        return tableName.substr(start - 1);
    }
    static parseJson({ prefix, projectSplit, moduleSplit, separator }) {
        return new TableConfig(prefix, projectSplit, moduleSplit, separator);
    }
}
exports.TableConfig = TableConfig;
class GenterateTable {
    constructor(tablePrefix = '', includes = [], excludes = []) {
        this.tablePrefix = tablePrefix;
        this.includes = includes;
        this.excludes = excludes;
    }
    setTablePrefix(tablePrefix) {
        this.tablePrefix = tablePrefix;
    }
    setIncludes(includes) {
        this.includes = includes;
    }
    setExcludes(excludes) {
        this.excludes = excludes;
    }
    getRemainTables(tables) {
        if (!tables)
            return [];
        let remainTables = Array.from(tables);
        let that = this;
        if (!check_.isEmpty(this.tablePrefix)) {
            tables.forEach(function (item) {
                if (!item.startsWith(that.tablePrefix)) {
                    array_.removeItem(remainTables, item);
                }
            });
        }
        if (!check_.isEmpty(this.includes)) {
            tables.forEach(function (item) {
                if (that.includes.indexOf(item) == -1) {
                    array_.removeItem(remainTables, item);
                }
            });
        }
        else {
            if (!check_.isEmpty(this.excludes)) {
                tables.forEach(function (item) {
                    if (that.excludes.indexOf(item) > -1) {
                        array_.removeItem(remainTables, item);
                    }
                });
            }
        }
        return remainTables;
    }
    getRemainEntities(entities) {
        if (!entities)
            return [];
        let remainEntities = Array.from(entities);
        let that = this;
        if (!check_.isEmpty(this.tablePrefix)) {
            entities.forEach(function (item) {
                if (!item.tableName.startsWith(that.tablePrefix)) {
                    array_.removeItem(remainEntities, item);
                }
            });
        }
        if (!check_.isEmpty(this.includes)) {
            entities.forEach(function (item) {
                if (that.includes.indexOf(item.tableName) === -1) {
                    array_.removeItem(remainEntities, item);
                }
            });
        }
        else {
            if (!check_.isEmpty(this.excludes)) {
                entities.forEach(function (item) {
                    if (that.excludes.indexOf(item.tableName) > -1) {
                        array_.removeItem(remainEntities, item);
                    }
                });
            }
        }
        return remainEntities;
    }
    static parseJson({ tablePrefix, includes, excludes }) {
        return new GenterateTable(tablePrefix, includes, excludes);
    }
}
exports.GenterateTable = GenterateTable;
class Strategy {
    constructor(fileOverridable, camelCase, project, module, paramKeys, tableConfig, generateTable) {
        this.fileOverridable = fileOverridable;
        this.camelCase = camelCase;
        this.project = project;
        this.module = module;
        this.paramKeys = ParamKey.parseJson(paramKeys);
        this.tableConfig = TableConfig.parseJson(tableConfig);
        this.generateTable = GenterateTable.parseJson(generateTable);
    }
    renderCamelCase(value, firstUpper = false) {
        if (this.camelCase) {
            let camel = str_.camelCase(value);
            if (firstUpper) {
                camel = camel[0].toUpperCase() + camel.substr(1);
            }
            return camel;
        }
        return value;
    }
    getProject(tableName) {
        let tableProject = this.tableConfig.getProject(tableName);
        if (this.project && this.project !== tableProject) {
            tableProject = this.project;
        }
        return tableProject;
    }
    getModule() {
        return this.module || 'common';
    }
    getSubModel(tableName) {
        return this.tableConfig.getModule(tableName);
    }
    getEntity(tableName) {
        return this.renderCamelCase(this.tableConfig.getEntity(tableName));
    }
    static parseJson({ fileOverridable, camelCase, project, module, paramKey, tableConfig, generateTable }) {
        return new Strategy(fileOverridable, camelCase, project, module, paramKey, tableConfig, generateTable);
    }
}
exports.Strategy = Strategy;

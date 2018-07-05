"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const json_ = require("../../util/json_");
class Target {
    constructor(key, overridable, targetRoot, targetModule, targetPackage, fileName, fileType, prefix, suffix, template, enable, statically, dependencies) {
        this.key = key;
        this.overridable = overridable;
        this.targetRoot = targetRoot;
        this.targetModule = targetModule;
        this.targetPackage = targetPackage;
        this.fileName = fileName;
        this.fileType = fileType;
        this.prefix = prefix || '';
        this.suffix = suffix || '';
        this.template = template;
        this.enable = enable;
        this.statically = statically;
        this.dependencies = dependencies;
    }
    getFileName() {
        return this.prefix + this.fileName + this.suffix + '.' + this.fileType;
    }
    static parseJson(json) {
        let parseItem = function ({ key, overridable, targetRoot, targetModule, targetPackage, fileName, fileType, prefix, suffix, template, enable, statically, dependencies }) {
            return new Target(key, overridable, targetRoot, targetModule, targetPackage, fileName, fileType, prefix, suffix, template, enable, statically, dependencies);
        };
        return json_.parseJsonRender(json, function (item) {
            return parseItem(item);
        });
    }
    static initTargets(targetsConfig) {
        const targets = [];
        for (let key in targetsConfig) {
            let item = {};
            item['key'] = key;
            Object.assign(item, targetsConfig[key]);
            targets.push(item);
        }
        return Target.parseJson(targets);
    }
}
exports.Target = Target;

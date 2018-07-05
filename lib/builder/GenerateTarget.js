"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const check_ = require("../util/check_");
const file_ = require("../util/file_");
class GenerateTarget {
    constructor(configuration, target, entity, rootPath) {
        this.rootPath = rootPath;
        this.configuration = configuration;
        this.key = target.key;
        this.enable = target.enable;
        this.statically = target.statically;
        this.overridable = target.overridable;
        this.entity = entity;
        this.target = target;
        this.context = this._context();
        this.keyContext = this._keyContext();
        this.path = this._path();
        this.content = this._content();
    }
    _context() {
        if (this.statically)
            return {};
        return {
            authorInfo: this.configuration.authorInfo,
            project: this.configuration.strategy.getProject(this.entity.tableName),
            module: this.configuration.strategy.getModule(this.entity.tableName),
            submodule: this.configuration.strategy.getSubModel(this.entity.tableName),
            entitykey: this.configuration.strategy.getEntity(this.entity.tableName),
            entity: this.entity,
            table: this.entity.tableName,
        };
    }
    _keyContext() {
        if (this.statically)
            return [];
        let paramContext = [];
        for (let item of this.configuration.strategy.paramKeys) {
            if (item.dynamic && !check_.isEmpty(this.context[item.key])) {
                item.setValue(this.context[item.key]);
            }
            paramContext.push(item);
        }
        return paramContext;
    }
    renderKey(content) {
        if (this.statically)
            return content;
        for (let item of this.keyContext) {
            content = item.render(content);
        }
        return content;
    }
    _path() {
        let targetPath = [this.rootPath, this.target.targetRoot];
        targetPath.push(this.renderKey(this.target.targetModule));
        targetPath.push(this.renderKey(this.target.targetPackage));
        targetPath.push(this.renderKey(this.target.getFileName()));
        return file_.pathJoin(targetPath);
    }
    _content() {
        if (check_.isEmpty(this.target.template))
            return '';
        let templatePath = path.join(this.rootPath, this.configuration.template.templateRootPath, this.target.template);
        let content = '';
        if (file_.isExist(templatePath)) {
            content = file_.readFileSync(templatePath, { encoding: 'utf8' });
        }
        return this.configuration.template.render(content, this.context);
    }
}
exports.GenerateTarget = GenerateTarget;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Configuration_1 = require("./Configuration");
const GenerateTarget_1 = require("./GenerateTarget");
class Builder {
    constructor(config, rootPath) {
        this.configuration = new Configuration_1.Configuration(config);
        this.generateTargets = [];
        this.rootPath = rootPath;
    }
    loadGenerateTarget(entitys) {
        if (!entitys || entitys.length === 0)
            return entitys;
        entitys = this.configuration.strategy.generateTable.getRemainEntities(entitys);
        for (let target of this.configuration.targets) {
            if (!target.enable)
                continue;
            target.overridable = target.overridable || this.configuration.strategy.fileOverridable;
            if (target.statically) {
                this.generateTargets.push(new GenerateTarget_1.GenerateTarget(this.configuration, target, null, this.rootPath));
                continue;
            }
            for (let entity of entitys) {
                this.generateTargets.push(new GenerateTarget_1.GenerateTarget(this.configuration, target, entity, this.rootPath));
            }
        }
    }
}
exports.Builder = Builder;

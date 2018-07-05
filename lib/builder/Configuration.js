"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuthorInfo_1 = require("./configuration/AuthorInfo");
const Strategy_1 = require("./configuration/Strategy");
const Target_1 = require("./configuration/Target");
const Template_1 = require("./configuration/Template");
class Configuration {
    constructor(config) {
        this.authorInfo = AuthorInfo_1.AuthorInfo.parseJson(config.authorInfo);
        this.strategy = Strategy_1.Strategy.parseJson(config.strategy);
        this.targets = Target_1.Target.initTargets(config.targets);
        this.template = new Template_1.Template(config.template_config);
    }
}
exports.Configuration = Configuration;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Engine = require("nunjucks");
const engine = function (engineConfig) {
    Engine.configure(engineConfig);
    return Engine;
};
class Template {
    constructor(template_config) {
        this.engine = engine(template_config.engine);
        this.templateRootPath = template_config.template.templateRootPath;
    }
    render(content, context) {
        return this.engine.renderString(content, context);
    }
    ;
}
exports.Template = Template;

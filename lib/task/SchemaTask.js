"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const json5 = require("json5");
const Task_1 = require("./Task");
class SchemaTask extends Task_1.Task {
    constructor(path, content, overridable) {
        super('schema', path, content, overridable);
    }
    static renderContent(content) {
        return 'module.exports = { schemas: \n' + json5.stringify(content, null, 2) + '\n}';
    }
}
exports.SchemaTask = SchemaTask;

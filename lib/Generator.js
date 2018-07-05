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
const Builder_1 = require("./builder/Builder");
const QuerySchema_1 = require("./db/QuerySchema");
const Entity_1 = require("./model/Entity");
const DB_1 = require("./db/DB");
const SchemaTask_1 = require("./task/SchemaTask");
const Task_1 = require("./task/Task");
const SchemaTask_key = 'schema';
class Generator {
    constructor(rootPath, config) {
        this.config = config;
        this.db = new DB_1.DB(this.config.datasource);
        this.builder = new Builder_1.Builder(this.config, rootPath);
    }
    getTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            let tables = yield QuerySchema_1.MysqlSchema.getTables(this.db);
            if (tables) {
                let entitys = Entity_1.Entity.parseJson(tables, this.builder.configuration.strategy);
                this.builder.loadGenerateTarget(entitys);
            }
            if (this.builder.generateTargets.length === 0)
                return false;
            let tasks = [];
            for (let generateTarget of this.builder.generateTargets) {
                if (!generateTarget.enable)
                    continue;
                if (generateTarget.key === SchemaTask_key) {
                    tasks.push(new SchemaTask_1.SchemaTask(generateTarget.path, SchemaTask_1.SchemaTask.renderContent(tables), generateTarget.overridable));
                }
                else {
                    tasks.push(new Task_1.Task(generateTarget.key, generateTarget.path, generateTarget.content, generateTarget.overridable));
                }
            }
            return tasks;
        });
    }
    generator() {
        return __awaiter(this, void 0, void 0, function* () {
            let tasks = yield this.getTasks();
            if (tasks && tasks.length > 0) {
                for (let task of tasks) {
                    yield task.execute();
                }
            }
        });
    }
}
exports.Generator = Generator;

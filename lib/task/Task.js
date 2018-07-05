"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const file_ = require("../util/file_");
class Task {
    constructor(key, path, content, overridable) {
        this.key = key;
        this.path = path;
        this.content = content;
        this.overridable = overridable;
    }
    setPath(path) {
        this.path = path;
    }
    setContent(content) {
        this.content = content;
    }
    setOverridable(overridable) {
        this.overridable = overridable;
    }
    generate() {
        if (!this.content)
            return;
        let write = true;
        if (!fs.existsSync(this.path)) {
            file_.mkdir(file_.getDirName(this.path));
        }
        else {
            if (!this.overridable) {
                write = false;
            }
        }
        if (write) {
            fs.writeFileSync(this.path, this.content);
        }
    }
    execute() {
        this.generate();
    }
}
exports.Task = Task;

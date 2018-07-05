"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
// const rootPath = path.normalize(path.join(__dirname, '../../../'));
function isExist(dir) {
    dir = path.normalize(dir);
    try {
        fs.accessSync(dir);
        return true;
    }
    catch (e) {
        return false;
    }
}
exports.isExist = isExist;
function isFile(filePath) {
    if (!isExist(filePath))
        return false;
    try {
        const stat = fs.statSync(filePath);
        return stat.isFile();
    }
    catch (e) {
        return false;
    }
}
exports.isFile = isFile;
function isDirectory(filePath) {
    if (!isExist(filePath))
        return false;
    try {
        const stat = fs.statSync(filePath);
        return stat.isDirectory();
    }
    catch (e) {
        return false;
    }
}
exports.isDirectory = isDirectory;
function chmod(p, mode = '0777') {
    if (!isExist(p))
        return false;
    try {
        fs.chmodSync(p, mode);
        return true;
    }
    catch (e) {
        return false;
    }
}
exports.chmod = chmod;
function mkdir(dir, mode = '0777') {
    if (isExist(dir))
        return chmod(dir, mode);
    const pp = path.dirname(dir);
    if (isExist(pp)) {
        try {
            fs.mkdirSync(dir, mode);
            return true;
        }
        catch (e) {
            return false;
        }
    }
    if (mkdir(pp, mode))
        return mkdir(dir, mode);
    return false;
}
exports.mkdir = mkdir;
function getdirFiles(dir, prefix = '') {
    dir = path.normalize(dir);
    if (!fs.existsSync(dir))
        return [];
    const files = fs.readdirSync(dir);
    let result = [];
    files.forEach(item => {
        const currentDir = path.join(dir, item);
        const stat = fs.statSync(currentDir);
        if (stat.isFile()) {
            result.push(path.join(prefix, item));
        }
        else if (stat.isDirectory()) {
            const cFiles = getdirFiles(currentDir, path.join(prefix, item));
            result = result.concat(cFiles);
        }
    });
    return result;
}
exports.getdirFiles = getdirFiles;
exports.getDirName = path.dirname;
exports.getNormalize = path.normalize;
exports.readFileSync = fs.readFileSync;
function getRootPath() {
    return path.dirname(__dirname);
}
exports.getRootPath = getRootPath;
function getFileName(filePath) {
    return this.getFileBasename(filePath);
}
exports.getFileName = getFileName;
function getParentFileName(filePath) {
    return this.getFileBasename(path.dirname(filePath));
}
exports.getParentFileName = getParentFileName;
function getFileBasename(file) {
    return path.basename(file, path.extname(file));
}
exports.getFileBasename = getFileBasename;
function pathJoin(...paths) {
    let path_ = '';
    for (let item of paths) {
        if (Array.isArray(item)) {
            for (let subItem of item) {
                path_ = path.join(path_, subItem);
            }
        }
        else {
            path_ = path.join(path_, item);
        }
    }
    return path_;
}
exports.pathJoin = pathJoin;

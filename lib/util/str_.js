"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_ = require("./check_");
function trim(value) { return check_.isString(value) ? value.trim() : value; }
exports.trim = trim;
;
function lowercase(string) { return check_.isString(string) ? string.toLowerCase() : string; }
exports.lowercase = lowercase;
;
function uppercase(string) { return check_.isString(string) ? string.toUpperCase() : string; }
exports.uppercase = uppercase;
;
function camelCase(str) {
    if (str.indexOf('_') > -1) {
        str = str.replace(/_(\w)/g, (a, b) => {
            return b.toUpperCase();
        });
    }
    return str;
}
exports.camelCase = camelCase;

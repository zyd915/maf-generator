"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthorInfo {
    constructor(author, timestamp, copyright) {
        this.author = author;
        this.timestamp = timestamp;
        this.copyright = copyright;
    }
    static parseJson({ author, timestamp, copyright }) {
        return new AuthorInfo(author, timestamp, copyright);
    }
}
exports.AuthorInfo = AuthorInfo;

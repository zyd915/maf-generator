/// <reference types="node" />
import * as path from 'path';
import * as fs from 'fs';
export declare function isExist(dir: any): boolean;
export declare function isFile(filePath: any): boolean;
export declare function isDirectory(filePath: any): boolean;
export declare function chmod(p: any, mode?: string): boolean;
export declare function mkdir(dir: any, mode?: string): any;
export declare function getdirFiles(dir: any, prefix?: string): any[];
export declare const getDirName: typeof path.dirname;
export declare const getNormalize: typeof path.normalize;
export declare const readFileSync: typeof fs.readFileSync;
export declare function getRootPath(): string;
export declare function getFileName(filePath: any): any;
export declare function getParentFileName(filePath: any): any;
export declare function getFileBasename(file: any): string;
export declare function pathJoin(...paths: any[]): string;

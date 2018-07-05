export declare class AuthorInfo {
    author: any;
    timestamp: any;
    copyright: any;
    constructor(author: any, timestamp: any, copyright: any);
    static parseJson({ author, timestamp, copyright }: {
        author: any;
        timestamp: any;
        copyright: any;
    }): AuthorInfo;
}

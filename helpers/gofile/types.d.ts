export interface GetServerI {
    "status": string,
    "data": {
        "server": string
    }
}

export interface UploadFileRes {
    "status": string,
    "data": {
        "downloadPage": string;
        "code": string;
        "parentFolder": string;
        "fileId": string;
        "fileName": string;
        "md5": string;
    }
}
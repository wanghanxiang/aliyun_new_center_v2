import Request = require("request");


export const request_tool = (url: string, headers: object) => {
    let param: any = {
        url,
        encoding: null
    }
    if (headers && JSON.stringify(headers) != '{}') {
        param.headers = headers;
    }
    return new Promise((resolve, reject) => {
        Request(
            param,
            (error: any, response: any, body: any) => {
                if (error) {
                    return reject(error);
                }
                return resolve(response.body);
            }
        );
    }).catch((error) => {
        return Promise.reject(error);
    });
};

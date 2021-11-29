import Request = require("request");


export const request_tool = (url: string, options?: object) => {

    !options && (options = { });

    let param: any = {
        url,
        encoding: null
    }
    param = Object.assign(param, options);
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

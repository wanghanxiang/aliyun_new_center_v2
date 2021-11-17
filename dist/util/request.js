"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.request_tool = void 0;
const Request = require("request");
const request_tool = (url, headers) => {
    let param = {
        url,
        encoding: null
    };
    if (headers && JSON.stringify(headers) != '{}') {
        param.headers = headers;
    }
    return new Promise((resolve, reject) => {
        Request(param, (error, response, body) => {
            if (error) {
                return reject(error);
            }
            return resolve(response.body);
        });
    }).catch((error) => {
        return Promise.reject(error);
    });
};
exports.request_tool = request_tool;

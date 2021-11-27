"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.request_tool = void 0;
const Request = require("request");
const request_tool = (url, options) => {
    let param = {
        url,
        encoding: null
    };
    param = Object.assign(param, options);
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

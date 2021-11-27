"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readHub = void 0;
const request = require('request');
const redis_1 = require("../../glues/redis");
const request_1 = require("../../util/request");
const url = 'https://api.readhub.cn/topic?lastCursor=&pageSize=20';
const REDIS_KEY_READHUB = 'readHub';
var options = {
    method: 'GET',
    url: url,
    timeout: 8000,
    encoding: null,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36'
    }
};
async function readHub() {
    let result = await (0, request_1.request_tool)(url, options);
    let readHubJson = JSON.parse(result.toString());
    let newArticles = [];
    if (readHubJson.data) {
        try {
            readHubJson === null || readHubJson === void 0 ? void 0 : readHubJson.data.map((item) => {
                for (var i = 0, len = item.newsArray.length; i < 1; i++) {
                    let { title, url } = item.newsArray[i];
                    let items = {
                        title: title,
                        url: url
                    };
                    newArticles.push(items);
                }
            });
            await redis_1.redis.set(REDIS_KEY_READHUB, JSON.stringify(newArticles)).catch((e) => {
                console.error(`[news] readhub ${newArticles} redis error ${e}`);
            });
        }
        catch (e) {
            console.error(`[news] readhub ${newArticles} redis error ${e}`);
        }
    }
    else {
        console.log(`[news] readhub empty message ${new Date()}`);
    }
}
exports.readHub = readHub;

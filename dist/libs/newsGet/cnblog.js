"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cnblog = void 0;
const request_1 = require("../../util/request");
const redis_1 = require("../../glues/redis");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");
const url = 'https://www.cnblogs.com/';
const REDIS_KEY_CNBLOGS = 'pachong##cnblogs_news';
async function cnblog() {
    try {
        let cnblogBuffer = await (0, request_1.request_tool)(url);
        const html = iconv.decode(cnblogBuffer, "utf8");
        if (html) {
            let $ = cheerio.load(html);
            let newData = [];
            let tag_a = $(".post-item-title");
            for (let i = 0; i < tag_a.length; i++) {
                let href = tag_a.eq(i).attr('href');
                let title = tag_a.eq(i).text();
                console.info(`href`, href, `title`, title);
                let temp = {
                    'cnTitle': title,
                    'cnBlogUrl': href
                };
                console.info(temp);
                newData.push(temp);
            }
            newData.length != 0 && await redis_1.redis.set(REDIS_KEY_CNBLOGS, JSON.stringify(newData)).catch((e) => {
                console.error(`[news] cnblog ${newData} redis error ${e}`);
            });
        }
        else {
            console.error(`[news] cnblogs error`);
        }
    }
    catch (e) {
        console.error(`[news] cnblogs error, ${e} `);
    }
}
exports.cnblog = cnblog;

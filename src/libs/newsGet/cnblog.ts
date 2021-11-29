import { request_tool } from "../../util/request";
import { redis } from "../../glues/redis";

import cheerio = require('cheerio');
const iconv = require("iconv-lite");

const url = 'https://www.cnblogs.com/'; //cnblog请求网址
const REDIS_KEY_CNBLOGS = 'pachong##cnblogs_news';


export async function cnblog() {

    try {
        let cnblogBuffer = await request_tool(url);

        const html = iconv.decode(cnblogBuffer, "utf8");

        if (html) {
            let $ = cheerio.load(html); // cheerio需要先load html
            let newData: any = [];

            let tag_a = $(".post-item-title");

            for (let i = 0; i < tag_a.length; i++) {
                let href = tag_a.eq(i).attr('href');
                let title = tag_a.eq(i).text();
                console.info(`href`, href, `title`, title);
                let temp = {
                    'cnTitle': title,
                    'cnBlogUrl': href
                }
                console.info(temp);
                newData.push(temp);
            }
            newData.length != 0 && await redis.set(REDIS_KEY_CNBLOGS, JSON.stringify(newData)).catch((e) => {
                console.error(`[news] cnblog ${newData} redis error ${e}`);
            });
        } else {
            console.error(`[news] cnblogs error`);
        }
    } catch (e) {
        console.error(`[news] cnblogs error, ${e} `);
    }

}

//cnblog();



import { redis } from "../../glues/redis";
import { request_tool } from "../../util/request";


//readHUb
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

export async function readHub() {
    let result = await request_tool(url, options);
    //@ts-ignore
    let readHubJson = JSON.parse(result.toString());
    let newArticles: any = [];
    //@ts-ignore
    if (readHubJson.data) {
        try {
            readHubJson?.data.map((item: any) => {
                for (var i = 0, len = item.newsArray.length; i < 1; i++) {
                    let { title, url } = item.newsArray[i];
                    let items = {
                        title: title,
                        url: url
                    };
                    newArticles.push(items);
                }
            });

            newArticles.length != 0 && await redis.set(REDIS_KEY_READHUB, JSON.stringify(newArticles)).catch((e) => {
                console.error(`[news] readhub ${newArticles} redis error ${e}`);
            });
        } catch (e) {
            console.error(`[news] readhub ${newArticles} redis error ${e}`);
        }
    } else {
        console.log(`[news] readhub empty message ${new Date()}`);
    }

}



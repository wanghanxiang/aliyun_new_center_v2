
//const puppeteer = require("puppeteer");
import puppeteer from 'puppeteer'
import { redis } from "../../glues/redis";

const url_map: { [key: string]: string } = {
    'db': 'https://blog.csdn.net/',//数据库相关 https://blog.csdn.net/nav/db
    'rengongzhineng': 'https://blog.csdn.net/nav/ai'//人工智能
}

const readisKey_map: { [key: string]: string } = {
    'db': 'pachong##csdn_db',//数据库相关
    'rengongzhineng': 'pachong##csdn_rengongzhineng'//后端-后端-最新
}

/**
 * @description csdn的信息获取
 * @param title 后端、 人工智能
 */
export const csdnTask = async (title: string) => {
    // 打开chrome浏览器
    const browser = await puppeteer.launch({
        //当为true时，客户端不会打开，使用无头模式；为false时，可打开浏览器界面
        headless: true,
        ignoreHTTPSErrors: true,
        args: ['--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--disable-gpu'
        ]//'--window-size=1920x1080'
    });

    try {
        // 新建页面
        const page = await browser.newPage();
        const url = url_map[title];

        // 跳转到掘金
        await page.goto(url, {
            waitUntil: ['load', 'networkidle0', 'networkidle2'],
            'timeout': 0 //这里超时是120s
        }).catch((e) => {
            console.info(`打开页面报错`, e);
        });

        // 菜单导航选择器
        const navSelector = ".view-nav .nav-item";
        // 文章列表选择器 chrome中使用copy selector即可
        const listSelector = "#floor-blog-index_747 > div > div.blog-content > div.Community > div:nth-child(n) > div > a";

        // 等待文章列表选择器加载完成
        await page.waitForSelector(listSelector, {
            timeout: 9000
        });

        // 通过选择器找到对应列表项的标题和链接
        //@ts-ignore
        const res = await page.$$eval(listSelector, ele => ele.map(el => ({ url: el.getAttribute('href'), title: el.innerText })));

        console.info(`[news] csdn res task ${title}`, res);

        //关闭浏览器
        await browser.close();

        res && await redis.set(readisKey_map[title], JSON.stringify(res)).catch((e) => {
            console.error(`[news] csdn ${title} redis error ${e}`);
        });

    } catch (e) {
        console.error(`[news] csdn ${title} error ${e}`);
        //关闭浏览器
        await browser.close();
    }

}

//csdnTask('db');
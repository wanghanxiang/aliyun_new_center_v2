
//const puppeteer = require("puppeteer");
import puppeteer from 'puppeteer'
import { redis } from "../../glues/redis";

/**
 * @description 掘金信息任务
 * @param title 后端、 人工智能
 */
export const juejinTask = async (title: string, redisKey: string) => {
    // 打开chrome浏览器
    const browser = await puppeteer.launch({
        //当为true时，客户端不会打开，使用无头模式；为false时，可打开浏览器界面
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }).catch((e) => { console.info(`打开浏览器报错`, e); throw new Error("打开浏览器报错"); });

    try {
        // 新建页面
        const page = await browser.newPage();
        // 跳转到掘金
        await page.goto("https://juejin.im", {
            'timeout': 1000 * 120 //这里超时是120s
        }).catch((e) => {
            console.info(`打开页面报错`, e); throw new Error("前往页面报错");
        });
        // 菜单导航选择器
        const navSelector = ".view-nav .nav-item";
        // 文章列表选择器
        const listSelector = ".entry-list .item a.title";
        // 菜单类别
        const navType = title;//后端、人工智能
        await page.waitForSelector(navSelector);
        // 导航列表
        //@ts-ignore
        const navList = await page.$$eval(navSelector, ele => ele.map(el => el.innerText));

        //@ts-ignore
        const webNavIndex = navList.findIndex(item => item === navType);
        await Promise.all([
            page.waitForNavigation(),
            page.click(`${navSelector}:nth-child(${webNavIndex + 1})`)
        ]);

        // 等待文章列表选择器加载完成
        await page.waitForSelector(listSelector, {
            timeout: 9000
        });

        // 通过选择器找到对应列表项的标题和链接
        //@ts-ignore
        const res = await page.$$eval(listSelector, ele => ele.map(el => ({ url: el.href, title: el.innerText })));
        console.info(`[news] juejinhou res`, res);

        //关闭浏览器
        await browser.close();

        await redis.set(`${title == "后端" ? 'houduan' : 'rengongzhineng'}`, JSON.stringify(res)).catch((e) => {
            console.error(`[news] juejinhou ${title} redis error ${e}`);
        });
        
    } catch (e) {
        console.error(`[news] juejinhou ${title} error ${e}`);
        //关闭浏览器
        await browser.close();
    }

}
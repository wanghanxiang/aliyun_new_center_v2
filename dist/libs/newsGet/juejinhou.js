"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer = require("puppeteer");
const redis_1 = require("../../glues/redis");
const task = async (title) => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    try {
        const page = await browser.newPage();
        await page.goto("https://juejin.im", {
            'timeout': 1000 * 60
        });
        const navSelector = ".view-nav .nav-item";
        const listSelector = ".entry-list .item a.title";
        const navType = title;
        await page.waitFor(navSelector);
        const navList = await page.$$eval(navSelector, ele => ele.map(el => el.innerText));
        const webNavIndex = navList.findIndex(item => item === navType);
        await Promise.all([
            page.waitForNavigation(),
            page.click(`${navSelector}:nth-child(${webNavIndex + 1})`)
        ]);
        await page.waitForSelector(listSelector, {
            timeout: 9000
        });
        const res = await page.$$eval(listSelector, ele => ele.map(el => ({ url: el.href, title: el.innerText })));
        console.info(res);
        await redis_1.redis.set('houduan', res).catch((e) => {
            console.error(`[news] juejinhou ${title} redis error ${e}`);
        });
        await browser.close();
    }
    catch (e) {
        console.error(`[news] juejinhou ${title} error ${e}`);
        await browser.close();
    }
};

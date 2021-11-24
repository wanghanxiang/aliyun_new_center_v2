"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.juejinTask = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const redis_1 = require("../../glues/redis");
const juejinTask = async (title, redisKey) => {
    const browser = await puppeteer_1.default.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    try {
        const page = await browser.newPage();
        await page.goto("https://juejin.im", {
            'timeout': 1000 * 120
        }).catch((e) => {
            console.info(`打开页面报错`, e);
            throw new Error("前往页面报错");
        });
        const navSelector = ".view-nav .nav-item";
        const listSelector = ".entry-list .item a.title";
        const navType = title;
        await page.waitForSelector(navSelector);
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
        console.info(`[news] juejinhou res`, res);
        await redis_1.redis.set('houduan', JSON.stringify(res)).catch((e) => {
            console.error(`[news] juejinhou ${title} redis error ${e}`);
        });
        await browser.close();
    }
    catch (e) {
        console.error(`[news] juejinhou ${title} error ${e}`);
        await browser.close();
    }
};
exports.juejinTask = juejinTask;

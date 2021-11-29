"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.juejinTask = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const redis_1 = require("../../glues/redis");
const url_map = {
    'rengongzhineng': 'https://juejin.cn/ai/%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0?sort=newest',
    'houduan': 'https://juejin.cn/backend/%E5%90%8E%E7%AB%AF?sort=newest'
};
const juejinTask = async (title, redisKey) => {
    const browser = await puppeteer_1.default.launch({
        headless: true,
        ignoreHTTPSErrors: true,
        args: ['--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--disable-gpu'
        ]
    });
    try {
        const page = await browser.newPage();
        await page.goto("https://juejin.cn", {
            waitUntil: ['load', 'networkidle0', 'networkidle2'],
            'timeout': 0
        }).catch((e) => {
            console.info(`打开页面报错`, e);
        });
        let url = url_map[redisKey];
        await page.goto(url);
        const navSelector = ".view-nav .nav-item";
        const listSelector = ".entry-list .item a.title";
        const navType = title;
        await page.waitForSelector(navSelector);
        const navList = await page.$$eval(navSelector, ele => ele.map(el => el.innerText));
        const webNavIndex = navList.findIndex(item => item === navType);
        await page.waitForSelector(listSelector, {
            timeout: 9000
        });
        const res = await page.$$eval(listSelector, ele => ele.map(el => ({ url: el.href, title: el.innerText })));
        console.info(`[news] juejinhou res`, res);
        await browser.close();
        res && await redis_1.redis.set(redisKey, JSON.stringify(res)).catch((e) => {
            console.error(`[news] juejinhou ${title} redis error ${e}`);
        });
    }
    catch (e) {
        console.error(`[news] juejinhou ${title} error ${e}`);
        await browser.close();
    }
};
exports.juejinTask = juejinTask;

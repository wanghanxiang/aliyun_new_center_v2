"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.csdnTask = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const redis_1 = require("../../glues/redis");
const url_map = {
    'db': 'https://blog.csdn.net/',
    'rengongzhineng': 'https://blog.csdn.net/nav/ai'
};
const readisKey_map = {
    'db': 'pachong##csdn_db',
    'rengongzhineng': 'pachong##csdn_rengongzhineng'
};
const csdnTask = async (title) => {
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
        const url = url_map[title];
        await page.goto(url, {
            waitUntil: ['load', 'networkidle0', 'networkidle2'],
            'timeout': 0
        }).catch((e) => {
            console.info(`打开页面报错`, e);
        });
        const navSelector = ".view-nav .nav-item";
        const listSelector = "#floor-blog-index_747 > div > div.blog-content > div.Community > div:nth-child(n) > div > a";
        await page.waitForSelector(listSelector, {
            timeout: 9000
        });
        const res = await page.$$eval(listSelector, ele => ele.map(el => ({ url: el.getAttribute('href'), title: el.innerText })));
        console.info(`[news] csdn res task ${title}`, res);
        await browser.close();
        res && await redis_1.redis.set(readisKey_map[title], JSON.stringify(res)).catch((e) => {
            console.error(`[news] csdn ${title} redis error ${e}`);
        });
    }
    catch (e) {
        console.error(`[news] csdn ${title} error ${e}`);
        await browser.close();
    }
};
exports.csdnTask = csdnTask;

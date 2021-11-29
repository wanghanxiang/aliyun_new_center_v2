"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path = require('path');
class ScheduleHelper {
    constructor() {
        this.scheduleList = [];
    }
    async initTaskFromConfig() {
        const prod = process.env.NODE_ENV === 'prod';
        const timerTaskPath = prod ? path.resolve('__dirname', '../dist/timer') : path.resolve('__dirname', '../src/timer');
        console.info(`[schedule]timer路径加载path`, timerTaskPath);
        try {
            const taskList = await this.readdir(timerTaskPath);
            for (const taskItem of taskList) {
                let taskItemPath = path.resolve(timerTaskPath, taskItem);
                console.info(`[schedule]timer路径加载taskItem`, taskItemPath);
                await Promise.resolve().then(() => __importStar(require(taskItemPath))).then((module) => {
                    const scheduleItem = new module.default();
                    console.info(`[schedule]scheduleItem`, scheduleItem);
                    this.scheduleList.push(scheduleItem);
                }, (err) => {
                    console.error(`[schedule]初始化失败，找不到配置文件 ${err.message}`);
                });
            }
        }
        catch (err) {
            console.error(err);
        }
    }
    async taskListRun() {
        await this.initTaskFromConfig();
        console.info(`[schedule]schedulelist======, ${this.scheduleList}`);
        for (const schedule of this.scheduleList) {
            console.info(`[schedule]schedule******${schedule}, ${schedule.scheduleInfo.switch}`);
            if (schedule.scheduleInfo.switch) {
                schedule.start();
            }
        }
    }
    readdir(filepath) {
        return new Promise((resolve, reject) => {
            (0, fs_1.readdir)(filepath, (err, data) => {
                if (err) {
                    return reject(err);
                }
                return resolve(data);
            });
        });
    }
}
exports.default = new ScheduleHelper();

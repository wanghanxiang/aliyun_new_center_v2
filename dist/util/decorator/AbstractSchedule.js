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
exports.AbstractSchedule = void 0;
const schedule = __importStar(require("node-schedule"));
class AbstractSchedule {
    constructor(scheduleInfo) {
        this.scheduleInfo = scheduleInfo;
    }
    async _execTask() {
        console.info(`执行定时任务，任务名称: ${this.scheduleInfo.name} ; 执行时间: ${new Date()}`);
        await this.task();
        await this._sleep(6000);
    }
    _sleep(ms) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve('success');
            }, ms);
        });
    }
    startSchedule() {
        return schedule.scheduleJob(this.scheduleInfo.corn, () => {
            this._execTask();
        });
    }
    start() {
        this.startSchedule();
    }
}
exports.AbstractSchedule = AbstractSchedule;

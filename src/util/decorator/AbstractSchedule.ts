import * as schedule from 'node-schedule';
/**
 * @description timmer的抽象类
 * 
 */
export interface IScheduleInfo {
    /**
     * 定时规则
     */
    corn: string;
    /**
     * 任务名称
     */
    name: string;
    /**
     * 任务开关
     */
    switch: boolean;
}

/**
 * @description
 * 定时任务
 * @export
 * @class AbstractSchedule
 */
export abstract class AbstractSchedule {
    /**
     * 任务对象
     */
    public scheduleInfo: IScheduleInfo;

    constructor(scheduleInfo: IScheduleInfo) {
        this.scheduleInfo = scheduleInfo;
    }

    /**
     * @description
     * 同步执行任务
     * @private
     * @param {any} lock 
     * @returns 
     * @memberof AbstractSchedule
     */
    private async _execTask() {
        console.info(`执行定时任务，任务名称: ${this.scheduleInfo.name} ; 执行时间: ${new Date()}`);
        await this.task();
        await this._sleep(6000);
    }

    /**
     * @description
     * 延迟
     * @private
     * @param {any} ms 
     * @returns 
     * @memberof AbstractSchedule
     */
    private _sleep(ms: number) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve('success');
            }, ms);
        });
    }

    /**
     * @description 
     * 开启任务,使用redis同步锁，保证任务单实例执行
     * @private
     * @param IScheduleInfo scheduleInfo
     * @param {Function} callback
     * @returns
     * @memberof AbstractSchedule
     */
    public startSchedule() {
        return schedule.scheduleJob(this.scheduleInfo.corn, () => {
            this._execTask();
        });
    }

    /**
     * @description
     * 启动入口
     * @author lizc
     * @abstract
     * @memberof AbstractSchedule
     */
    public start() {
        this.startSchedule();
    }

    /**
     * @description 定义任务
     * @abstract
     * @memberof AbstractSchedule
     */
    public abstract task(): void; // 抽象方法必须在派生类中实现

}
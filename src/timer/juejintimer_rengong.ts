import { juejinTask } from "../libs/newsGet/juejinhou";
import { AbstractSchedule, IScheduleInfo } from "../util/decorator/AbstractSchedule";


export default class JuejinRengongSchedule extends AbstractSchedule {

    constructor(scheduleInfo: IScheduleInfo) {
        super(scheduleInfo);
        this.scheduleInfo = {
            corn: '20 * * * *', //每6小时执行一次
            name: 'juejin-rengong',
            switch: true
        };
    }

    /**
     * 业务实现
     */
    public async task() {
        await juejinTask('人工智能', 'rengongzhineng');
    }

}
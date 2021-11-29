import { TIMMER_CONFIG } from "../config/timmer_config";
import { juejinTask } from "../libs/newsGet/juejinhou";
import { AbstractSchedule, IScheduleInfo } from "../util/decorator/AbstractSchedule";


export default class JuejinRengongSchedule extends AbstractSchedule {

    constructor(scheduleInfo: IScheduleInfo) {
        super(scheduleInfo);
        const { name, corn } = TIMMER_CONFIG['juejin-rengong'];
        this.scheduleInfo = {
            corn,
            name,
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
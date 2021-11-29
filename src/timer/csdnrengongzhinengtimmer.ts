import { TIMMER_CONFIG } from "../config/timmer_config";
import { csdnTask } from "../libs/newsGet/csdntask";
import { AbstractSchedule, IScheduleInfo } from "../util/decorator/AbstractSchedule";


export default class csdnRengongSchedule extends AbstractSchedule {

    constructor(scheduleInfo: IScheduleInfo) {
        super(scheduleInfo);

        const { name, corn } = TIMMER_CONFIG['csdn-rengongzhineng-task'];
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
        await csdnTask('rengongzhineng');
    }

}
import { TIMMER_CONFIG } from "../config/timmer_config";
import { cnblog } from "../libs/newsGet/cnblog";
import { AbstractSchedule, IScheduleInfo } from "../util/decorator/AbstractSchedule";


export default class cnblogSchedule extends AbstractSchedule {

    constructor(scheduleInfo: IScheduleInfo) {
        super(scheduleInfo);

        const { name, corn } = TIMMER_CONFIG['cnblog-task'];
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
        await cnblog();
    }

}
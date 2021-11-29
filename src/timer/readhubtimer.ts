import { TIMMER_CONFIG } from "../config/timmer_config";
import { readHub } from "../libs/newsGet/readHub";
import { AbstractSchedule, IScheduleInfo } from "../util/decorator/AbstractSchedule";


export default class readHubSchedule extends AbstractSchedule {

    constructor(scheduleInfo: IScheduleInfo) {
        super(scheduleInfo);

        const { name, corn } = TIMMER_CONFIG['readHub-task'];
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
        await readHub();
    }

}
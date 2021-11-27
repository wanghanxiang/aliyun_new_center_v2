import { readHub } from "../libs/newsGet/readHub";
import { AbstractSchedule, IScheduleInfo } from "../util/decorator/AbstractSchedule";


export default class readHubSchedule extends AbstractSchedule {

    constructor(scheduleInfo: IScheduleInfo) {
        super(scheduleInfo);
        this.scheduleInfo = {
            corn: '35 */6 * * *', //每6小时执行一次
            name: 'readHub-task',
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
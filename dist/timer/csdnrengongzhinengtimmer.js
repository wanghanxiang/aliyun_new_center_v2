"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const timmer_config_1 = require("../config/timmer_config");
const csdntask_1 = require("../libs/newsGet/csdntask");
const AbstractSchedule_1 = require("../util/decorator/AbstractSchedule");
class csdnRengongSchedule extends AbstractSchedule_1.AbstractSchedule {
    constructor(scheduleInfo) {
        super(scheduleInfo);
        const { name, corn } = timmer_config_1.TIMMER_CONFIG['csdn-rengongzhineng-task'];
        this.scheduleInfo = {
            corn,
            name,
            switch: true
        };
    }
    async task() {
        await (0, csdntask_1.csdnTask)('rengongzhineng');
    }
}
exports.default = csdnRengongSchedule;

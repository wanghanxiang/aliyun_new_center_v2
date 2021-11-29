"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const timmer_config_1 = require("../config/timmer_config");
const cnblog_1 = require("../libs/newsGet/cnblog");
const AbstractSchedule_1 = require("../util/decorator/AbstractSchedule");
class cnblogSchedule extends AbstractSchedule_1.AbstractSchedule {
    constructor(scheduleInfo) {
        super(scheduleInfo);
        const { name, corn } = timmer_config_1.TIMMER_CONFIG['cnblog-task'];
        this.scheduleInfo = {
            corn,
            name,
            switch: true
        };
    }
    async task() {
        await (0, cnblog_1.cnblog)();
    }
}
exports.default = cnblogSchedule;

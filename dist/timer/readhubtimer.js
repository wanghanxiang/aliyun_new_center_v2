"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const timmer_config_1 = require("../config/timmer_config");
const readHub_1 = require("../libs/newsGet/readHub");
const AbstractSchedule_1 = require("../util/decorator/AbstractSchedule");
class readHubSchedule extends AbstractSchedule_1.AbstractSchedule {
    constructor(scheduleInfo) {
        super(scheduleInfo);
        const { name, corn } = timmer_config_1.TIMMER_CONFIG['readHub-task'];
        this.scheduleInfo = {
            corn,
            name,
            switch: true
        };
    }
    async task() {
        await (0, readHub_1.readHub)();
    }
}
exports.default = readHubSchedule;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const timmer_config_1 = require("../config/timmer_config");
const juejinhou_1 = require("../libs/newsGet/juejinhou");
const AbstractSchedule_1 = require("../util/decorator/AbstractSchedule");
class JuejinRengongSchedule extends AbstractSchedule_1.AbstractSchedule {
    constructor(scheduleInfo) {
        super(scheduleInfo);
        const { name, corn } = timmer_config_1.TIMMER_CONFIG['juejin-rengong'];
        this.scheduleInfo = {
            corn,
            name,
            switch: true
        };
    }
    async task() {
        await (0, juejinhou_1.juejinTask)('人工智能', 'rengongzhineng');
    }
}
exports.default = JuejinRengongSchedule;

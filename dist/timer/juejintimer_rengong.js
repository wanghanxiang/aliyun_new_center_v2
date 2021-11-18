"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const juejinhou_1 = require("../libs/newsGet/juejinhou");
const AbstractSchedule_1 = require("../util/decorator/AbstractSchedule");
class JuejinRengongSchedule extends AbstractSchedule_1.AbstractSchedule {
    constructor(scheduleInfo) {
        super(scheduleInfo);
        this.scheduleInfo = {
            corn: '20 */12 * * *',
            name: 'juejin-rengong',
            switch: true
        };
    }
    async task() {
        await (0, juejinhou_1.juejinTask)('人工智能', 'rengongzhineng');
    }
}
exports.default = JuejinRengongSchedule;

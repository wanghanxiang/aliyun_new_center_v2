"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const juejinhou_1 = require("../libs/newsGet/juejinhou");
const AbstractSchedule_1 = require("../util/decorator/AbstractSchedule");
class JuejinHouDuanSchedule extends AbstractSchedule_1.AbstractSchedule {
    constructor(scheduleInfo) {
        super(scheduleInfo);
        this.scheduleInfo = {
            corn: '10 */4 * * *',
            name: 'juejin-houtai',
            switch: true
        };
    }
    async task() {
        await (0, juejinhou_1.juejinTask)('后端', 'houduan');
    }
}
exports.default = JuejinHouDuanSchedule;

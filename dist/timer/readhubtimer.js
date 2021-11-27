"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readHub_1 = require("../libs/newsGet/readHub");
const AbstractSchedule_1 = require("../util/decorator/AbstractSchedule");
class readHubSchedule extends AbstractSchedule_1.AbstractSchedule {
    constructor(scheduleInfo) {
        super(scheduleInfo);
        this.scheduleInfo = {
            corn: '35 */6 * * *',
            name: 'readHub-task',
            switch: true
        };
    }
    async task() {
        await (0, readHub_1.readHub)();
    }
}
exports.default = readHubSchedule;

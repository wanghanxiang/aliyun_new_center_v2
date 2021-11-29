"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TIMMER_CONFIG = void 0;
const TIMMER_CONFIG = {
    "juejin-rengong": {
        corn: '25 6-7 * * *',
        name: 'juejin-rengong'
    },
    "juejin-houtai": {
        corn: '15 6-7 * * *',
        name: 'juejin-houtai',
    },
    "readHub-task": {
        corn: '35 */6 * * *',
        name: 'readHub-task',
    },
    "cnblog-task": {
        corn: '40 6 * * *',
        name: 'cnblog-task',
    },
    "csdn-rengongzhineng-task": {
        corn: '45 6-7 * * *',
        name: 'csdn-rengongzhineng-task',
    },
    "csdn-db-task": {
        corn: '50 6-7 * * *',
        name: 'csdn-db-task',
    }
};
exports.TIMMER_CONFIG = TIMMER_CONFIG;

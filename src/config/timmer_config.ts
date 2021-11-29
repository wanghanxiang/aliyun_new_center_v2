//定时任务时间配置
const TIMMER_CONFIG = {
    "juejin-rengong": {
        corn: '25 6-7 * * *', //6点，7点执行一次
        name: 'juejin-rengong'
    },
    "juejin-houtai": {
        corn: '15 6-7 * * *', //6点，7点执行一次
        name: 'juejin-houtai',
    },
    "readHub-task": {
        corn: '35 */6 * * *', //每6小时执行一次
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
}

export { TIMMER_CONFIG };
## 简介：部署在阿里云上的信息获取服务

使用框架：koa

使用语言：ts



### 一、juejin相关

#### 1、juejin信息获取

使用的无头浏览器，还不错推荐使用：puppeteer还不错 功能还挺强大的。

参考文档；https://juejin.cn/post/6988479655967719454

官方文档：https://pptr.dev/

如果puppeteer启动不起来可以参考：

https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md

错误：
TROUBLESHOOTING: https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md

    at onClose (/home/www/aliyunnewscenter/node_modules/puppeteer/lib/cjs/puppeteer/node/BrowserRunner.js:203:20)
    at Interface.<anonymous> (/home/www/aliyunnewscenter/node_modules/puppeteer/lib/cjs/puppeteer/node/BrowserRunner.js:193:68)
    at Interface.emit (events.js:322:22)
    at Interface.close (readline.js:409:8)
    at Socket.onend (readline.js:187:10)
    at Socket.emit (events.js:322:22)
    at endReadableNT (_stream_readable.js:1187:12)
    at processTicksAndRejections (internal/process/task_queues.js:84:21)
(node:17) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 1)

apt-get update

apt install ca-certificates fonts-liberation libappindicator3-1 libasound2 libatk-bridge2.0-0 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 lsb-release wget xdg-utils


### 二、 相关知识学习

#### 1、import 动态引入学习(挺好玩的 返回一个promise对象)：

https://www.jianshu.com/p/386916c73dad

#### 2、定时任务执行(crontab的语法规则格式)：

https://blog.csdn.net/xinyflove/article/details/83178876



##### 2.1 定时起相关的：

定时器抽象类：

src/util/decorator/AbstractSchedule.ts

定时器扫描加载文件：

src/util/decorator/timmerMethod.ts

定时起代码都在timer文件夹下面



### 三、项目启动



docker run -d -p 8006:3005 -m 100M --memory-swap -1 --name="news-server" registry.cn-hangzhou.aliyuncs.com/hanxiang/aliyun_new_center_v2

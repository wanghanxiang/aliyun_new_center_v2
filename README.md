## 简介：部署在阿里云上的信息获取服务

使用框架：koa

使用语言：ts



### 一、juejin相关

#### 1、juejin信息获取

使用的无头浏览器，还不错推荐使用：puppeteer还不错 功能还挺强大的。

参考文档；https://juejin.cn/post/6988479655967719454

官方文档：https://pptr.dev/

##### 1.1问题（一） puppeteer安装问题

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



可以先更新一下下面的依赖：

apt-get update

apt-get install gconf-service libasound2 libatk1.0-0 libatk-bridge2.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget



或者参考这个：https://stackoverflow.com/questions/52993002/headless-chrome-node-api-and-puppeteer-installation



温馨提示：因为在安装puppeteer是会下载chrome的，这里推荐使用cnpm来安装puppeteer。

**cnpm install puppeteer**

在运行的时候还会提醒少各种依赖包，这是后就需要想上面一样安装。

ps：安装依赖比较慢可以使用清华源、163源等

https://mirror.tuna.tsinghua.edu.cn/help/debian/

参考的dockerFile。如果不可以，可以参考项目里面的。

```
FROM node:12
WORKDIR /app
COPY package.json /app/
RUN apt-get update \
    && apt-get install -y \
    gconf-service \ 
    libasound2 \ 
    libatk1.0-0 \ 
    libatk-bridge2.0-0 \ 
    libc6 \ 
    libcairo2 \ 
    libcups2 \ 
    libdbus-1-3 \ 
    libexpat1 \ 
    libfontconfig1 \ 
    libgcc1 \ 
    libgconf-2-4 \ 
    libgdk-pixbuf2.0-0 \ 
    libglib2.0-0 \ 
    libgtk-3-0 \ 
    libnspr4 \ 
    libpango-1.0-0 \ 
    libpangocairo-1.0-0 \ 
    libstdc++6 \ 
    libx11-6 \ 
    libx11-xcb1 \ 
    libxcb1 \ 
    libxcomposite1 \ 
    libxcursor1 \ 
    libxdamage1 \ 
    libxext6 \ 
    libxfixes3 \ 
    libxi6 \ 
    libxrandr2 \ 
    libxrender1 \ 
    libxss1 \ 
    libxtst6 \ 
    ca-certificates \ 
    fonts-liberation \ 
    libappindicator1 \ 
    libnss3 \ 
    lsb-release \ 
    xdg-utils \ 
    wget \ 
    && npm i puppeteer
COPY . /app
CMD [ "node", "app.js" ]
```

##### 1.2 问题（二）：无法连接问题

```
打开页面报错 Error: Navigation failed because browser has disconnected!
    at /home/www/aliyunnewscenter/node_modules/_puppeteer@12.0.0@puppeteer/lib/cjs/puppeteer/common/LifecycleWatcher.js:51:147
    at /home/www/aliyunnewscenter/node_modules/_puppeteer@12.0.0@puppeteer/lib/cjs/vendor/mitt/src/index.js:51:62
```

遇到这个问题有两个解决的地方，**一个是运行这个程序的内存需要调大，二是启动浏览器的args地方增加如下代码**：

```javascript
    // 打开chrome浏览器
    const browser = await puppeteer.launch({
        //当为true时，客户端不会打开，使用无头模式；为false时，可打开浏览器界面
        headless: true,
        ignoreHTTPSErrors: true,
        args: ['--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--disable-gpu'
        ]//'--window-size=1920x1080'
    });
```

##### 1.3问题（三）：超时问题

```
打开页面报错 TimeoutError: Navigation timeout of 120000 ms exceeded
    at /home/www/aliyunnewscenter/node_modules/_puppeteer@11.0.0@puppeteer/lib/cjs/puppeteer/common/LifecycleWatcher.js:106:111
```



可以参考下面的链接： https://ourcodeworld.com/articles/read/1106/how-to-solve-puppeteer-timeouterror-navigation-timeout-of-30000-ms-exceeded

```javascript
await page.goto('https://ourcodeworld.com', {
    waitUntil: 'load',
    // Remove the timeout
    timeout: 0
});
```



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



docker run -d -p 8006:3005 -m 500M --memory-swap -1 --name="news-server" registry.cn-hangzhou.aliyuncs.com/hanxiang/aliyun_new_center_v2

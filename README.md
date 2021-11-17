## 简介：部署在阿里云上的信息获取服务

使用框架：koa

使用语言：ts



### 一、juejin相关

1、juejin信息获取
使用的无头浏览器，还不错推荐使用：puppeteer还不错 功能还挺强大的。

参考文档；https://juejin.cn/post/6988479655967719454
官方文档：https://pptr.dev/



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




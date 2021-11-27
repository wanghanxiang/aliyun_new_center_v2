FROM node:14
#FROM node:latest

RUN mkdir -p /home/www/aliyunnewscenter
WORKDIR /home/www/aliyunnewscenter

#使用清华源加速
RUN mv /etc/apt/sources.list /etc/apt/sources.list.bak && \
    echo "deb https://mirrors.tuna.tsinghua.edu.cn/debian/ buster main contrib non-free" >/etc/apt/sources.list && \
    echo "deb https://mirrors.tuna.tsinghua.edu.cn/debian/ buster-updates main contrib non-free" >>/etc/apt/sources.list && \
    echo "deb https://mirrors.tuna.tsinghua.edu.cn/debian/ buster-backports main contrib non-free" >>/etc/apt/sources.list && \
    echo "deb https://mirrors.tuna.tsinghua.edu.cn/debian-security buster/updates main contrib non-free" >>/etc/apt/sources.list

RUN apt-get clean

RUN apt-get update \
    && apt-get upgrade -y

RUN apt-get install -y \
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
    #libgcc-s1 \ 
    libgconf-2-4 \ 
    #libgdk-pixbuf2.0-0 \ 
    libglib2.0-0 \ 
    libgtk-3-0 \ 
    libnspr4 \ 
    libpango-1.0-0 \ 
    libpangocairo-1.0-0 \ 
    libstdc++6 \ 
    libx11-6 \ 
    #libx11-xcb1 \ 
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
    libnss3 \ 
    lsb-release \ 
    xdg-utils \ 
    libgbm-dev \ 
    vim \
    wget

COPY . /home/www/aliyunnewscenter


RUN npm install cnpm -g

RUN cnpm install puppeteer

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

RUN cnpm install

# 设置时区
RUN rm -rf /etc/localtime && ln -s /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
 
#EXPOSE 3000

#ENTRYPOINT ["npm", "run"]
#CMD ["start"]
#bash 成为顶层进程是比较快的一种方式，bash 进程会负责回收僵尸进程
CMD ["/bin/bash", "-c", "set -e && npm run start"]
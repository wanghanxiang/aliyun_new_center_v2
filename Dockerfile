
#FROM node:12.16
FROM node:latest

RUN mkdir -p /home/www/aliyunnewscenter
WORKDIR /home/www/aliyunnewscenter

COPY . /home/www/aliyunnewscenter

# 设置 puppeteer 的字体
COPY source-sans-pro.zip /tmp
RUN sed -i 's/deb.debian.org/mirrors.163.com/g' /etc/apt/sources.list && \
    apt update && \
    apt-get install -y dpkg wget unzip
    #fonts-droid fonts-arphic-ukai fonts-arphic-uming
RUN cd /tmp && wget http://ftp.cn.debian.org/debian/pool/main/f/fonts-noto-cjk/fonts-noto-cjk_20170601+repack1-3+deb10u1_all.deb && \
    dpkg -i fonts-noto-cjk_20170601+repack1-3+deb10u1_all.deb && \
    unzip source-sans-pro.zip && cd source-sans-pro  && mv ./OTF /usr/share/fonts/  && \
    fc-cache -f -v
# 2. https://github.com/puppeteer/puppeteer/blob/master/.ci/node10/Dockerfile.linux
RUN apt-get update && \
    apt-get -y install xvfb gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 \
      libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 \
      libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 \
      libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 \
      libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget && \
    rm -rf /var/lib/apt/lists/*

RUN npm install
 
#EXPOSE 3000

ENTRYPOINT ["npm", "run"]
CMD ["start"]
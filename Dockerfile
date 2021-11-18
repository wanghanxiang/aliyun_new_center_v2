
FROM node:12
#FROM node:latest

RUN mkdir -p /home/www/aliyunnewscenter
WORKDIR /home/www/aliyunnewscenter

COPY . /home/www/aliyunnewscenter

ENV TZ=Asia/Shanghai
RUN apt-get update && \
    ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone && \
    apt-get -y install xvfb gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 \
      libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 \
      libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 \
      libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 \
      libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget pdftk mc tzdata \
      && apt-get clean autoclean \
      && apt-get autoremove --yes \
      && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN npm install
 
#EXPOSE 3000

ENTRYPOINT ["npm", "run"]
CMD ["start"]
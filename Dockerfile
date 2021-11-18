
#FROM node:12
#FROM node:latest
FROM node:10-slim

RUN mkdir -p /home/www/aliyunnewscenter
WORKDIR /home/www/aliyunnewscenter

COPY . /home/www/aliyunnewscenter

RUN npm config set registry "https://registry.npm.taobao.org"

# Install latest chrome dev package and fonts to support major charsets (Chinese, Japanese, Arabic, Hebrew, Thai and a few others)
# Note: this installs the necessary libs to make the bundled version of Chromium that Puppeteer
# installs, work. 此处有墙...
# https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
  && apt-get update \
  && apt-get install -y google-chrome-unstable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf \
  --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*

RUN npm install

# 设置时区
RUN rm -rf /etc/localtime && ln -s /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
 
#EXPOSE 3000

ENTRYPOINT ["npm", "run"]
CMD ["start"]
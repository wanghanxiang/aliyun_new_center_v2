
#FROM node:12
#FROM node:latest
FROM alpine

WORKDIR /home/docker/aliyunnewscenter

# Installs latest Chromium (92) package.
RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      harfbuzz \
      ca-certificates \
      ttf-freefont \
      nodejs \
      yarn

# 跳过自动安装chrome包. 使用上面已经安装的chrome.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

RUN yarn config set registry 'https://registry.npm.taobao.org'

RUN yarn add puppeteer@10.2.0

COPY . /home/docker/aliyunnewscenter


RUN yarn install && \
    yarn cache clean


# 设置时区
RUN rm -rf /etc/localtime && ln -s /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
 
#EXPOSE 3000

CMD ["yarn", "start"]
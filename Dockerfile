
#FROM node:12
#FROM node:latest
FROM alpine:edge

RUN mkdir -p /home/www/aliyunnewscenter
WORKDIR /home/www/aliyunnewscenter

# 安装最新版 Chromium (89) 包.
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

# Puppeteer v6.0.0 works with Chromium 89.
RUN yarn add puppeteer@6.0.0


COPY . /home/www/aliyunnewscenter

RUN npm install
 
#EXPOSE 3000

ENTRYPOINT ["npm", "run"]
CMD ["start"]
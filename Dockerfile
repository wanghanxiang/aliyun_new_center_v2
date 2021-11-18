
FROM node:14.16
#FROM node:latest

RUN mkdir -p /home/www/aliyunnewscenter
WORKDIR /home/www/aliyunnewscenter

COPY . /home/www/aliyunnewscenter

RUN npm install -g puppeteer

RUN npm install
 

#EXPOSE 3000

ENTRYPOINT ["npm", "run"]
CMD ["start"]
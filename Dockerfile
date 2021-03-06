FROM node:8.9.4

ADD . /usr/src/app

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "start" ]

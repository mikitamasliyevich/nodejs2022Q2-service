# syntax=docker/dockerfile:1
FROM node 

WORKDIR /src/main

COPY package.json /src/main/

RUN npm install

COPY . .

EXPOSE 4000

CMD [ "npm", "start" ]
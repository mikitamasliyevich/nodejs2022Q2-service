FROM node 

WORKDIR /src/main

COPY package.json ./

RUN npm install && npm cache clean --force

COPY . .

EXPOSE 4000

CMD ["npm", "run", "start:dev"]


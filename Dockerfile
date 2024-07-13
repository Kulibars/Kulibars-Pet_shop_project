FROM node:18

WORKDIR /usr/src/app

COPY . .

WORKDIR /usr/src/app/Frontend
RUN npm i
RUN npm run build

WORKDIR /usr/src/app/Server
RUN npm i

RUN npm install pm2 -g

EXPOSE 3001

CMD [ "pm2", "start", "app.js" ]


# WORKDIR /usr/src/app/Server
# RUN npm i

# EXPOSE 3001

# CMD [ "node", "app.js" ]
ARG NODE_VERSION=20.10.0

FROM node:${NODE_VERSION}-alpine

WORKDIR /app

COPY package*.json .

COPY . .

RUN npm install

EXPOSE 3000

CMD npm run dev

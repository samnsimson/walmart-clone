FROM node:alpine as builder
WORKDIR /app
COPY package*.json /
RUN npm install
COPY . .
RUN npm run build

FROM node:alpine
WORKDIR /app


FROM typesense/typesense:0.22.0
COPY ./typesense.config.json /app/typesense.config.json
EXPOSE 8108
CMD ["typesense", "server", "-c", "/app/typesense.config.json"]
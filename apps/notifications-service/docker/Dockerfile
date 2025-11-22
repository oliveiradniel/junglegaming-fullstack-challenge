FROM node:22-alpine AS development

WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/notifications-service/package.json ./apps/notifications-service/package.json

RUN npm install

COPY apps/notifications-service ./apps/notifications-service

EXPOSE 3003

CMD ["npm", "run", "start:dev"]

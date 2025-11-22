FROM node:22-alpine AS development

WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/api-gateway/package.json ./apps/api-gateway/package.json

RUN npm install

COPY apps/api-gateway ./apps/api-gateway

EXPOSE 3001

CMD ["npm", "run", "start:dev"]

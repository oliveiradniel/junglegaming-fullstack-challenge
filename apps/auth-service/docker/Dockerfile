FROM node:22-alpine AS development

WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/auth-service/package.json ./apps/auth-service/package.json

RUN npm install

COPY apps/auth-service ./apps/auth-service

USER root

RUN apk add --no-cache postgresql-client

COPY apps/auth-service/docker/init.sh /app/init.sh

RUN chmod +x /app/init.sh

EXPOSE 3002

ENTRYPOINT ["sh", "/app/init.sh"]

CMD ["npm", "run", "start:dev"]

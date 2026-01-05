FROM node:22-alpine

LABEL maintainer="Mohan Kumar"
LABEL org.opencontainers.image.version="1.0.0"
LABEL org.opencontainers.image.description="Nodejs API Gateway"

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3002
EXPOSE ${PORT}

CMD ["npm", "start"]

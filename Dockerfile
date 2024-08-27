FROM node:22.7.0-alpine3.19

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD ["sh", "-c", "npm run migrate && npm run seed && npm run start-all"]

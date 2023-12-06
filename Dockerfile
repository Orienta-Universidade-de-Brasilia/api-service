FROM node:18-alpine

RUN npm install -g npm@latest

WORKDIR /app

COPY package*.json ./
COPY tsconfig.* ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "start:dev"]
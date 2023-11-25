FROM node:18-alpine

RUN npm install -g npm@latest

WORKDIR /app

COPY package*.json ./
COPY tsconfig.* ./

RUN npm install --quiet --no-optional --no-fund --loglevel=error

COPY . .

RUN npm run build

CMD ["npm", "start:dev"]

ARG NODE_VERSION=18-alpine
ARG NPM_VERSION=9

FROM node:${NODE_VERSION}

RUN npm install -g npm@${NPM_VERSION}

WORKDIR /app

COPY package*.json ./
COPY tsconfig.* ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "start:dev"]
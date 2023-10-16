
ARG NODE_VERSION=18-alpine
ARG NPM_VERSION=9

FROM node:${NODE_VERSION}

RUN npm install -g npm@${NPM_VERSION}
RUN mkdir -p /var/www/server

WORKDIR /var/www/server

ADD . /var/www/server/

RUN npm install
RUN npm run build

EXPOSE 8000

CMD ["npm", "start:prod"]
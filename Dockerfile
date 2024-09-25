# for development
FROM node:alpine as development

ARG APP

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install -g && npm install

COPY . .

RUN npm run build ${APP}

ENV APP=${APP}

# for production
FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --only=production

COPY --from=development /usr/src/app/dist ./dist
COPY --from=development /usr/src/app/package.json ./package.json

RUN chmod +x ./entrypoint.sh

ENTRYPOINT [ "./entrypoint.sh" ]
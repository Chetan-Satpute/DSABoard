# ==================================================================
# Development
# ==================================================================
FROM node:lts-alpine as DEV

USER node:node

WORKDIR /home/node/app

ENV NODE_ENV=development

COPY --chown=node:node package-lock.json package.json ./

RUN npm install

COPY --chown=node:node . .


CMD [ "npm", "start" ]

# ==================================================================
# Production
# ==================================================================

# Build
FROM node:lts-alpine as BUILD

USER node:node

WORKDIR /home/node/app

COPY --chown=node:node package*.json ./

RUN npm install

COPY --chown=node:node . .

ENV NODE_ENV=production

RUN npm run build


# Release
FROM nginx:alpine as PROD

COPY --from=BUILD /home/node/dist/ /usr/share/nginx/html/


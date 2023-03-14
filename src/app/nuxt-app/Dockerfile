FROM node:18-bullseye-slim

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

WORKDIR /home/node/app

RUN apt-get update && apt-get install -y --no-install-recommends dumb-init

COPY --chown=node:node . .

RUN npm ci --omit=dev

USER node
CMD ["dumb-init", "node", ".output/server/index.mjs"]

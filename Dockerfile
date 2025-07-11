FROM docker.1ms.run/library/node:23.0-alpine3.19 as copy-stage

WORKDIR /chapanda-website-service

COPY . .

# production stage
FROM docker.1ms.run/library/node:23.0-alpine3.19 as production-stage

COPY --from=copy-stage /chapanda-website-service/dist /chapanda-website-service
COPY --from=copy-stage /chapanda-website-service/package.json /chapanda-website-service/package.json
COPY --from=copy-stage /chapanda-website-service/i18n /chapanda-website-service/i18n

WORKDIR /chapanda-website-service

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install pnpm --global

RUN pnpm install

EXPOSE 8084

CMD ["node", "/chapanda-website-service/src/main.js"]

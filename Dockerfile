FROM node:latest as builder

RUN apt-get update && apt-get install -y curl apt-transport-https \
 && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
 && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
 && apt-get update && apt-get install -y yarn \
 && rm -rf /var/lib/apt/lists/*

COPY package.json yarn.lock ./
RUN yarn && mkdir /app && cp -R ./node_modules /app
WORKDIR /app
COPY . .
RUN yarn build


FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/build /usr/share/nginx/html

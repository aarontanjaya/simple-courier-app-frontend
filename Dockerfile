FROM alpine:lts-alpine3.17 as builder

# Copy package.json and package-lock.json

COPY package*.json ./app
RUN npm install
COPY . .
RUN npm run build .

# Setup NGINX

FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/configfile.template
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build/ .


EXPOSE 8080
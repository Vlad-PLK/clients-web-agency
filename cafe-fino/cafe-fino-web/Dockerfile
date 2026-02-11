# Multi-stage: Node builder → nginx production
FROM node:22-alpine AS builder

RUN apk upgrade --no-cache

WORKDIR /app

COPY package*.json ./
RUN npm ci --no-audit

COPY . .
ENV NODE_ENV=production
RUN npm run build && ls -la dist/

FROM nginx:1.27-alpine

RUN apk upgrade --no-cache && \
    mkdir -p /var/cache/nginx/client_temp \
             /var/cache/nginx/proxy_temp \
             /var/cache/nginx/fastcgi_temp \
             /var/cache/nginx/uwsgi_temp \
             /var/cache/nginx/scgi_temp \
             /var/run/nginx && \
    chown -R nginx:nginx /var/cache/nginx /var/run/nginx /usr/share/nginx/html /etc/nginx/conf.d && \
    rm -f /etc/nginx/conf.d/default.conf

COPY --from=builder --chown=nginx:nginx /app/dist /usr/share/nginx/html
COPY --chown=nginx:nginx nginx.conf /etc/nginx/conf.d/default.conf

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost/health || exit 1

LABEL maintainer="Vladimir Polojienko <leonpolo365@gmail.com>"
LABEL description="Cafe Fino Website"
LABEL version="1.0"

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

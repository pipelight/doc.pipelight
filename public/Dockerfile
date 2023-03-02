FROM nginx:alpine
RUN mkdir -p /var/www/html
WORKDIR /var/www/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY . .
# LABEL traefik.enable=true
# LABEL traefik.http.routers.default.rule='Host("doc.pipelight.areskul.com")'
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]

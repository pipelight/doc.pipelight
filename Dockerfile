FROM nginx:alpine
RUN mkdir -p /var/www/html
WORKDIR /var/www/html
COPY ./.docker/nginx.conf /etc/nginx/nginx.conf
COPY ./.vitepress/dist .
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]

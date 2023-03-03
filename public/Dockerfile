FROM nginx:alpine
RUN mkdir -p /var/www/html
WORKDIR /var/www/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY . .
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
